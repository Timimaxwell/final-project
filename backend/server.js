// ...existing code...
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./src/config/database'); // -> see [`connectDB`](backend/src/config/database.js)
const Provider = require('./src/models/Provider'); // added for quick CRUD test endpoints

dotenv.config();

const app = express();

// Middleware: parse JSON and enable CORS
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

// Health check — accept any HTTP method (GET, POST, etc.)
app.get('/health', (req, res) => {
  res.json({
    status: 'SEMS Backend Running'});
});

// Default root
app.get('/', (req, res) => {
  res.send('API Server for Express JS is up and running....');
});

async function startServer() {
  try {
    // Connect to MongoDB (await to ensure DB ready before accepting requests)
    await connectDB();

    // ---------- Quick CRUD test endpoints for Providers (no auth) ----------
    // Use these in Postman to verify create/read/update/delete without auth issues.
    app.post('/test/providers', async (req, res) => {
      try {
        const payload = req.body || {};
        // normalize phone to string if present
        if (payload.phone !== undefined && payload.phone !== null) payload.phone = String(payload.phone);
        if (payload['phone number'] && !payload.phone) payload.phone = String(payload['phone number']);
        const provider = new Provider(payload);
        const saved = await provider.save();
        return res.status(201).json(saved);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    });

    // ...existing code...
    app.get('/test/providers/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid provider id. Use a valid MongoDB ObjectId in the URL (do not send ":id").' });
        }

        const p = await Provider.findById(id);
        if (!p) return res.status(404).json({ error: 'Provider not found' });
        res.json(p);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

   app.put('/test/providers/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid provider id. Use a valid MongoDB ObjectId in the URL.' });
        }

        // prepare update payload
        const update = { ...(req.body || {}) };

        // prevent changing _id
        if (update._id) delete update._id;

        // normalize fields
        if (update.phone !== undefined && update.phone !== null) update.phone = String(update.phone);
        if (update['phone number'] && !update.phone) update.phone = String(update['phone number']);
        if (update.email) update.email = String(update.email).trim().toLowerCase();

        // If email is provided, ensure no other document already uses it
        if (update.email) {
          const existing = await Provider.findOne({ email: update.email });
          if (existing && existing._id.toString() !== id) {
            return res.status(409).json({ error: 'Email already in use by another provider' });
          }
        }

        const updated = await Provider.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ error: 'Provider not found' });
        res.json(updated);
      } catch (err) {
        // handle duplicate key from race conditions defensively
        if (err.code === 11000) {
          return res.status(409).json({ error: 'Duplicate key error', details: err.keyValue });
        }
        res.status(500).json({ error: err.message });
      }
    });

    // ...existing code...
    // ...existing code...
    app.delete('/test/providers/:id', async (req, res) => {
      try {
        let { id } = req.params;
        const mongoose = require('mongoose');

        if (!id || typeof id !== 'string') {
          return res.status(400).json({ error: 'Missing id parameter in URL' });
        }

        id = id.trim();

        // helper: normalize phone (digits only)
        const normalizePhone = (v) => (v ? String(v).replace(/\D/g, '') : '');

        // candidates found
        let target = null;
        // 1) If valid ObjectId try by _id
        if (mongoose.Types.ObjectId.isValid(id)) {
          target = await Provider.findById(id);
        }

        // 2) If not found by id, try treat as email (case-insensitive)
        if (!target) {
          const maybeEmail = id.toLowerCase();
          if (maybeEmail.includes('@')) {
            target = await Provider.findOne({ email: maybeEmail });
          }
        }

        // 3) If still not found, try by phone number (digits)
        if (!target) {
          const maybePhone = normalizePhone(id);
          if (maybePhone) {
            // try exact digits match and also phone stored with leading zero
            target = await Provider.findOne({
              $or: [
                { phone: maybePhone },
                { phone: { $regex: maybePhone } }, // fallback
                { phone: { $regex: `.*${maybePhone}.*` } }
              ]
            });
          }
        }

        // 4) last resort: try by name (case-insensitive)
        if (!target) {
          const nameQuery = id;
          const foundByName = await Provider.find({
            name: { $regex: `^${nameQuery}$`, $options: 'i' }
          });
          if (foundByName && foundByName.length === 1) {
            target = foundByName[0];
          } else if (foundByName && foundByName.length > 1) {
            // ambiguous — ask client to use _id or email
            return res.status(409).json({
              error: 'Multiple providers match the provided identifier — use the provider _id or email to delete.',
              matches: foundByName.map((p) => ({ _id: p._id, name: p.name, email: p.email }))
            });
          }
        }

        if (!target) {
          return res.status(404).json({
            error:
              'Provider not found. Use a valid provider _id (from create response), an existing provider email, or exact phone number. Example: /test/providers/64c3f1e2a4b3c2d1e0f12345'
          });
        }

        const removed = await Provider.findByIdAndDelete(target._id);
        if (!removed) {
          return res.status(500).json({ error: 'Failed to delete provider' });
        }

        return res.json({ message: 'Provider deleted successfully', provider: removed });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    });
 // ...existing code...
    // --------------------------------------------------------------------

    // Register routes AFTER DB connection to avoid early requests failing
    app.use('/api/auth', require('./src/routes/auth'));
    app.use('/api/energy', require('./src/routes/energy'));
    app.use('/api/providers', require('./src/routes/providers'));
    app.use('/api/jobs', require('./src/routes/jobs'));
    app.use('/api/analytics', require('./src/routes/analytics'));

    // Centralized error handler (keeps previous behavior but logs stack)
    // Note: keep this after routes
    app.use((err, req, res, next) => {
      console.error('Unhandled error:', err && err.stack ? err.stack : err);
      res.status(err?.status || 500).json({ error: err?.message || 'Internal Server Error' });
    });

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    // Graceful shutdown handlers
    const shutdown = (signal) => {
      console.log(`Received ${signal}. Closing server...`);
      server.close(() => {
        console.log('HTTP server closed.');
        // If mongoose connection exists, close it gracefully
        try {
          const mongoose = require('mongoose');
          if (mongoose.connection && mongoose.connection.readyState === 1) {
            mongoose.connection.close(false, () => {
              console.log('MongoDB connection closed.');
              process.exit(0);
            });
          } else {
            process.exit(0);
          }
        } catch (e) {
          process.exit(0);
        }
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

    // Crash handlers to avoid silent failures
    process.on('unhandledRejection', (reason) => {
      console.error('Unhandled Rejection:', reason);
    });
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      process.exit(1);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
// ...existing code...
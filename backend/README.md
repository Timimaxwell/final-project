# SEMS Backend

https://final-project-5zbk.onrender.com

Smart Energy Management System Backend API built with Express.js and MongoDB.

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Configure environment variables in `.env`:
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sems
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
\`\`\`

3. Start development server:
\`\`\`bash
npm run dev
\`\`\`

4. Start production server:
\`\`\`bash
npm start
\`\`\`

## Project Structure

- `/src/config` - Database configuration
- `/src/models` - MongoDB Mongoose schemas
  - `User.js` - User model with auth fields
  - `EnergyReading.js` - Energy consumption readings
  - `Provider.js` - Clean energy providers
  - `Job.js` - Job listings
- `/src/routes` - API routes
  - `auth.js` - Authentication endpoints
  - `energy.js` - Energy reading CRUD operations
  - `providers.js` - Provider directory CRUD
  - `jobs.js` - Job board CRUD
  - `analytics.js` - Analytics and insights
- `/src/middleware` - Express middleware
  - `auth.js` - JWT authentication middleware
- `server.js` - Express app setup

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `PUT /api/auth/profile/:id` - Update user profile

### Energy
- `GET /api/energy/readings/:userId` - Get all energy readings for user
- `GET /api/energy/readings/:id` - Get single reading
- `POST /api/energy/readings` - Create new reading
- `PUT /api/energy/readings/:id` - Update reading
- `DELETE /api/energy/readings/:id` - Delete reading

### Providers
- `GET /api/providers` - Get all providers
- `GET /api/providers/:id` - Get provider by ID
- `POST /api/providers` - Create new provider
- `PUT /api/providers/:id` - Update provider
- `DELETE /api/providers/:id` - Delete provider

### Jobs
- `GET /api/jobs` - Get all job listings
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job listing
- `PUT /api/jobs/:id` - Update job listing
- `DELETE /api/jobs/:id` - Delete job listing

### Analytics
- `GET /api/analytics/dashboard/:userId` - Get dashboard metrics and insights

## Authentication

All protected endpoints require JWT token in Authorization header:
\`\`\`
Authorization: Bearer <jwt_token>
\`\`\`

Token is issued during login/register and expires after 24 hours.

## Database Models

### User
- email (unique)
- password (hashed)
- name
- role (user/admin)
- createdAt
- updatedAt

### EnergyReading
- userId (reference to User)
- consumption (kWh)
- timestamp
- source (grid/solar/other)
- cost

### Provider
- name
- service (solar/biogas/mini-grid)
- description
- email
- phone
- rating
- location
- createdAt

### Job
- title
- company
- description
- salary
- type (full-time/contract/part-time)
- location
- postedBy (reference to User)
- createdAt

## Error Handling

All errors return standard format:
\`\`\`json
{
  "success": false,
  "error": "Error message here"
}
\`\`\`

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (if configured)

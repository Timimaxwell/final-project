import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-block">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚡</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
            Power Your World with Smart, Clean Energy
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Monitor, optimize, and transition to clean energy solutions. Data-driven insights for businesses,
            households, and communities across South-South Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold transition transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              to="/providers"
              className="px-8 py-4 border-2 border-emerald-500 hover:bg-emerald-500/10 rounded-lg font-semibold transition"
            >
              Explore Providers
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">About SEMS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-800/50 border border-emerald-500/20 rounded-xl hover:border-emerald-500/50 transition">
              <div className="text-3xl mb-4"></div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Monitoring</h3>
              <p className="text-slate-300">
                Track energy consumption instantly with advanced IoT integration and smart meter technology.
              </p>
            </div>
            <div className="p-6 bg-slate-800/50 border border-emerald-500/20 rounded-xl hover:border-emerald-500/50 transition">
              <div className="text-3xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-3">Clean Energy Solutions</h3>
              <p className="text-slate-300">
                Connect with verified solar, biogas, and renewable energy providers in your area.
              </p>
            </div>
            <div className="p-6 bg-slate-800/50 border border-emerald-500/20 rounded-xl hover:border-emerald-500/50 transition">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3">Cost Optimization</h3>
              <p className="text-slate-300">
                Reduce energy costs by 40% through AI-powered recommendations and efficiency insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-gradient-to-br from-emerald-900/20 to-slate-900/50 border border-emerald-500/30 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 text-emerald-400">Energy Monitoring Dashboard</h3>
              <p className="text-slate-300 mb-4">
                Visualize your energy consumption patterns with real-time graphs and historical data analysis.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Live consumption tracking</li>
                <li>✓ Cost breakdown by source</li>
                <li>✓ Predictive analytics</li>
              </ul>
            </div>
            <div className="p-8 bg-gradient-to-br from-emerald-900/20 to-slate-900/50 border border-emerald-500/30 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 text-emerald-400">Provider Marketplace</h3>
              <p className="text-slate-300 mb-4">
                Discover and connect with verified clean energy providers and installation experts.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Verified professionals</li>
                <li>✓ Transparent pricing</li>
                <li>✓ Customer reviews</li>
              </ul>
            </div>
            <div className="p-8 bg-gradient-to-br from-emerald-900/20 to-slate-900/50 border border-emerald-500/30 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 text-emerald-400">Job Board</h3>
              <p className="text-slate-300 mb-4">
                Post and find energy-related opportunities for technicians, consultants, and installers.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Verified job listings</li>
                <li>✓ Skill matching</li>
                <li>✓ Secure payments</li>
              </ul>
            </div>
            <div className="p-8 bg-gradient-to-br from-emerald-900/20 to-slate-900/50 border border-emerald-500/30 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 text-emerald-400">Analytics & Reporting</h3>
              <p className="text-slate-300 mb-4">
                Generate detailed reports on energy usage, savings, and carbon footprint reduction.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Custom reports</li>
                <li>✓ Carbon tracking</li>
                <li>✓ ROI calculations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Chioma Okafor",
                role: "Business Owner",
                text: "SEMS helped us reduce energy costs by 35% in just 3 months. Highly recommended!",
              },
              {
                name: "Tunde Adeyemi",
                role: "Solar Technician",
                text: "The job board connected me with quality clients. Best platform for energy professionals.",
              },
              {
                name: "Amara Nwosu",
                role: "Household User",
                text: "Finally understand where my energy goes. The insights are invaluable for budgeting.",
              },
            ].map((testimonial, i) => (
              <div key={i} className="p-6 bg-slate-800/50 border border-emerald-500/20 rounded-xl">
                <p className="text-slate-300 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-emerald-400">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-emerald-900/30 to-slate-900/30 border border-emerald-500/30 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Energy?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of users already saving money and reducing their carbon footprint.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold transition transform hover:scale-105"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-500/20 py-12 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-emerald-400 mb-4">SEMS</h4>
              <p className="text-slate-400 text-sm">Smart Energy Management System for sustainable futures.</p>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-400 mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link to="/dashboard" className="hover:text-emerald-400">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/providers" className="hover:text-emerald-400">
                    Providers
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-emerald-400">
                    Jobs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-400 mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-emerald-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-400 mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-emerald-400">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-500/20 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 Smart Energy Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
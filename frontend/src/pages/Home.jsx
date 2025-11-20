import { Link } from "react-router-dom"
import { Button } from "../../component/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../component/ui/card"

export default function Home() {
  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-8 inline-block animate-fadeInUp">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
              <span className="text-3xl">⚡</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-400 bg-clip-text text-transparent animate-fadeInUp">
            Power Your World with <br /> Smart, Clean Energy
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeInUp delay-100">
            Monitor, optimize, and transition to clean energy solutions. Data-driven insights for businesses,
            households, and communities across South-South Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-200">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg h-12 px-8 shadow-lg shadow-emerald-900/20">
              <Link to="/register">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 text-lg h-12 px-8 bg-transparent">
              <Link to="/providers">Explore Providers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose SEMS?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Comprehensive energy management solutions designed for the modern world.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/40 transition-all hover:-translate-y-1 duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 text-2xl">⚡</div>
                <CardTitle className="text-xl text-white">Real-Time Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 leading-relaxed">
                  Track energy consumption instantly with advanced IoT integration and smart meter technology.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/40 transition-all hover:-translate-y-1 duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 text-2xl">🌱</div>
                <CardTitle className="text-xl text-white">Clean Energy Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 leading-relaxed">
                  Connect with verified solar, biogas, and renewable energy providers in your area.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/40 transition-all hover:-translate-y-1 duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 text-2xl">💰</div>
                <CardTitle className="text-xl text-white">Cost Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 leading-relaxed">
                  Reduce energy costs by 40% through AI-powered recommendations and efficiency insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Services</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to manage and optimize your energy usage.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-slate-900 to-slate-900/50 border-emerald-500/20">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-400">Energy Monitoring Dashboard</CardTitle>
                <CardDescription className="text-slate-400">
                  Visualize your energy consumption patterns with real-time graphs and historical data analysis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Live consumption tracking</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Cost breakdown by source</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Predictive analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900 to-slate-900/50 border-emerald-500/20">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-400">Provider Marketplace</CardTitle>
                <CardDescription className="text-slate-400">
                  Discover and connect with verified clean energy providers and installation experts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Verified professionals</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Transparent pricing</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Customer reviews</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900 to-slate-900/50 border-emerald-500/20">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-400">Job Board</CardTitle>
                <CardDescription className="text-slate-400">
                  Post and find energy-related opportunities for technicians, consultants, and installers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Verified job listings</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Skill matching</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Secure payments</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900 to-slate-900/50 border-emerald-500/20">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-400">Analytics & Reporting</CardTitle>
                <CardDescription className="text-slate-400">
                  Generate detailed reports on energy usage, savings, and carbon footprint reduction.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Custom reports</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Carbon tracking</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> ROI calculations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">What Our Users Say</h2>
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
              <Card key={i} className="bg-slate-800/30 border-emerald-500/10">
                <CardContent className="pt-6">
                  <div className="mb-4 text-emerald-400 text-4xl font-serif">"</div>
                  <p className="text-slate-300 mb-6 italic">{testimonial.text}</p>
                  <div>
                    <p className="font-semibold text-emerald-400">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center bg-gradient-to-r from-emerald-900/20 to-slate-900/40 border border-emerald-500/20 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your Energy?</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Join thousands of users already saving money and reducing their carbon footprint.
            </p>
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg h-12 px-10 shadow-lg shadow-emerald-900/20">
              <Link to="/register">Start Your Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-500/10 py-16 px-4 bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚡</span>
                <h4 className="font-bold text-xl text-white">SEMS</h4>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Smart Energy Management System for sustainable futures. Empowering communities with clean energy.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6">Product</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>
                  <Link to="/dashboard" className="hover:text-emerald-400 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/providers" className="hover:text-emerald-400 transition-colors">
                    Providers
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-emerald-400 transition-colors">
                    Jobs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6">Company</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6">Legal</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-500/10 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2025 Smart Energy Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
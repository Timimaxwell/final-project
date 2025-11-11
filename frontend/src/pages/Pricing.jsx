export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₦0",
      description: "Perfect for getting started",
      features: ["Basic energy monitoring", "Monthly reports", "Up to 100 readings/month", "Community access"],
    },
    {
      name: "Premium",
      price: "₦5,000",
      period: "/month",
      description: "For serious energy managers",
      features: [
        "Advanced analytics",
        "Real-time alerts",
        "Unlimited readings",
        "Priority support",
        "Custom reports",
        "Provider recommendations",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For businesses and organizations",
      features: [
        "Everything in Premium",
        "API access",
        "Dedicated support",
        "Custom integrations",
        "Multi-user management",
        "Advanced security",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-300">Choose the plan that fits your energy management needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-xl p-8 transition transform hover:scale-105 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-emerald-900/30 to-slate-900/30 border-2 border-emerald-500"
                  : "bg-slate-900 border border-emerald-500/20"
              }`}
            >
              {plan.highlighted && <div className="text-emerald-400 text-sm font-semibold mb-4">MOST POPULAR</div>}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-emerald-400">{plan.price}</span>
                {plan.period && <span className="text-slate-400">{plan.period}</span>}
              </div>
              <button
                className={`w-full py-3 rounded-lg font-semibold transition mb-8 ${
                  plan.highlighted
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
                }`}
              >
                Get Started
              </button>
              <ul className="space-y-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-slate-300">
                    <span className="text-emerald-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
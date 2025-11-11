import { useState, useEffect } from "react"

export default function Providers() {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ serviceType: "", location: "" })

  useEffect(() => {
    fetchProviders()
  }, [filters])

  const fetchProviders = async () => {
    try {
      const query = new URLSearchParams()
      if (filters.serviceType) query.append("serviceType", filters.serviceType)
      if (filters.location) query.append("location", filters.location)

      const response = await fetch(`http://localhost:5000/api/providers?${query}`)
      if (response.ok) {
        setProviders(await response.json())
      }
    } catch (error) {
      console.error("Fetch error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">Clean Energy Providers</h1>

        {/* Filters */}
        <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-6 mb-12">
          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={filters.serviceType}
              onChange={(e) => setFilters({ ...filters, serviceType: e.target.value })}
              className="px-4 py-2 bg-slate-800 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="">All Services</option>
              <option value="solar">Solar</option>
              <option value="biogas">Biogas</option>
              <option value="mini-grid">Mini-Grid</option>
              <option value="consulting">Consulting</option>
              <option value="installation">Installation</option>
            </select>
            <input
              type="text"
              placeholder="Search by location..."
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="px-4 py-2 bg-slate-800 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Providers Grid */}
        {loading ? (
          <div className="text-center text-white">Loading providers...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {providers.map((provider) => (
              <div
                key={provider._id}
                className="bg-slate-900 border border-emerald-500/20 rounded-xl p-6 hover:border-emerald-500/50 transition"
              >
                <h3 className="text-xl font-bold text-white mb-2">{provider.businessName}</h3>
                <p className="text-emerald-400 text-sm mb-3 capitalize">{provider.serviceType}</p>
                <p className="text-slate-300 mb-4">{provider.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-slate-400 text-sm">Rating</p>
                    <p className="text-emerald-400 font-semibold">⭐ {provider.rating}/5</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Experience</p>
                    <p className="text-emerald-400 font-semibold">{provider.yearsExperience} years</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
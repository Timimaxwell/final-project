import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Dashboard() {
  const { token } = useContext(AuthContext)
  const [analytics, setAnalytics] = useState(null)
  const [readings, setReadings] = useState([])
  const [loading, setLoading] = useState(true)
  const [newReading, setNewReading] = useState({ consumption: "", cost: "", source: "grid" })

  useEffect(() => {
    fetchData()
  }, [token])

  const fetchData = async () => {
    try {
      const [analyticsRes, readingsRes] = await Promise.all([
        fetch("http://localhost:5000/api/energy/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/energy/readings", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      if (analyticsRes.ok) setAnalytics(await analyticsRes.json())
      if (readingsRes.ok) setReadings(await readingsRes.json())
    } catch (error) {
      console.error("Fetch error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddReading = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5000/api/energy/readings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          consumption: Number.parseFloat(newReading.consumption),
          cost: Number.parseFloat(newReading.cost),
          source: newReading.source,
        }),
      })

      if (response.ok) {
        setNewReading({ consumption: "", cost: "", source: "grid" })
        fetchData()
      }
    } catch (error) {
      console.error("Error adding reading:", error)
    }
  }

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">Energy Dashboard</h1>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-6">
              <p className="text-slate-400 text-sm mb-2">Total Consumption</p>
              <p className="text-3xl font-bold text-emerald-400">{analytics.totalConsumption.toFixed(2)} kWh</p>
            </div>
            <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-6">
              <p className="text-slate-400 text-sm mb-2">Total Cost</p>
              <p className="text-3xl font-bold text-emerald-400">₦{analytics.totalCost.toFixed(2)}</p>
            </div>
            <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-6">
              <p className="text-slate-400 text-sm mb-2">Average Consumption</p>
              <p className="text-3xl font-bold text-emerald-400">{analytics.avgConsumption.toFixed(2)} kWh</p>
            </div>
            <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-6">
              <p className="text-slate-400 text-sm mb-2">Total Readings</p>
              <p className="text-3xl font-bold text-emerald-400">{analytics.readingCount}</p>
            </div>
          </div>
        )}

        {/* Add Reading Form */}
        <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Add Energy Reading</h2>
          <form onSubmit={handleAddReading} className="grid md:grid-cols-4 gap-4">
            <input
              type="number"
              step="0.01"
              placeholder="Consumption (kWh)"
              value={newReading.consumption}
              onChange={(e) => setNewReading({ ...newReading, consumption: e.target.value })}
              className="px-4 py-2 bg-slate-800 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Cost (₦)"
              value={newReading.cost}
              onChange={(e) => setNewReading({ ...newReading, cost: e.target.value })}
              className="px-4 py-2 bg-slate-800 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              required
            />
            <select
              value={newReading.source}
              onChange={(e) => setNewReading({ ...newReading, source: e.target.value })}
              className="px-4 py-2 bg-slate-800 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="grid">Grid</option>
              <option value="solar">Solar</option>
              <option value="generator">Generator</option>
              <option value="biogas">Biogas</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition"
            >
              Add Reading
            </button>
          </form>
        </div>

        {/* Recent Readings */}
        <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Readings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-emerald-500/20">
                  <th className="pb-4 text-slate-400">Date</th>
                  <th className="pb-4 text-slate-400">Consumption</th>
                  <th className="pb-4 text-slate-400">Cost</th>
                  <th className="pb-4 text-slate-400">Source</th>
                </tr>
              </thead>
              <tbody>
                {readings.slice(0, 10).map((reading) => (
                  <tr key={reading._id} className="border-b border-emerald-500/10 hover:bg-slate-800/50">
                    <td className="py-4 text-slate-300">{new Date(reading.timestamp).toLocaleDateString()}</td>
                    <td className="py-4 text-emerald-400">{reading.consumption} kWh</td>
                    <td className="py-4 text-emerald-400">₦{reading.cost}</td>
                    <td className="py-4 text-slate-300 capitalize">{reading.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

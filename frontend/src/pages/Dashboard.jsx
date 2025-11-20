import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "../../component/ui/card"
import { Input } from "../../component/ui/input"
import { Button } from "../../component/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../component/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../component/ui/table"

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
            <Card className="bg-slate-900 border-emerald-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Total Consumption</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-400">{analytics.totalConsumption.toFixed(2)} kWh</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-emerald-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Total Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-400">₦{analytics.totalCost.toFixed(2)}</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-emerald-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Average Consumption</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-400">{analytics.avgConsumption.toFixed(2)} kWh</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-emerald-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Total Readings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-400">{analytics.readingCount}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Reading Form */}
        <Card className="bg-slate-900 border-emerald-500/20 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Add Energy Reading</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddReading} className="grid md:grid-cols-4 gap-4">
              <Input
                type="number"
                step="0.01"
                placeholder="Consumption (kWh)"
                value={newReading.consumption}
                onChange={(e) => setNewReading({ ...newReading, consumption: e.target.value })}
                className="bg-slate-800 border-emerald-500/20 text-white focus-visible:ring-emerald-500"
                required
              />
              <Input
                type="number"
                step="0.01"
                placeholder="Cost (₦)"
                value={newReading.cost}
                onChange={(e) => setNewReading({ ...newReading, cost: e.target.value })}
                className="bg-slate-800 border-emerald-500/20 text-white focus-visible:ring-emerald-500"
                required
              />
              <Select
                value={newReading.source}
                onValueChange={(value) => setNewReading({ ...newReading, source: value })}
              >
                <SelectTrigger className="bg-slate-800 border-emerald-500/20 text-white focus:ring-emerald-500">
                  <SelectValue placeholder="Select Source" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-emerald-500/20 text-white">
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="solar">Solar</SelectItem>
                  <SelectItem value="generator">Generator</SelectItem>
                  <SelectItem value="biogas">Biogas</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
              >
                Add Reading
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Readings */}
        <Card className="bg-slate-900 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Recent Readings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20 hover:bg-transparent">
                  <TableHead className="text-slate-400">Date</TableHead>
                  <TableHead className="text-slate-400">Consumption</TableHead>
                  <TableHead className="text-slate-400">Cost</TableHead>
                  <TableHead className="text-slate-400">Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {readings.slice(0, 10).map((reading) => (
                  <TableRow key={reading._id} className="border-emerald-500/10 hover:bg-slate-800/50">
                    <TableCell className="text-slate-300">{new Date(reading.timestamp).toLocaleDateString()}</TableCell>
                    <TableCell className="text-emerald-400">{reading.consumption} kWh</TableCell>
                    <TableCell className="text-emerald-400">₦{reading.cost}</TableCell>
                    <TableCell className="text-slate-300 capitalize">{reading.source}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

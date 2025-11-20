import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "../../component/ui/card"

export default function AdminDashboard() {
  const { user } = useContext(AuthContext)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProviders: 0,
    totalJobs: 0,
    activeSubscriptions: 0,
  })

  useEffect(() => {
    // Placeholder for admin stats
    setStats({
      totalUsers: 1250,
      totalProviders: 89,
      totalJobs: 342,
      activeSubscriptions: 456,
    })
  }, [])

  if (user?.userType !== "admin") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-slate-300">You don't have permission to access this page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">Admin Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-slate-900 border-emerald-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-emerald-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400">{stats.totalProviders}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-emerald-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Job Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400">{stats.totalJobs}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-emerald-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400">{stats.activeSubscriptions}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-900 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white">System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">Admin features and management tools coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
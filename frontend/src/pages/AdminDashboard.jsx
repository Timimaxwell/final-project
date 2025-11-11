import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

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
          <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Total Users</p>
            <p className="text-3xl font-bold text-emerald-400">{stats.totalUsers}</p>
          </div>
          <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Providers</p>
            <p className="text-3xl font-bold text-emerald-400">{stats.totalProviders}</p>
          </div>
          <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Job Listings</p>
            <p className="text-3xl font-bold text-emerald-400">{stats.totalJobs}</p>
          </div>
          <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Active Subscriptions</p>
            <p className="text-3xl font-bold text-emerald-400">{stats.activeSubscriptions}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">System Overview</h2>
          <p className="text-slate-300">Admin features and management tools coming soon...</p>
        </div>
      </div>
    </div>
  )
}
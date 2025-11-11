import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Jobs() {
  const { token } = useContext(AuthContext)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ jobType: "", location: "" })

  useEffect(() => {
    fetchJobs()
  }, [filters])

  const fetchJobs = async () => {
    try {
      const query = new URLSearchParams()
      if (filters.jobType) query.append("jobType", filters.jobType)
      if (filters.location) query.append("location", filters.location)

      const response = await fetch(`http://localhost:5000/api/jobs?${query}`)
      if (response.ok) {
        setJobs(await response.json())
      }
    } catch (error) {
      console.error("Fetch error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async (jobId) => {
    if (!token) {
      alert("Please login to apply")
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        alert("Application submitted successfully!")
      }
    } catch (error) {
      console.error("Apply error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">Energy Jobs</h1>

        {/* Filters */}
        <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-6 mb-12">
          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={filters.jobType}
              onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
              className="px-4 py-2 bg-slate-800 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="">All Job Types</option>
              <option value="installation">Installation</option>
              <option value="maintenance">Maintenance</option>
              <option value="consulting">Consulting</option>
              <option value="freelance">Freelance</option>
              <option value="full-time">Full-Time</option>
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

        {/* Jobs List */}
        {loading ? (
          <div className="text-center text-white">Loading jobs...</div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-slate-900 border border-emerald-500/20 rounded-xl p-8 hover:border-emerald-500/50 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                    <p className="text-emerald-400 capitalize">{job.jobType}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm capitalize">
                    {job.status}
                  </span>
                </div>
                <p className="text-slate-300 mb-4">{job.description}</p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-slate-400 text-sm">Location</p>
                    <p className="text-white">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Budget</p>
                    <p className="text-emerald-400">
                      ₦{job.budget?.min} - ₦{job.budget?.max}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Applications</p>
                    <p className="text-white">{job.applications?.length || 0}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleApply(job._id)}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

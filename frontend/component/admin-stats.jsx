import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Zap, Briefcase, TrendingUp } from "lucide-react"

export function AdminStats({ totalUsers, activeSubscriptions, totalJobs, totalProviders }) {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Total Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {totalUsers.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Active accounts</p>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {activeSubscriptions.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Premium plans</p>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            Job Listings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {totalJobs.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Active postings</p>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Providers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {totalProviders.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Registered</p>
        </CardContent>
      </Card>
    </div>
  )
}

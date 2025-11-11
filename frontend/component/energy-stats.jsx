import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Zap, DollarSign, Leaf } from "lucide-react"

export function EnergyStats({ currentUsage, monthlyCost, savings, co2Saved }) {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {/* Current Usage */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Current Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {currentUsage.toLocaleString()} kWh
          </div>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
        </CardContent>
      </Card>

      {/* Monthly Cost */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            Monthly Cost
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            ${monthlyCost.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Average rate</p>
        </CardContent>
      </Card>

      {/* Savings */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            ${savings.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">vs last month</p>
        </CardContent>
      </Card>

      {/* CO₂ Saved */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Leaf className="w-4 h-4 text-primary" />
            CO₂ Saved
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {co2Saved.toFixed(2)} tons
          </div>
          <p className="text-xs text-muted-foreground mt-1">This year</p>
        </CardContent>
      </Card>
    </div>
  )
}

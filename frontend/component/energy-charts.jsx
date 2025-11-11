import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"

export function EnergyCharts({ energyData, costData, dailyData }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Energy Usage Chart */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Energy Usage Trend</CardTitle>
          <CardDescription>Monthly consumption vs target</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip />
              <Legend />
              <Bar dataKey="usage" fill="var(--color-primary)" />
              <Bar dataKey="target" fill="var(--color-secondary)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly Cost Chart */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Weekly Cost</CardTitle>
          <CardDescription>Energy costs by week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="var(--color-primary)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Daily Energy Chart */}
      <Card className="border-border md:col-span-2">
        <CardHeader>
          <CardTitle>Daily Energy Consumption</CardTitle>
          <CardDescription>Last 7 days of energy usage</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="consumption"
                fill="var(--color-primary)"
                stroke="var(--color-primary)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

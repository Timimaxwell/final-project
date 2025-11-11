import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Briefcase, Calendar } from "lucide-react"

export function JobCard({ id, title, company, location, salary, type, description, category, deadline }) {
  const [isApplied, setIsApplied] = useState(false)

  return (
    <Card className="border-border hover:border-primary/50 transition flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{company}</p>
          </div>
          <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full whitespace-nowrap ml-2">
            {type}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground">{description}</p>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            {salary}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            {category}
          </div>
        </div>

        {deadline && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Deadline: {deadline}
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t border-border mt-auto">
          <Button size="sm" className="flex-1" onClick={() => setIsApplied(!isApplied)}>
            {isApplied ? "Applied" : "Apply Now"}
          </Button>
          <Button size="sm" variant="outline">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Zap, Heart } from "lucide-react"

export function ProviderCard({
  id,
  name,
  type,
  rating,
  reviews,
  location,
  price,
  description,
  services,
}) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card className="border-border overflow-hidden hover:border-primary/50 transition flex flex-col">
      <div className="h-40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative">
        <Zap className="w-12 h-12 text-primary/30" />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background transition"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
            }`}
          />
        </button>
      </div>

      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{type}</p>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-semibold text-foreground">{rating}</span>
            <span className="text-sm text-muted-foreground">({reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{description}</p>

        {services.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {services.slice(0, 3).map((service, idx) => (
              <span
                key={idx}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
              >
                {service}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
          <span className="font-semibold text-primary">{price}</span>
          <Button size="sm">Learn More</Button>
        </div>
      </CardContent>
    </Card>
  )
}

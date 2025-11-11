import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function PricingCard({
  name,
  price,
  description,
  features,
  isPopular = false,
  buttonText = "Get Started",
}) {
  return (
    <Card
      className={`border-border overflow-hidden transition-all ${
        isPopular ? "ring-2 ring-primary md:scale-105" : ""
      }`}
    >
      {isPopular && (
        <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-semibold">
          Most Popular
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <span className="text-4xl font-bold text-foreground">${price}</span>
          <span className="text-muted-foreground ml-2">/month</span>
        </div>

        <Button className="w-full" variant={isPopular ? "default" : "outline"}>
          {buttonText}
        </Button>

        <div className="space-y-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PricingCardData {
  name: string;
  price: string;
  duration: string;
  href: string;
  badge?: string;
  featured?: boolean;
}

interface PricingCardProps {
  plan: PricingCardData;
  features: string[];
}

export function PricingCard({ plan, features }: PricingCardProps) {
  return (
    <Card
      className={cn(
        "relative flex h-full min-h-[600px] flex-col rounded-[24px] border border-border/70 bg-white py-0 shadow-[0_14px_34px_rgba(15,23,42,0.055),0_2px_8px_rgba(15,23,42,0.035)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/45 hover:shadow-[0_24px_52px_rgba(15,23,42,0.10),0_8px_18px_rgba(57,179,79,0.08)] sm:min-h-[620px]",
        plan.featured && "border-accent/40 shadow-[0_18px_42px_rgba(57,179,79,0.09),0_2px_8px_rgba(15,23,42,0.04)]"
      )}
    >
      {plan.badge && (
        <Badge
          variant="secondary"
          className="absolute right-5 top-5 rounded-full border border-accent/15 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
        >
          {plan.badge}
        </Badge>
      )}

      <CardHeader className="p-6 pb-4">
        <p
          className={cn(
            "text-xs font-medium text-muted-foreground/75",
            plan.badge && "pr-28"
          )}
        >
          {plan.duration}
        </p>
        <CardTitle className="mt-2 font-heading text-2xl font-bold text-primary">
          {plan.name}
        </CardTitle>
        <div className="mt-5">
          <span className="font-heading text-[2.625rem] font-extrabold leading-none text-primary">
            {plan.price}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-6 pb-10 pt-3">
        <ul className="space-y-[18px] text-sm font-medium text-muted-foreground">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <Button
            render={<Link href={plan.href} />}
            className={cn(
              "h-12 w-full rounded-xl text-base font-semibold",
              plan.featured
                ? "bg-accent text-accent-foreground shadow-[0_12px_26px_rgba(57,179,79,0.18)] hover:bg-accent/90"
                : "bg-primary text-primary-foreground hover:bg-primary/95"
            )}
          >
            Choose Plan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn, getInitials } from "@/lib/utils";

export interface TestimonialCardData {
  name: string;
  meta: string;
  title: string;
  quote: string;
  source: string;
  avatarClassName?: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialCardData;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <Card
      className={cn(
        "group/testimonial h-[264px] w-[300px] shrink-0 rounded-[22px] border border-slate-700/70 bg-[#07111d] py-0 text-white ring-0 shadow-[0_14px_38px_rgba(0,0,0,0.24)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_20px_50px_rgba(57,179,79,0.10),0_16px_42px_rgba(0,0,0,0.28)] sm:w-[350px] lg:w-[390px]",
        className
      )}
    >
      <CardContent className="flex h-full flex-col p-5">
        <div className="flex items-start gap-3.5">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-base font-bold text-accent-foreground shadow-[0_10px_24px_rgba(57,179,79,0.18)]",
              testimonial.avatarClassName
            )}
          >
            {getInitials(testimonial.name)}
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-heading text-base font-bold text-white">
              {testimonial.name}
            </h3>
            <p className="mt-0.5 truncate text-sm font-medium text-slate-400">
              {testimonial.meta}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1 text-yellow-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="h-3.5 w-3.5 fill-current stroke-current"
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-slate-200">5.0</span>
        </div>

        <p className="mt-3 font-heading text-sm font-bold text-accent">
          {testimonial.title}
        </p>

        <blockquote className="mt-3 line-clamp-4 text-sm leading-6 text-slate-400">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <div className="mt-auto pt-4">
          <Badge
            variant="secondary"
            className="h-7 rounded-full border border-accent/10 bg-accent/10 px-3.5 text-xs font-semibold text-accent"
          >
            {testimonial.source}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Flame,
  Layers3,
  LineChart,
  CreditCard,
  Package,
  ShieldCheck,
  Target,
  Trophy,
  UserCheck,
} from "lucide-react";

import { PublicNav } from "@/components/layouts/public-nav";
import { PublicFooter } from "@/components/layouts/public-footer";
import {
  TestimonialCard,
  type TestimonialCardData,
} from "@/components/marketing/testimonial-card";
import {
  PricingCard,
  type PricingCardData,
} from "@/components/marketing/pricing-card";
import { CollectionCard } from "@/features/content/components/CollectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import type { Collection } from "@/features/content/types";

export const metadata: Metadata = {
  title: {
    absolute: "MDCAT in Second - MDCAT Practice, Q-Bank, Analytics",
  },
  description:
    "Prepare for MDCAT with exam-style Q-Banks, timed quizzes, performance analytics, revision tools, and gamified study momentum.",
  openGraph: {
    title: "MDCAT in Second - Practice Smarter. Score Higher.",
    description:
      "A focused MDCAT preparation platform with Q-Bank practice, quiz review, analytics, revision, and student motivation tools.",
    type: "website",
    url: "https://mdcatinsecond.com",
  },
};

const stats = [
  {
    label: "Practice MCQs",
    value: "25,000+",
    icon: FileQuestion,
  },
  {
    label: "Core Subjects",
    value: "5",
    icon: BookOpen,
  },
  {
    label: "Quiz Mode",
    value: "Timed",
    icon: Clock3,
  },
  {
    label: "Progress Signals",
    value: "Live",
    icon: LineChart,
  },
];

const features = [
  {
    title: "Exam-aligned Q-Bank",
    description:
      "Practice by subject, chapter, and collection with MDCAT-style question flow.",
    icon: Target,
  },
  {
    title: "Timed quiz engine",
    description:
      "Build exam stamina with focused attempts, progress tracking, and review-ready results.",
    icon: Clock3,
  },
  {
    title: "Performance analytics",
    description:
      "Spot weak subjects and chapters quickly so every study session has a target.",
    icon: BarChart3,
  },
  {
    title: "Revision workflow",
    description:
      "Return to bookmarks and wrong questions without hunting through old attempts.",
    icon: BrainCircuit,
  },
  {
    title: "Gamified momentum",
    description:
      "Use streaks, XP, badges, and rankings to keep daily practice visible.",
    icon: Trophy,
  },
  {
    title: "Student-first access",
    description:
      "A clean web app built for repeated practice on desktop, tablet, and mobile.",
    icon: ShieldCheck,
  },
];

const steps = [
  {
    title: "Choose your plan",
    description: "Pick the package that fits your preparation timeline.",
    icon: Package,
  },
  {
    title: "Make payment",
    description: "Pay through the available payment method and keep a screenshot.",
    icon: CreditCard,
  },
  {
    title: "Register & get access",
    description:
      "Submit the enrollment form with payment proof. After admin approval, login credentials are sent to your email.",
    icon: UserCheck,
  },
];

const faqs = [
  {
    question: "Can I browse the Q-Bank before logging in?",
    answer:
      "Yes. You can preview subjects, chapters, and available collections before logging in.",
  },
  {
    question: "How do I enroll?",
    answer:
      "Choose a plan, make payment, submit the enrollment form with payment proof, and wait for admin approval.",
  },
  {
    question: "When will I receive login credentials?",
    answer:
      "After payment verification, your login credentials will be sent to your email.",
  },
  {
    question: "Can I revise wrong or bookmarked questions?",
    answer:
      "Yes. Revision pages help you focus on saved questions and previously missed questions.",
  },
  {
    question: "Does the platform show my weak areas?",
    answer:
      "Yes. Analytics highlight subject accuracy, chapter performance, and priority areas for review.",
  },
  {
    question: "Can I use it on mobile?",
    answer:
      "Yes. The platform is responsive and works on desktop, tablet, and mobile.",
  },
];

const testimonials: TestimonialCardData[] = [
  {
    name: "Ayesha Khan",
    meta: "Lahore",
    title: "Biology Practice",
    quote:
      "The chapter-wise MCQs helped me revise Biology faster. I could clearly see which topics needed more practice.",
    source: "Student",
    avatarClassName: "bg-lime-400 text-slate-950",
  },
  {
    name: "Hamza Ali",
    meta: "Islamabad",
    title: "Timed Quiz Practice",
    quote:
      "The timed quizzes made me more confident for exam-style pressure. The result review helped me avoid repeating mistakes.",
    source: "Student",
    avatarClassName: "bg-blue-500 text-white",
  },
  {
    name: "Fakhir Khan",
    meta: "Multan",
    title: "Progress Tracking",
    quote:
      "The dashboard made my preparation feel organized. I always knew my weak chapters and what to revise next.",
    source: "Student",
    avatarClassName: "bg-violet-500 text-white",
  },
  {
    name: "Maryam Siddiqui",
    meta: "Karachi",
    title: "Wrong Questions Revision",
    quote:
      "The wrong-question revision saved a lot of time. I could focus only on the questions I actually missed.",
    source: "Student",
    avatarClassName: "bg-emerald-400 text-slate-950",
  },
  {
    name: "Abdullah Raza",
    meta: "Rawalpindi",
    title: "Q-Bank Access",
    quote:
      "Being able to browse subjects, chapters, and collections before starting helped me plan my daily practice.",
    source: "Student",
    avatarClassName: "bg-orange-500 text-white",
  },
  {
    name: "Hira Noor",
    meta: "Faisalabad",
    title: "Study Momentum",
    quote:
      "The streaks and progress signals kept me consistent. It felt motivating to keep practicing every day.",
    source: "Student",
    avatarClassName: "bg-cyan-400 text-slate-950",
  },
];

const pricingFeatures = [
  "Full Q-Bank access",
  "Timed quizzes",
  "Chapter practice",
  "Progress tracking",
  "Wrong question revision",
  "Bookmarks",
  "Analytics",
  "Leaderboard",
  "Daily streaks",
];

const pricingPlans: PricingCardData[] = [
  {
    name: "1 Month",
    price: "PKR 2,000",
    duration: "Access duration: 1 month",
    href: "/enrollment?plan=1-month",
  },
  {
    name: "3 Months",
    price: "PKR 5,000",
    duration: "Access duration: 3 months",
    href: "/enrollment?plan=3-month",
    badge: "Most Popular",
    featured: true,
  },
  {
    name: "6 Months",
    price: "PKR 8,000",
    duration: "Access duration: 6 months",
    href: "/enrollment?plan=6-month",
    badge: "Best Value",
  },
];

const qbankPreviewCollections: Collection[] = [
  {
    id: 1001,
    title: "Exercise MCQs",
    type: "exercise",
    description: "Practice topic-wise questions from the selected chapter.",
    status: "published",
    sort_order: 1,
    chapter_id: 101,
    chapter_name: "Cell Biology",
    subject_name: "Biology",
    created_at: "2026-01-01",
  },
  {
    id: 1002,
    title: "Past Paper MCQs",
    type: "past_paper",
    description: "Review previous years' MDCAT-style questions.",
    status: "published",
    sort_order: 2,
    chapter_id: 101,
    chapter_name: "Cell Biology",
    subject_name: "Biology",
    created_at: "2026-01-01",
  },
  {
    id: 1003,
    title: "Practice Test",
    type: "practice_test",
    description: "Start a focused quiz from this collection.",
    status: "published",
    sort_order: 3,
    chapter_id: 102,
    chapter_name: "Human Physiology",
    subject_name: "Biology",
    created_at: "2026-01-01",
  },
  {
    id: 1004,
    title: "Mini Test",
    type: "practice_test",
    description: "Quickly check understanding with a short timed set.",
    status: "published",
    sort_order: 4,
    chapter_id: 201,
    chapter_name: "Organic Chemistry",
    subject_name: "Chemistry",
    created_at: "2026-01-01",
  },
];

const heroFeatureChips = [
  "25,000+ MCQs",
  "Timed Tests",
  "Performance Analytics",
  "Wrong Question Revision",
];

const heroFloatingBadges = [
  {
    label: "Live progress",
    detail: "Track every attempt",
    icon: LineChart,
    className: "right-3 top-3 sm:right-8 sm:top-8 lg:right-[22%] lg:top-[19%]",
  },
  {
    label: "14-day streak",
    detail: "Daily momentum",
    icon: Flame,
    className: "bottom-3 right-3 sm:bottom-8 sm:right-8 lg:right-[5%] lg:bottom-[18%]",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div
        id="home"
        className="relative overflow-hidden bg-primary text-white"
      >
        <Image
          src="/images/marketing/hero-student.webp"
          alt="Student studying with the MDCAT dashboard open on a laptop"
          fill
          sizes="100vw"
          className="z-0 object-cover object-[68%_center] sm:object-[64%_center] lg:object-[62%_center]"
          priority
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/95 via-primary/60 to-black/10" />
        <div className="absolute inset-0 z-0 bg-black/10" />

        <PublicNav variant="hero" />
        <HeroSection />
      </div>

      <main className="flex-1">
        <StatsSection />
        <FeaturesSection />
        <QBankPreviewSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqPreviewSection />
        <FinalCtaSection />
      </main>

      <PublicFooter />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative z-10 overflow-hidden bg-transparent text-white">
      <HeroImageBadges className="hidden lg:block" />

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:min-h-[700px] lg:grid-cols-[0.45fr_0.55fr] lg:gap-10 lg:px-8 lg:pb-32 lg:pt-20">
        <div className="max-w-2xl animate-fade-up lg:pr-6">
          <Badge
            variant="secondary"
            className="mb-6 border-white/10 bg-accent/80 text-white shadow-sm"
          >
            Built for focused MDCAT preparation
          </Badge>

          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
            Practice{" "}
            <span className="text-accent">Smarter.</span>
            <br />
            Score <span className="text-accent">Higher.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Pakistan&apos;s focused MDCAT preparation platform with exam-style
            MCQs, timed quizzes, revision tools, analytics, and progress
            tracking - all in one place.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Button
              render={<Link href={ROUTES.ENROLLMENT} />}
              size="lg"
              className="h-12 w-full rounded-lg bg-accent px-7 text-base font-semibold text-accent-foreground shadow-[0_12px_28px_rgba(57,179,79,0.28)] hover:bg-accent/90 sm:w-auto"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              render={<Link href={ROUTES.SUBJECTS} />}
              size="lg"
              variant="outline"
              className="h-12 w-full rounded-lg border-white/25 bg-white/5 px-7 text-base font-semibold text-white shadow-sm hover:bg-white/10 sm:w-auto"
            >
              Preview Q-Bank
            </Button>
          </div>

          <div className="mt-5 grid max-w-[640px] grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:items-center 2xl:flex-nowrap">
            {heroFeatureChips.map((chip) => (
              <div
                key={chip}
                className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-2 py-1.5 text-[10px] font-semibold leading-none text-white shadow-sm backdrop-blur-md sm:shrink-0 sm:justify-start sm:text-[11px] 2xl:px-2.5"
              >
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" />
                <span className="min-w-0 truncate sm:overflow-visible sm:text-clip sm:whitespace-nowrap">
                  {chip}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroImageBadges({ className }: { className?: string }) {
  return (
    <div className={className}>
      {heroFloatingBadges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.label}
            className={cn(
              "absolute flex items-center gap-2 rounded-2xl border border-white/70 bg-white/90 px-3 py-2 text-primary shadow-lg backdrop-blur-md",
              badge.className
            )}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Icon className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-xs font-bold leading-tight sm:text-sm">
                {badge.label}
              </span>
              <span className="hidden text-[11px] leading-tight text-muted-foreground sm:block">
                {badge.detail}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

function StatsSection() {
  return (
    <section className="relative z-20 bg-background py-8 sm:py-10 lg:-mt-20 lg:bg-transparent lg:pb-12 lg:pt-0">
      <div className="absolute inset-x-0 bottom-0 top-20 hidden bg-background lg:block" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 sm:grid-cols-2 sm:gap-4 sm:px-6 lg:grid-cols-4 lg:gap-5 lg:px-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="h-full min-h-[104px] animate-fade-up rounded-[20px] border border-border/70 bg-white py-0 shadow-[0_12px_32px_rgba(15,23,42,0.06),0_2px_8px_rgba(15,23,42,0.04)] transition-all duration-300 ease-out sm:min-h-[128px] lg:min-h-[150px] lg:hover:-translate-y-1.5 lg:hover:shadow-[0_22px_48px_rgba(15,23,42,0.10),0_4px_14px_rgba(15,23,42,0.06)]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <CardContent className="flex h-full items-center gap-4 p-5 sm:gap-5 sm:p-6 lg:gap-6 lg:p-7">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/15 bg-accent/10 text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] transition-transform duration-300 ease-out sm:h-13 sm:w-13 lg:h-14 lg:w-14 lg:group-hover/card:scale-105">
                  <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold leading-none text-primary transition-colors duration-300 sm:text-3xl lg:text-4xl lg:group-hover/card:text-accent">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-medium leading-snug text-muted-foreground sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="pb-20 pt-12 sm:pb-24 sm:pt-14 lg:pb-28 lg:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
            Platform features
          </p>
          <h2 className="font-heading text-3xl font-bold leading-[1.06] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Everything you need to ace{" "}
            <span className="text-accent">MDCAT</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foreground/70 sm:text-lg">
            Practice, review, and track progress with focused tools built for
            serious MDCAT preparation.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="h-full min-h-[220px] animate-fade-up rounded-[22px] border border-border/60 bg-white py-0 shadow-[0_10px_28px_rgba(15,23,42,0.045),0_1px_5px_rgba(15,23,42,0.035)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.075),0_3px_12px_rgba(15,23,42,0.045)]"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <CardHeader className="h-full p-6 sm:p-7">
                  <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-2xl border border-accent/20 bg-accent/15 text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-transform duration-300 ease-out group-hover/card:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold leading-snug text-primary">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="mt-3 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function QBankPreviewSection() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge
            variant="secondary"
            className="mb-5 border-accent/15 bg-accent/10 text-accent"
          >
            Browse Q-Bank
          </Badge>
          <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Move from syllabus browsing to{" "}
            <span className="text-accent">targeted</span> practice.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-foreground/75 sm:text-lg sm:leading-8">
            Explore subjects, chapters, and collections before logging in, then
            continue straight into focused quiz practice when you are ready.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-[28px] border border-border/60 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.09),0_6px_18px_rgba(15,23,42,0.04)] sm:mt-12">
          <div className="flex items-center justify-between border-b border-border/60 bg-white px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-accent" />
            </div>
            <div className="hidden rounded-full border border-border/70 bg-background px-4 py-2 text-xs font-semibold text-primary shadow-sm sm:block">
              Preview available before login
            </div>
          </div>

          <div className="bg-background/60 p-4 sm:p-6 lg:p-8">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-primary">
                  Collection previews
                </h3>
                <p className="text-sm text-muted-foreground">
                  Jump from browsing into focused question sets.
                </p>
              </div>
              <Badge variant="outline" className="w-fit bg-white">
                4 active collections
              </Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {qbankPreviewCollections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            render={<Link href={ROUTES.SUBJECTS} />}
            className="h-12 rounded-xl bg-accent px-6 text-base font-semibold text-accent-foreground shadow-[0_14px_30px_rgba(57,179,79,0.22)] transition-shadow hover:bg-accent/90 hover:shadow-[0_18px_34px_rgba(57,179,79,0.28)]"
          >
            Explore Subjects
            <Layers3 className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 rounded-full border-accent/15 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent"
          >
            How It Works
          </Badge>
          <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Simple steps to{" "}
            <span className="text-accent">get started</span>
            <br />
            with MDCAT In Second
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            A simple enrollment flow designed to get students access quickly
            after payment verification.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3 lg:mt-14 lg:gap-14">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative text-center">
                <div className="relative mx-auto flex h-30 w-30 items-center justify-center rounded-full bg-white shadow-[0_14px_34px_rgba(15,23,42,0.075),0_3px_12px_rgba(15,23,42,0.04)]">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                    <Icon className="h-10 w-10 stroke-[1.8]" />
                  </div>
                  <div className="absolute -right-1 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground shadow-[0_10px_20px_rgba(57,179,79,0.26)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <h3 className="mt-6 font-heading text-xl font-bold leading-snug text-primary sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div className="pointer-events-none absolute left-[calc(50%+78px)] right-[calc(-50%+78px)] top-[60px] hidden items-center text-primary/80 lg:flex">
                    <span className="h-2.5 w-2.5 rounded-full border-2 border-white bg-accent shadow-[0_0_0_2px_rgba(57,179,79,0.16)]" />
                    <span className="h-px flex-1 bg-primary/55" />
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <Button
            render={<Link href={ROUTES.ENROLLMENT} />}
            className="h-12 rounded-xl bg-accent px-7 text-base font-semibold text-accent-foreground shadow-[0_14px_30px_rgba(57,179,79,0.26)] transition-shadow hover:bg-accent/90 hover:shadow-[0_18px_36px_rgba(57,179,79,0.32)]"
          >
            Start Enrollment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const secondRowTestimonials = [...testimonials].reverse();

  return (
    <section className="overflow-hidden bg-primary py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 rounded-full border-accent/15 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent sm:text-sm"
          >
            Testimonials
          </Badge>
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Trusted by serious <span className="text-accent">MDCAT</span>{" "}
            aspirants
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Real preparation stories from students using focused practice,
            revision, and analytics.
          </p>
        </div>
      </div>

      <div className="testimonial-marquee-group mt-10 space-y-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:mt-12">
        <div className="testimonial-marquee-track gap-5 pr-5">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-primary-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
        <div className="testimonial-marquee-track gap-5 pr-5" data-speed="slow">
          {[...secondRowTestimonials, ...secondRowTestimonials].map(
            (testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-secondary-${index}`}
                testimonial={testimonial}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section
      id="pricing"
      className="scroll-mt-28 bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 rounded-full border-accent/15 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent"
          >
            Pricing
          </Badge>
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Choose the <span className="text-accent">plan</span> that fits your
            preparation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Simple pricing with full access to the complete MDCAT preparation
            platform.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              features={pricingFeatures}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqPreviewSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 rounded-full border-accent/15 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent"
          >
            FAQ
          </Badge>
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl">
            Questions students ask first
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Clear answers before you start your MDCAT preparation.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-5">
          {faqs.map((faq, index) => (
            <Card
              key={faq.question}
              className="h-full rounded-[20px] border border-border/70 bg-white py-0 shadow-[0_10px_28px_rgba(15,23,42,0.045),0_1px_5px_rgba(15,23,42,0.035)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_18px_38px_rgba(15,23,42,0.075),0_4px_12px_rgba(15,23,42,0.045)]"
            >
              <CardHeader className="flex flex-row items-start gap-4 p-5 sm:p-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  {index + 1}
                </div>
                <div>
                  <CardTitle className="text-base font-bold leading-snug text-primary sm:text-lg">
                    {faq.question}
                  </CardTitle>
                  <CardDescription className="mt-3 text-sm leading-6 text-muted-foreground">
                    {faq.answer}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="rounded-t-[36px] bg-primary py-16 text-primary-foreground sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Badge
          variant="secondary"
          className="mb-5 rounded-full border-primary-foreground/10 bg-primary-foreground/10 px-4 py-1.5 text-sm font-semibold text-accent"
        >
          Start today
        </Badge>
        <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          Ready to start focused MDCAT practice?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-primary-foreground/75">
          Choose your plan, submit your enrollment request, and get access after
          verification.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            render={<Link href={ROUTES.ENROLLMENT} />}
            size="lg"
            className="h-12 rounded-xl bg-accent px-6 text-base font-semibold text-accent-foreground shadow-[0_14px_30px_rgba(57,179,79,0.26)] hover:bg-accent/90"
          >
            Start Enrollment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            render={<Link href={ROUTES.SUBJECTS} />}
            size="lg"
            variant="secondary"
            className="h-12 rounded-xl bg-primary-foreground/10 px-6 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/15"
          >
            Preview Q-Bank
            <Layers3 className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

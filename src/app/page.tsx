import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PublicNav } from "@/components/layouts/public-nav";
import { PublicFooter } from "@/components/layouts/public-footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, BrainCircuit, Target, Trophy } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <PublicNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary/5 py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
              The #1 Medical Entry Test Platform
            </Badge>
            <h1 className="mx-auto max-w-4xl text-5xl font-heading font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Master the MDCAT in <span className="text-accent">Seconds</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Join thousands of pre-med students who have dramatically improved their scores using our AI-driven learning platform, comprehensive test banks, and interactive study modules.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button render={<Link href={ROUTES.LOGIN} />} size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90">
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button render={<Link href="/design-system" />} variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 px-8">
                View Design System
              </Button>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] opacity-20 blur-3xl rounded-full bg-gradient-to-tr from-accent to-primary" />
        </section>

        {/* Features / Platform Highlights Section */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-heading font-bold tracking-tight sm:text-4xl">
                Everything you need to succeed
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We&apos;ve combined the best of educational technology to give you an unfair advantage.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Highlight 1 */}
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Smart Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Identify your weak areas instantly. Our AI engine analyzes your performance and suggests targeted practice where you need it most.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Highlight 2 */}
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">Huge Question Bank</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Access over 25,000+ past papers, mock tests, and subject-wise MCQs formatted exactly like the real MDCAT exam.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Highlight 3 */}
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Bite-sized Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Forget long, boring lectures. Learn complex concepts through our interactive, bite-sized chapters and flashcards.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Highlight 4 */}
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Trophy className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">Gamified Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Stay motivated by earning XP, completing daily streaks, and climbing the national leaderboard as you study.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-heading font-bold tracking-tight sm:text-4xl mb-6">
              Ready to secure your medical seat?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10">
              Join today and start taking mock tests immediately.
            </p>
            <Button render={<Link href={ROUTES.LOGIN} />} size="lg" variant="secondary" className="h-14 px-8 text-lg font-semibold text-primary">
              Create Free Account
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}

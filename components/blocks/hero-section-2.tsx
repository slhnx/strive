import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Zap, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const HeroSection = async () => {
  const user = await currentUser();

  return (
    <section className="min-h-screen bg-background relative overflow-hidden">
      {/* Soft decorative shapes */}
      <div className="absolute top-16 left-16 w-32 h-32 bg-brutal-yellow border-4 border-border shadow-brutal rotate-12 opacity-80" />
      <div className="absolute top-40 right-24 w-24 h-24 bg-primary border-4 border-border shadow-brutal -rotate-6 opacity-70" />
      <div className="absolute bottom-40 left-32 w-28 h-28 bg-secondary border-4 border-border shadow-brutal rotate-3 opacity-75" />
      <div className="absolute bottom-24 right-40 w-20 h-20 bg-accent border-4 border-border shadow-brutal -rotate-12 opacity-60" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Top bar */}
        <nav className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-accent border-4 border-border shadow-brutal flex items-center justify-center">
              <Zap
                className="w-7 h-7 text-accent-foreground"
                strokeWidth={2.5}
              />
            </div>
            <span className="font-display text-3xl font-extrabold tracking-tight">
              Strive
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm">
              Features
            </Button>
            <Button variant="ghost" size="sm">
              Pricing
            </Button>
            {!user && (
              <Button variant="outline" size="sm">
                Log In
              </Button>
            )}
          </div>
        </nav>

        {/* Hero content */}
        <div className="max-w-5xl mx-auto text-center mt-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brutal-peach px-5 py-2.5 border-4 border-border shadow-brutal mb-10 font-mono text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            No excuses. Just results.
          </div>

          {/* Main headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 tracking-tight">
            Build Habits
            <br />
            <span className="text-stroke text-transparent">That Don't</span>
            <br />
            <span className="relative inline-block">
              Break
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 8C50 2 150 2 298 8"
                  stroke="hsl(var(--accent))"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="font-mono text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed text-muted-foreground">
            Stop lying to yourself. Track your habits with brutal honesty. No
            gamification fluff—just raw accountability that works.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {!user ? (
              <Link href="/sign-in">
                <Button className="group">
                  Start Tracking Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button className="group">
                  Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            )}
            <Button variant="outline" size="lg">
              See How It Works
            </Button>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: "50K+", label: "Active Users", bg: "bg-brutal-mint" },
              {
                value: "2.3M",
                label: "Habits Tracked",
                bg: "bg-brutal-lavender",
              },
              { value: "89%", label: "Streak Success", bg: "bg-brutal-peach" },
              { value: "0", label: "Excuses Accepted", bg: "bg-brutal-yellow" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 border-4 border-border shadow-brutal ${stat.bg} hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all duration-150`}
              >
                <div className="font-display text-3xl md:text-4xl font-extrabold">
                  {stat.value}
                </div>
                <div className="font-mono text-xs mt-1 text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating habit preview */}
        <div className="hidden lg:block absolute bottom-12 right-12 bg-background border-4 border-border shadow-brutal-lg p-4 max-w-xs">
          <div className="font-mono text-xs text-muted-foreground mb-2">
            Today's Progress
          </div>
          <div className="space-y-2">
            {["Morning Run", "Read 30min", "Meditate"].map((habit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 border-2 border-border ${
                    i < 2 ? "bg-accent" : "bg-background"
                  }`}
                />
                <span className="font-mono text-sm">{habit}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t-2 border-border">
            <div className="font-mono text-xs">🔥 12 day streak</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

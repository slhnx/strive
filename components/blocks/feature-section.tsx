import {
  Flame,
  Calendar,
  BarChart3,
  Trophy,
  Target,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Flame,
    title: "STREAK TRACKING",
    description:
      "Don't break the chain. Every day counts. Miss once and watch your progress burn.",
    color: "bg-brutal-red",
  },
  {
    icon: Calendar,
    title: "HEATMAP CALENDAR",
    description:
      "Visual proof of your consistency—or lack thereof. Green good. Empty bad.",
    color: "bg-accent",
  },
  {
    icon: BarChart3,
    title: "ZERO-FLUFF ANALYTICS",
    description:
      "No vanity metrics. Just cold, hard data about your actual performance.",
    color: "bg-primary",
  },
  {
    icon: Trophy,
    title: "GAMIFIED CONSISTENCY",
    description:
      "XP, levels, badges—earn them through actual work. No participation trophies.",
    color: "bg-brutal-yellow",
  },
  {
    icon: Target,
    title: "GOAL SETTING",
    description:
      "Set targets. Hit them. Or don't. The app will remind you of your failures.",
    color: "bg-secondary",
  },
  {
    icon: Clock,
    title: "TIME BLOCKING",
    description:
      "Schedule your habits. Get reminded. Show up. It's not complicated.",
    color: "bg-brutal-peach",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-brutal-mint">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-foreground text-background px-6 py-3 border-4 border-foreground mb-6 font-mono text-sm font-bold">
            FEATURES THAT ACTUALLY WORK
          </div>
          <h2 className="font-display text-5xl md:text-7xl">
            TOOLS FOR THE
            <br />
            DISCIPLINED
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-background border-4 border-foreground shadow-brutal-lg p-8 hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform duration-100 group"
            >
              <div
                className={`w-16 h-16 ${feature.color} border-4 border-foreground shadow-brutal flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform`}
              >
                <feature.icon className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-2xl mb-4">{feature.title}</h3>
              <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex justify-center gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 border-4 border-foreground shadow-brutal ${
                i < 3 ? "bg-accent" : "bg-background"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

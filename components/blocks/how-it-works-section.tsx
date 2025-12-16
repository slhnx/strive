import { ArrowRight, CheckSquare, Calendar, Link } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "PICK A HABIT",
    description:
      "Choose something you actually want to do. Not your mom's suggestion. YOUR habit.",
    icon: CheckSquare,
    color: "bg-brutal-yellow",
  },
  {
    number: "02",
    title: "SHOW UP DAILY",
    description:
      "Mark it done. Every. Single. Day. No weekends off. No 'I deserve a break.'",
    icon: Calendar,
    color: "bg-accent",
  },
  {
    number: "03",
    title: "DON'T BREAK THE CHAIN",
    description:
      "Watch your streak grow. Feel the pressure. Let the fear of losing motivate you.",
    icon: Link,
    color: "bg-primary",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-accent text-accent-foreground px-6 py-3 border-4 border-foreground shadow-brutal mb-6 font-mono text-sm font-bold">
            DEAD SIMPLE PROCESS
          </div>
          <h2 className="font-display text-5xl md:text-7xl">
            HOW IT
            <br />
            WORKS
          </h2>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {/* Connector arrow (hidden on last item) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/3 -right-4 z-10">
                    <ArrowRight className="w-8 h-8" strokeWidth={4} />
                  </div>
                )}

                <div
                  className={`${step.color} border-4 border-foreground shadow-brutal-lg p-8 h-full`}
                >
                  {/* Step number */}
                  <div className="bg-foreground text-background inline-block px-4 py-2 font-display text-3xl mb-6">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-background border-4 border-foreground shadow-brutal flex items-center justify-center mb-6">
                    <step.icon className="w-8 h-8" strokeWidth={2.5} />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-2xl mb-4">{step.title}</h3>
                  <p className="font-mono text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual chain representation */}
          <div className="mt-16 flex justify-center items-center gap-2">
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 border-4 border-foreground ${
                  i < 12 ? "bg-accent" : "bg-destructive animate-pulse-brutal"
                } ${i === 13 ? "opacity-30" : ""}`}
              />
            ))}
          </div>
          <p className="text-center font-mono text-sm mt-4 text-muted-foreground">
            12 DAY STREAK — DON'T BREAK IT TODAY
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

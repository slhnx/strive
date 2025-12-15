import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { GridScan } from "../shareable/grid-scan";

const CTASection = () => {
  return (
    <section className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-70">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#333"
          gridScale={0.1}
          scanColor="#dddd3c"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA box */}
          <div className="bg-background text-foreground border-4 border-background p-12 shadow-brutal-lg mb-8">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-accent border-4 border-foreground shadow-brutal flex items-center justify-center animate-bounce-brutal">
                <Zap className="w-10 h-10" strokeWidth={2.5} />
              </div>
            </div>

            <h2 className="font-display text-4xl md:text-6xl mb-6">
              DISCIPLINE BEATS
              <br />
              MOTIVATION.
            </h2>

            <p className="font-mono text-lg max-w-xl mx-auto mb-8 text-muted-foreground">
              Motivation fades. Habits don't. Stop waiting for the "perfect
              moment" and start building the life you keep dreaming about.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>START FREE TODAY →</Button>
              <Button variant="outline" size="lg">
                NO CREDIT CARD
              </Button>
            </div>

            <p className="font-mono text-xs mt-8 text-muted-foreground">
              FREE FOREVER PLAN AVAILABLE • UPGRADE ANYTIME • CANCEL WHENEVER
            </p>
          </div>

          {/* Quote box */}
          <div className="bg-brutal-red border-4 border-background p-8">
            <p className="font-display text-xl md:text-2xl text-background">
              "WE ARE WHAT WE REPEATEDLY DO. EXCELLENCE, THEN, IS NOT AN ACT,
              BUT A HABIT."
            </p>
            <p className="font-mono text-sm mt-4 text-background/70">
              — ARISTOTLE (PROBABLY)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

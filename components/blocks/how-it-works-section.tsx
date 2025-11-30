"use client";
import { motion } from "framer-motion";
import { ListChecks, Rocket, LineChart } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ListChecks,
    title: "Set Your Habits",
    description:
      "Choose habits you want to build. Start small, think big. Whether it's reading, exercise, or meditation.",
    color: "bg-cyan-500",
  },
  {
    number: "02",
    icon: Rocket,
    title: "Track Daily",
    description:
      "Check in each day with a single tap. Build your streak and watch your XP multiply with consistency.",
    color: "bg-pink-500",
  },
  {
    number: "03",
    icon: LineChart,
    title: "Level Up",
    description:
      "Gain insights, unlock achievements, and celebrate your transformation. Your new self is waiting.",
    color: "bg-green-500",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Dead Simple.
            <span className="text-primary"> Actually Works.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three steps to building habits that stick for life.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="mb-8 last:mb-0"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div
                  className={`${step.color} border-4 border-foreground shadow-neo-lg p-8 rounded-lg flex-shrink-0 w-full md:w-48 h-48 flex items-center justify-center`}
                >
                  <step.icon className="w-24 h-24 text-foreground" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="text-6xl sm:text-7xl font-black text-muted-foreground/20 mb-2">
                    {step.number}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-3">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

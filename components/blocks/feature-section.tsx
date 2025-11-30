"use client";
import { motion } from "framer-motion";
import { Trophy, Target, TrendingUp, Zap, Award, Calendar } from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Gamified Progress",
    description:
      "Turn habits into quests. Earn XP, level up, and unlock achievements as you build consistency.",
    color: "bg-cyan-500",
  },
  {
    icon: Target,
    title: "Smart Goals",
    description:
      "Set realistic targets and track them effortlessly. Our system adapts to your pace and lifestyle.",
    color: "bg-pink-500",
  },
  {
    icon: TrendingUp,
    title: "Visual Analytics",
    description:
      "See your growth with beautiful charts and stats. Watch your streaks climb and celebrate wins.",
    color: "bg-green-500",
  },
  {
    icon: Zap,
    title: "Quick Check-ins",
    description:
      "Log habits in seconds. No friction, no complexity—just tap and go about your day.",
    color: "bg-yellow-500",
  },
  {
    icon: Award,
    title: "Milestone Rewards",
    description:
      "Unlock special badges and rewards as you hit major milestones. Stay motivated with tangible wins.",
    color: "bg-red-500",
  },
  {
    icon: Calendar,
    title: "Streak Protection",
    description:
      "Life happens. Get streak shields to protect your progress on tough days without losing momentum.",
    color: "bg-purple-500",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Everything You Need to
            <span className="text-primary"> Win the Day</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Packed with features designed to keep you motivated and on track.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card border-4 border-foreground shadow-neo hover:shadow-neo-lg transition-all p-6 h-full hover-lift">
                <div
                  className={`${feature.color} w-14 h-14 rounded-lg border-4 border-foreground shadow-neo-sm flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="text-xl font-black mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

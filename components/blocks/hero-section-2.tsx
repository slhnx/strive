"use client";
import { Button } from "@/components/retroui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-40 md:pt-52 pb-10 sm:pb-16 md:pb-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-accent rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl opacity-40" />
      </div>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded bg-accent border-2 border-black shadow-neo-sm text-xs sm:text-sm font-bold mb-4 sm:mb-6"
            >
              <span className="font-montserrat relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Transform Your Daily Routine
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 tracking-tight font-montserrat"
            >
              Level Up Your Life,
              <br />
              <span className="text-primary">One Habit at a Time</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto font-medium"
            >
              A no-nonsense tracker that turns daily discipline into XP. Build
              streaks, earn rewards, and watch yourself grow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            >
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative px-2 sm:px-4"
          >
            <div className="relative rounded border-4 border-black shadow-neo-xl overflow-hidden bg-card max-w-4xl mx-auto">
              <img
                src="/hero-dashboard.jpg"
                alt="Habit Tracker Dashboard"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

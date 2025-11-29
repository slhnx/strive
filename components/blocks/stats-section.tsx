"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "500K+", label: "Active Users", color: "bg-cyan-500" },
  { value: "10M+", label: "Habits Tracked", color: "bg-pink-500" },
  { value: "95%", label: "Success Rate", color: "bg-green-500" },
  { value: "4.9★", label: "App Rating", color: "bg-yellow-500" },
];

export const StatsSection = () => {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div
                className={`${stat.color} border-4 border-foreground shadow-neo hover:shadow-neo-lg transition-all p-6 text-center hover-lift`}
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-bold uppercase tracking-wide text-foreground">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

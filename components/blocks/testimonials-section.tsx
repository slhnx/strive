"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    content:
      "HabitQuest turned my chaotic routine into a game I actually want to play every day. Three months in and I've never felt more in control.",
    avatar: "👩‍💻",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Fitness Coach",
    content:
      "I recommend this to all my clients. The gamification aspect makes building habits feel natural and fun instead of a chore.",
    avatar: "💪",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Student",
    content:
      "Finally a habit tracker that doesn't feel like homework. The UI is gorgeous and checking in takes literally 5 seconds. Love it!",
    avatar: "📚",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Don't Take Our Word.
            <span className="text-primary"> Take Theirs.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real people, real results, real transformations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-card border-4 border-foreground shadow-neo hover:shadow-neo-lg transition-all p-6 h-full hover-lift">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-6 font-medium leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-black">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

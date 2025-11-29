"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/retroui/Button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggler } from "./theme-toggler";
import Link from "next/link";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how" },
  { name: "Pricing", href: "#pricing" },
];

export const Header = () => {
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 lg:dark:bg-transparent bg-white dark:bg-neutral-900 lg:bg-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <Link href="/">
              <span className="text-xl font-bold font-pixel">Strive</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <SignInButton>
                <Button variant="default" size="sm">
                  Sign Up
                </Button>
              </SignInButton>
            ) : (
              <SignOutButton>
                <Button variant="default" size="sm">
                  Sign Out
                </Button>
              </SignOutButton>
            )}

            <ThemeToggler />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 space-y-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 space-y-2">
                  {!user ? (
                    <SignInButton>
                      <Button variant="default" size="sm">
                        Sign Up
                      </Button>
                    </SignInButton>
                  ) : (
                    <SignOutButton>
                      <Button variant="default" size="sm">
                        Sign Out
                      </Button>
                    </SignOutButton>
                  )}
                </div>
              </div>
              <ThemeToggler />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

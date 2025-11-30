import { Heart, Twitter, Github, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t-4 border-foreground bg-card py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-black mb-4">Strive</h3>
            <p className="text-muted-foreground text-sm">
              Level up your life, one habit at a time.
            </p>
          </div>

          <div>
            <h4 className="font-black mb-4 uppercase text-sm">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Roadmap
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-4 uppercase text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-4 uppercase text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-4 border-foreground pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Made with{" "}
            <Heart className="w-4 h-4 fill-destructive text-destructive" /> by
            HabitQuest Team
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-primary border-4 border-foreground shadow-neo hover:shadow-neo-md transition-all flex items-center justify-center hover-lift"
            >
              <Twitter className="w-5 h-5 text-foreground" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-secondary border-4 border-foreground shadow-neo hover:shadow-neo-md transition-all flex items-center justify-center hover-lift"
            >
              <Github className="w-5 h-5 text-foreground" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-accent border-4 border-foreground shadow-neo hover:shadow-neo-md transition-all flex items-center justify-center hover-lift"
            >
              <Linkedin className="w-5 h-5 text-foreground" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

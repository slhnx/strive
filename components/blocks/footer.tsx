import { Zap } from "lucide-react";

const FooterSection = () => {
  const links = {
    product: ["Features", "Pricing", "Changelog", "Roadmap"],
    company: ["About", "Blog", "Careers", "Press"],
    resources: ["Help Center", "API Docs", "Community", "Templates"],
    legal: ["Privacy", "Terms", "Cookies", "GDPR"],
  };

  return (
    <footer className="py-16 bg-background border-t-4 border-foreground">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent border-4 border-foreground shadow-brutal flex items-center justify-center">
                <Zap className="w-5 h-5" strokeWidth={3} />
              </div>
              <span className="font-display text-xl">STRIVE</span>
            </div>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              Building habits for people who are done making excuses.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-display text-sm mb-4 uppercase">
                {category}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-mono text-xs text-muted-foreground hover:text-foreground hover:underline transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t-4 border-foreground pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-xs text-muted-foreground">
            © 2024 STRIVE. ALL RIGHTS RESERVED. NO EXCUSES.
          </div>
          <div className="flex gap-4">
            {["TWITTER", "DISCORD", "GITHUB"].map((social) => (
              <a
                key={social}
                href="#"
                className="font-mono text-xs px-3 py-2 border-2 border-foreground hover:bg-brutal-yellow transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* ASCII art */}
        <pre className="font-mono text-xs text-center mt-12 text-muted-foreground hidden md:block">
          {`
░██████╗████████╗██████╗░██╗██╗░░░██╗███████╗
██╔════╝╚══██╔══╝██╔══██╗██║██║░░░██║██╔════╝
╚█████╗░░░░██║░░░██████╔╝██║╚██╗░██╔╝█████╗░░
░╚═══██╗░░░██║░░░██╔══██╗██║░╚████╔╝░██╔══╝░░
██████╔╝░░░██║░░░██║░░██║██║░░╚██╔╝░░███████╗
╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░░╚═╝░░░╚══════╝

█▀▄▀█ ▄▀█ █▀▄ █▀▀   █▄▄ █▄█   █▀ █░█ ▄▀█ █▄░█ ▄▀█ █▀▀ █▀█ █▀▄ █▀▀ █▀
█░▀░█ █▀█ █▄▀ ██▄   █▄█ ░█░   ▄█ █▀█ █▀█ █░▀█ █▀█ █▄▄ █▄█ █▄▀ ██▄ ▄█
`}
        </pre>
      </div>
    </footer>
  );
};

export default FooterSection;

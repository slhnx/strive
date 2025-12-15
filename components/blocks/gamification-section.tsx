const GamificationSection = () => {
  const stats = [
    { label: "LEVEL", value: "23", subtext: "HABIT MASTER" },
    { label: "XP", value: "4,850", subtext: "/5,000 TO NEXT LVL" },
    { label: "STREAK", value: "47", subtext: "DAYS ACTIVE" },
    { label: "RANK", value: "#142", subtext: "GLOBAL LEADERBOARD" },
  ];

  const badges = [
    { name: "FIRST WEEK", icon: "🔥", earned: true },
    { name: "30 DAY WARRIOR", icon: "⚔️", earned: true },
    { name: "EARLY BIRD", icon: "🌅", earned: true },
    { name: "PERFECTIONIST", icon: "💎", earned: false },
    { name: "100 DAYS", icon: "👑", earned: false },
  ];

  return (
    <section className="py-24 bg-brutal-lavender">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-brutal-yellow text-foreground px-6 py-3 border-4 border-foreground shadow-brutal mb-6 font-mono text-sm font-bold">
            LEVEL UP YOUR LIFE
          </div>
          <h2 className="font-display text-5xl md:text-7xl">
            GAMIFICATION
            <br />
            <span className="text-stroke text-transparent">THAT HURTS</span>
          </h2>
        </div>

        {/* Game HUD style panel */}
        <div className="max-w-4xl mx-auto">
          {/* Main stats panel */}
          <div className="bg-foreground text-background border-4 border-foreground p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-4 h-4 bg-accent" />
              <span className="font-mono text-sm">PLAYER_STATS.exe</span>
              <div className="flex-1 border-b-2 border-dashed border-background/30" />
              <span className="font-mono text-xs">v2.4.1</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-background text-foreground p-4 border-4 border-background"
                >
                  <div className="font-mono text-xs text-muted-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="font-display text-4xl">{stat.value}</div>
                  <div className="font-mono text-xs mt-1 text-muted-foreground">
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="bg-background border-4 border-foreground shadow-brutal p-6 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-sm font-bold">
                PROGRESS TO LVL 24
              </span>
              <span className="font-mono text-sm">97%</span>
            </div>
            <div className="h-8 bg-muted border-4 border-foreground relative overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: "97%" }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold  text-white">
                4,850 / 5,000 XP
              </div>
            </div>
          </div>

          {/* Badges section */}
          <div className="bg-brutal-peach border-4 border-foreground shadow-brutal p-6">
            <h3 className="font-display text-xl mb-4">BADGES_EARNED.log</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {badges.map((badge, i) => (
                <div
                  key={i}
                  className={`p-4 border-4 border-foreground text-center ${
                    badge.earned ? "bg-background" : "bg-muted opacity-50"
                  }`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div className="font-mono text-xs font-bold">
                    {badge.name}
                  </div>
                  {!badge.earned && (
                    <div className="font-mono text-xs text-muted-foreground mt-1">
                      LOCKED
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamificationSection;

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import QuickAccess from './sections/QuickAccess';
import Timeline from './sections/Timeline';
import EnergyGrid from './sections/EnergyGrid';
import ENFJStage from './sections/ENFJStage';
import Now from './sections/Now';
import Connect from './sections/Connect';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream text-stone overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Quick Access Cards */}
        <QuickAccess />

        {/* Life Timeline */}
        <Timeline />

        {/* Energy Grid */}
        <EnergyGrid />

        {/* ENFJ Personality Stage */}
        <ENFJStage />

        {/* Current Status */}
        <Now />

        {/* Connect Form */}
        <Connect />
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 border-t border-stone/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-gradient-soft">
              郝洋
            </span>
            <span className="text-stone/30">·</span>
            <span className="font-mono text-sm text-stone-soft">
              白天上班族 / 法语译者 / 旅行者 / 组织者
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#timeline"
              className="font-mono text-sm text-stone-soft hover:text-blush-dark transition-colors"
            >
              时间轴
            </a>
            <a
              href="#energy"
              className="font-mono text-sm text-stone-soft hover:text-lavender-dark transition-colors"
            >
              能量场
            </a>
            <a
              href="#enfj"
              className="font-mono text-sm text-stone-soft hover:text-peach-dark transition-colors"
            >
              ENFJ
            </a>
            <a
              href="#now"
              className="font-mono text-sm text-stone-soft hover:text-mint-dark transition-colors"
            >
              此刻
            </a>
          </div>
          <p className="font-mono text-xs text-stone/40">
            © 2024 郝洋. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

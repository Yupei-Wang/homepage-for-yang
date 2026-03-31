import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: '时间轴', href: '#timeline' },
  { label: '能量场', href: '#energy' },
  { label: 'ENFJ', href: '#enfj' },
  { label: '此刻', href: '#now' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-light shadow-soft border-b border-stone/10 backdrop-saturate-150'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-2xl font-bold text-gradient-soft hover:opacity-90 transition-opacity duration-300"
          >
            郝洋
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="relative font-display text-sm font-medium text-stone-soft hover:text-stone transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-gradient-to-r from-stone via-blush to-peach transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('#connect')}
              className="relative px-6 py-2.5 bg-gradient-to-r from-blush to-lavender text-white font-display text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-soft group overflow-hidden"
            >
              <span className="relative z-10">找我聊聊</span>
              <div className="absolute inset-0 bg-gradient-to-r from-lavender to-mint opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-stone hover:text-blush-dark transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass-light transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="block w-full text-left font-display text-base font-medium text-stone-soft hover:text-stone transition-colors duration-300 py-2"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#connect')}
            className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blush to-lavender text-white font-display text-sm font-medium rounded-full"
          >
            找我聊聊 →
          </button>
        </div>
      </div>
    </nav>
  );
}

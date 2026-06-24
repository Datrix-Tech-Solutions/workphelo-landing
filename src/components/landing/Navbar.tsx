'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gentleSpring } from '@/lib/animations';

const NAV_LINKS = ['modules', 'dashboard', 'benefits', 'about'] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(useScroll().scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...gentleSpring, delay: 0.2 }}
          className={`mx-auto transition-all duration-500 ${
            scrolled || mobileMenuOpen
              ? 'max-w-3xl mt-3 px-2 py-1.5 rounded-full bg-white/70 backdrop-blur-2xl shadow-lg shadow-black/6 border border-white/40 flex items-center justify-between text-foreground'
              : 'max-w-7xl mt-0 px-6 sm:px-8 lg:px-12 py-3 flex items-center justify-between text-white'
          }`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Image
              src="/images/workphelo-logo.png"
              alt="Workphelo"
              width={120}
              height={32}
              className={`h-5 w-auto transition-all duration-500 ${
                scrolled ? 'h-5 w-auto opacity-100' : 'h-5.5 w-auto brightness-0 invert'
              }`}
            />
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-3 py-2 rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer capitalize min-h-11 flex items-center ${
                  scrolled
                    ? 'text-muted-foreground hover:text-foreground hover:bg-black/5'
                    : 'hover:bg-white/10'
                }`}
                style={!scrolled ? { color: 'white' } : undefined}
              >
                {id === 'about' ? 'Built for Africa' : id}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center shrink-0">
            <Button
              onClick={() => scrollTo('waitlist-cta')}
              className={`rounded-full font-semibold cursor-pointer transition-all duration-300 text-[13px] px-4 ${
                scrolled
                  ? 'bg-blue-900 hover:bg-blue-950 text-white shadow-md shadow-blue-900/20'
                  : 'bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-white/25'
              }`}
            >
              Join Waitlist
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>

          <Button
            onClick={() => scrollTo('waitlist-cta')}
            className={`md:hidden ml-auto mr-2 h-9 rounded-full px-3 text-[12px] font-semibold cursor-pointer transition-all duration-300 shadow-sm ${
              scrolled || mobileMenuOpen
                ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-700/20'
                : 'bg-white text-blue-950 hover:bg-white/90 shadow-black/10'
            }`}
            aria-label="Join waitlist"
          >
            Join Waitlist
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-1.5 rounded-full cursor-pointer transition-colors ${
              scrolled ? 'text-foreground hover:bg-black/5' : 'hover:bg-white/10'
            }`}
            style={!scrolled ? { color: 'white' } : undefined}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-blue-950/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {NAV_LINKS.map((id, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ ...gentleSpring, delay: 0.05 + i * 0.06 }}
                  onClick={() => scrollTo(id)}
                  className="text-2xl font-semibold text-white/80 hover:text-white transition-colors capitalize cursor-pointer py-3"
                >
                  {id === 'about' ? 'Built for Africa' : id}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ ...gentleSpring, delay: 0.05 + NAV_LINKS.length * 0.06 }}
                className="mt-4"
              >
                <Button
                  onClick={() => scrollTo('waitlist-cta')}
                  className="rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold cursor-pointer shadow-lg shadow-orange-600/30 px-8"
                >
                  Join the Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

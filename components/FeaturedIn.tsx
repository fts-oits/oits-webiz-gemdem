
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

const PUBLICATIONS = [
  { name: 'TechCrunch', ariaLabel: 'Featured in TechCrunch' },
  { name: 'Wired', ariaLabel: 'Featured in Wired Magazine' },
  { name: 'Forbes', ariaLabel: 'Featured in Forbes' },
  { name: 'Business Insider', ariaLabel: 'Featured in Business Insider' },
  { name: 'The Verge', ariaLabel: 'Featured in The Verge' },
];

export const FeaturedIn: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-24 md:py-32 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden">
      {/* Subtle Parallax Background Element */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="absolute top-10 left-10 w-64 h-64 border-[40px] border-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 border-[60px] border-indigo-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-16 animate-fade-in">
            Recognized by Global Tech Media
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-16 md:gap-x-24 mb-20">
            {PUBLICATIONS.map((pub) => (
              <div 
                key={pub.name} 
                role="img"
                aria-label={pub.ariaLabel}
                className="group flex items-center justify-center transition-all duration-500 cursor-default"
              >
                <span className="text-2xl md:text-4xl font-black text-slate-300 dark:text-slate-700 tracking-tighter transition-all duration-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 group-hover:rotate-2">
                  {pub.name}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-50 dark:border-slate-800/50">
            <Link to="/portfolio" className="inline-block">
              <Button 
                variant="outline" 
                size="lg" 
                className="group rounded-full border-slate-200 dark:border-slate-700 px-12 transition-all hover:bg-slate-900 hover:text-white dark:hover:bg-blue-600 dark:hover:border-blue-600"
              >
                View Our Work
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

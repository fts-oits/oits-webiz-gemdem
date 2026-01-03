import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal as TerminalIcon, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { TAGLINE, COMPANY_NAME } from '../constants';

const CODE_SNIPPET = `// OITS Dhaka Project Config
const project = {
  client: "Innovative Startup",
  goals: ["Scalability", "Security"],
  techStack: ["React", "Next.js", "AWS"],
  status: "Ready for Launch"
};

async function deploy() {
  console.log("Initializing Engineering...");
  await project.initialize();
  return "Excellence Delivered.";
}`;

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedCode, setTypedCode] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedCode(CODE_SNIPPET.slice(0, i));
      i++;
      if (i > CODE_SNIPPET.length) clearInterval(interval);
    }, 12);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    
    if (heroRef.current) observer.observe(heroRef.current);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center transition-all duration-500">
      {/* Parallax Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 blur-[2px] scale-110 transition-transform duration-100 ease-out"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070")',
            transform: `translateY(${scrollY * 0.15}px)` 
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 dark:from-slate-950 via-slate-50/95 dark:via-slate-950/95 to-slate-50 dark:to-slate-950" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 space-y-10 text-center lg:text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Zap size={12} className="fill-current animate-pulse" />
              <span>Engineering Excellence</span>
            </div>
            
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1] transition-all duration-[600ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Building the <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Digital Elite</span>
            </h1>
            
            <div className={`space-y-6 transition-all duration-[600ms] delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className={`text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed`}>
                {TAGLINE}. High-performance software engineering for businesses that refuse to settle for second best.
              </p>

              <div className={`flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start`}>
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    variant="primary" 
                    className="group relative overflow-hidden transition-all duration-300 hover:scale-105 px-10 shadow-2xl shadow-blue-600/30 dark:shadow-blue-500/20 active:scale-95"
                  >
                    Request a Quote
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Our Portfolio
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className={`flex-1 w-full max-w-2xl transition-all duration-[1000ms] delay-300 transform ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'}`}>
            <div className="relative">
              <div className="absolute -top-12 -left-8 md:-left-16 w-full max-w-sm z-20 hidden md:block animate-float">
                <div className="bg-slate-950/95 backdrop-blur-xl rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 border-b border-slate-800">
                    <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div><div className="w-2 h-2 rounded-full bg-yellow-500"></div><div className="w-2 h-2 rounded-full bg-green-500"></div></div>
                    <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2"><TerminalIcon size={10}/> main.ts</div>
                  </div>
                  <div className="p-5 font-mono text-[11px] leading-relaxed text-blue-400 h-52 overflow-hidden whitespace-pre-wrap">
                    {typedCode}<span className="w-1.5 h-4 bg-blue-500 inline-block align-middle ml-1 animate-pulse"></span>
                  </div>
                </div>
              </div>
              <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden aspect-[4/3] group">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-95 transition-transform duration-1000 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
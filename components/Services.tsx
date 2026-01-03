import React, { useEffect, useRef, useState } from 'react';
import { Globe, Smartphone, Users, Cloud, ArrowUpRight, X, Check, Info } from 'lucide-react';
import { SERVICES } from '../constants';
import { SectionId, Service } from '../types';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
};

export const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [hoveredDescriptionId, setHoveredDescriptionId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={SectionId.SERVICES} className="py-24 md:py-32 bg-white dark:bg-slate-900 relative transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.1]">
              Future-proof solutions <br className="hidden lg:block" /> for digital natives.
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm text-lg leading-relaxed">
            We bridge the gap between complex problems and elegant code using modern architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className={`group relative bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-[2rem] p-10 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20 hover:border-blue-400/50 dark:hover:border-blue-600/50 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedService(service)}
              role="button"
              tabIndex={0}
              aria-label={`Service: ${service.title}. Click to view details.`}
              aria-haspopup="dialog"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedService(service);
                }
              }}
            >
              <div className="w-14 h-14 shrink-0 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white shadow-sm mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:animate-subtle-bounce">
                {iconMap[service.icon]}
              </div>

              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{service.title}</h4>
              
              <div 
                className="relative mb-6"
                onMouseEnter={() => setHoveredDescriptionId(service.id)}
                onMouseLeave={() => setHoveredDescriptionId(null)}
              >
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 overflow-hidden">
                  {service.description}
                </p>
                {hoveredDescriptionId === service.id && (
                  <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-slate-900 dark:bg-slate-800 text-white text-xs rounded-xl shadow-2xl z-20 animate-in fade-in slide-in-from-bottom-2 pointer-events-none">
                    <p>{service.description}</p>
                    <div className="absolute top-full left-4 -mt-px border-8 border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-8">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <Check size={14} className="text-blue-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="h-px w-full bg-slate-200 dark:bg-slate-700/50" />
                <button 
                  className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all group/btn uppercase tracking-widest outline-none hover:scale-105"
                  aria-hidden="true"
                >
                  Learn More <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 group-hover/btn:scale-125" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-500">
            <div className="p-8 md:p-12 relative">
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400"
                aria-label="Close service details"
              >
                <X size={24} />
              </button>
              
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8">
                {iconMap[selectedService.icon]}
              </div>

              <h3 id="modal-title" className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{selectedService.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                {selectedService.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedService.features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-left-4 duration-500"
                    style={{ animationDelay: `${idx * 80}ms`, fillMode: 'both' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex gap-4">
                <Link to="/contact" className="flex-1" onClick={() => setSelectedService(null)}>
                  <Button variant="primary" className="w-full" aria-label={`Start consultation for ${selectedService.title}`}>Consult Now</Button>
                </Link>
                <Button onClick={() => setSelectedService(null)} variant="outline" aria-label="Close modal">Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

import React from 'react';
import { About } from '../components/About';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const LOGOS = [
  { name: 'TechFlow' },
  { name: 'CloudScale' },
  { name: 'DevOps' },
  { name: 'Innovate' },
  { name: 'GlobalLogistics' },
  { name: 'Fintech' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 animate-fade-in bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,_rgba(37,99,235,0.15),_transparent)]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-blue-400 font-bold uppercase tracking-[0.3em] mb-4 text-xs">Our Story</h2>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">Human Centered. <br/> Tech Driven.</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
            OITS Dhaka is a collective of visionary engineers and designers obsessed with crafting high-performance digital products.
          </p>
        </div>
      </div>

      <About />
      
      {/* Trusted By Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <p className="text-center text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-12">Our Ecosystem Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale transition-all hover:grayscale-0">
            {LOGOS.map((logo) => (
              <span key={logo.name} className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{logo.name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight">Built on a foundation of excellence.</h2>
                <div className="space-y-12">
                   {[
                     { title: "Innovation first", desc: "We don't follow trends; we set them by experimenting with bleeding-edge technology that solves real problems." },
                     { title: "Radical Transparency", desc: "Clients are part of our internal Slack. You see the progress, the hurdles, and the wins in real-time." },
                     { title: "Uncompromising Quality", desc: "Our CI/CD pipelines and QA protocols ensure that nothing enters production without being bulletproof." }
                   ].map((val) => (
                     <div key={val.title} className="group">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">{val.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{val.desc}</p>
                     </div>
                   ))}
                </div>
              </div>
              <div className="relative">
                 <div className="aspect-square bg-blue-600/5 rounded-full absolute -inset-10 animate-pulse" />
                 <img 
                   src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
                   className="relative z-10 rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
                   alt="Collaborative work environment"
                 />
              </div>
           </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
           <h3 className="text-3xl font-bold mb-10">Want to join our mission?</h3>
           <Link to="/contact">
             <Button size="lg" variant="primary" className="bg-white text-slate-900 hover:bg-slate-100">Work with us</Button>
           </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

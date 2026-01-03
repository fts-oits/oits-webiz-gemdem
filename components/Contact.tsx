import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';
import { CONTACT_EMAIL } from '../constants';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Minimum 3 characters required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Provide a valid business email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please share your inquiry details';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more context (min 10 chars)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }, 1500);
  };

  const getLabelClass = (field: keyof typeof formData) => {
    const isActive = focusedField === field || formData[field].length > 0;
    return `absolute left-4 transition-all duration-300 pointer-events-none font-black uppercase tracking-[0.2em] text-[10px] 
      ${isActive ? '-top-2.5 bg-white dark:bg-slate-900 px-3 text-blue-600 dark:text-blue-400 opacity-100 z-10 scale-95' : 'top-5 text-slate-500 opacity-60 translate-y-0 scale-100'}`;
  };

  const getInputClass = (field: keyof typeof formData) => {
    const hasError = !!errors[field];
    const isFocused = focusedField === field;
    return `w-full bg-slate-50 dark:bg-slate-900/40 border-2 transition-all duration-300 rounded-2xl px-5 py-4 text-slate-900 dark:text-slate-100 placeholder-transparent focus:outline-none ring-offset-2 dark:ring-offset-slate-950
      ${hasError ? 'border-red-500 ring-red-500/10 animate-shake' : isFocused ? 'border-blue-600 ring-4 ring-blue-600/5 shadow-[0_0_25px_rgba(37,99,235,0.1)]' : 'border-slate-200 dark:border-slate-800'}`;
  };

  return (
    <section ref={sectionRef} id={SectionId.CONTACT} className="py-24 md:py-32 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="space-y-12">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.4em] mb-4">Start a Conversation</h2>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tighter">
                Let's turn your vision into <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600">scalable reality.</span>
              </h3>
            </div>
            
            <p className={`text-slate-600 dark:text-slate-400 text-xl md:text-2xl max-w-md transition-all duration-1000 delay-100 ease-out leading-relaxed ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Our team of expert engineers is ready to discuss your specific technical roadmap and project requirements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4">
              {[
                { icon: Mail, label: 'Email Engineering', value: CONTACT_EMAIL, aria: `Email us at ${CONTACT_EMAIL}` },
                { icon: Phone, label: 'Direct Line', value: '+880 1234 567890', aria: "Call our office" }
              ].map((item, idx) => (
                <div key={item.label} className={`flex flex-col gap-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`} style={{ transitionDelay: `${200 + (idx * 150)}ms` }}>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200/50 dark:border-blue-800/50">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <a href={item.label === 'Email Engineering' ? `mailto:${item.value}` : `tel:${item.value}`} className="text-lg md:text-xl font-black text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors" aria-label={item.aria}>
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-blue-500/5 dark:shadow-none border-2 border-slate-50 dark:border-slate-800/50 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
             {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 animate-in zoom-in-95 duration-500">
                   <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8 shadow-inner">
                      <CheckCircle2 size={48} />
                   </div>
                   <h4 className="text-4xl font-black text-slate-900 dark:text-white mb-4 text-center tracking-tight">Inquiry Received</h4>
                   <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 leading-relaxed text-center">Your technical brief has been sent to our lead architect. We'll be in touch within 24 hours.</p>
                   <Button variant="outline" onClick={() => setStatus('idle')} className="w-full rounded-2xl py-6" aria-label="Send another message">Submit New Brief</Button>
                </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                 <div className="space-y-8">
                   <div className="relative group">
                     <label id="label-name" htmlFor="name" className={getLabelClass('name')}>
                        Full Name
                     </label>
                     <input 
                        type="text" 
                        id="name"
                        autoComplete="name"
                        aria-labelledby="label-name"
                        aria-invalid={!!errors.name}
                        className={getInputClass('name')}
                        placeholder="Full Name"
                        value={formData.name}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => {
                          setFormData({...formData, name: e.target.value});
                          if(errors.name) setErrors({...errors, name: undefined});
                        }}
                     />
                     {errors.name && (
                       <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-red-500/5 border border-red-500/10 rounded-xl animate-in slide-in-from-top-1">
                         <AlertCircle size={14} className="text-red-600 dark:text-red-400" />
                         <span className="text-red-600 dark:text-red-400 text-xs font-bold">{errors.name}</span>
                       </div>
                     )}
                   </div>

                   <div className="relative group">
                     <label id="label-email" htmlFor="email" className={getLabelClass('email')}>
                        Work Email
                     </label>
                     <input 
                        type="email" 
                        id="email"
                        autoComplete="email"
                        aria-labelledby="label-email"
                        aria-invalid={!!errors.email}
                        className={getInputClass('email')}
                        placeholder="Work Email Address"
                        value={formData.email}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => {
                          setFormData({...formData, email: e.target.value});
                          if(errors.email) setErrors({...errors, email: undefined});
                        }}
                     />
                     {errors.email && (
                       <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-red-500/5 border border-red-500/10 rounded-xl animate-in slide-in-from-top-1">
                         <AlertCircle size={14} className="text-red-600 dark:text-red-400" />
                         <span className="text-red-600 dark:text-red-400 text-xs font-bold">{errors.email}</span>
                       </div>
                     )}
                   </div>
                 </div>
                 
                 <div className="relative group">
                   <label id="label-message" htmlFor="message" className={getLabelClass('message')}>
                      Project Brief
                   </label>
                   <textarea 
                      id="message"
                      aria-labelledby="label-message"
                      aria-invalid={!!errors.message}
                      rows={5}
                      className={`${getInputClass('message')} resize-none`}
                      placeholder="Describe your project goal..."
                      value={formData.message}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => {
                        setFormData({...formData, message: e.target.value});
                        if(errors.message) setErrors({...errors, message: undefined});
                      }}
                   />
                   {errors.message && (
                     <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-red-500/5 border border-red-500/10 rounded-xl animate-in slide-in-from-top-1">
                       <AlertCircle size={14} className="text-red-600 dark:text-red-400" />
                       <span className="text-red-600 dark:text-red-400 text-xs font-bold">{errors.message}</span>
                     </div>
                   )}
                 </div>

                 <Button 
                   type="submit" 
                   variant="primary" 
                   size="lg" 
                   className="w-full text-lg shadow-xl shadow-blue-600/30 rounded-2xl py-8 active:scale-[0.98] transition-all"
                   disabled={status === 'sending'}
                   aria-label="Submit project consultation form"
                 >
                   <span className="flex items-center gap-2">
                     {status === 'sending' ? (
                       <>
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         Sending Brief...
                       </>
                     ) : (
                       <>
                         Send Message
                         <Send size={20} className="ml-1" />
                       </>
                     )}
                   </span>
                 </Button>
               </form>
             )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </section>
  );
};
import {useTranslations} from 'next-intl';
import LanguageSwitcher from '../../components/language-switcher';

import React from 'react';
import { ShieldCheck, Lock, Server, Terminal, Mail, ChevronRight } from 'lucide-react';

export default function Home() {
  const t = useTranslations('HomePage');
  
  return (
    
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500 selection:text-white">
      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-100">
            {/* <ShieldCheck className="text-blue-500" /> */}
            <span>CYBER<span className="text-blue-500">SIMPLE</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
          <div className="p-6 flex justify-end">
            <LanguageSwitcher />
          </div>
        </div>

      </nav>

      {/* --- Hero Section --- */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-start justify-center min-h-[80vh]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-blue-400 text-xs font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Available for Freelance Projects
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-100 tracking-tight mb-6">
          Protecting Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Digital Infrastructure
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          I provide specialized cybersecurity consulting for small to mid-sized businesses. 
          From vulnerability assessments to network hardening, I ensure your assets stay secure in an evolving threat landscape.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-200 transition-all">
            Secure Your Business
            <ChevronRight size={20} />
          </a>
          <a href="#services" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 border border-slate-700 text-white font-semibold rounded-lg hover:border-blue-500 transition-all">
            View Services
          </a>
        </div>
      </section>

            {/* --- Services Section --- */}
      <section id="services" className="py-24 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Core Competencies</h2>
            <p className="text-slate-400 max-w-2xl">
              Modern security requires a multi-layered approach. Here is how I can help you mitigate risk.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-950 transition-colors">
                <Terminal className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Penetration Testing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Simulated cyberattacks against your computer system to check for exploitable vulnerabilities before the bad guys do.
              </p>
            </div>

            {/* Service 2 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-950 transition-colors">
                <Lock className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Network Hardening</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Securing your network infrastructure by reducing the surface of vulnerability through configuration and architecture audits.
              </p>
            </div>

            {/* Service 3 */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-950 transition-colors">
                <Server className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Compliance Audits</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Ensuring your business meets industry standards (SOC2, ISO 27001, HIPAA) regarding data privacy and security controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- About / Tech Stack --- */}
      <section id="about" className="py-24 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-100 mb-6">About My Approach</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              I am a security professional with a background in system administration and offensive security. I believe that security shouldn't be a blocker to business, but an enabler. 
            </p>
            <p className="text-slate-400 mb-8 leading-relaxed">
              My methodology involves understanding your unique business logic first, then applying technical controls that fit your workflow, not just a checklist.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {['Python', 'Linux', 'Wireshark', 'Burp Suite', 'AWS Security', 'Bash Scripting'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-blue-400">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex-1 w-full p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck size={150} />
             </div>
             <h3 className="text-lg font-bold text-white mb-4">Why Hire a Freelancer?</h3>
             <ul className="space-y-4">
                {[
                  "Direct communication with the expert",
                  "Cost-effective compared to agencies",
                  "Flexible scheduling for urgent audits",
                  "Tailored reports, not automated scans"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {item}
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </section>

      {/* --- Contact Footer --- */}
      <footer id="contact" className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Ready to secure your assets?</h2>
          <p className="text-slate-400 mb-10">
            Reach out for a preliminary consultation. <br />
            I usually respond within 24 hours.
          </p>
          
          <a 
            href="mailto:contact@example.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors mb-16"
          >
            <Mail size={18} />
            Get in Touch
          </a>

          <div className="flex justify-center gap-8 mb-12">
            {/* <a href="#" className="text-slate-500 hover:text-white transition-colors">link1</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">link2</a> */}
          </div>

          <div className="text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </footer>

      

    </div>
    
  );
}
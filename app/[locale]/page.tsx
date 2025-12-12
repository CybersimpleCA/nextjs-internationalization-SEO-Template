'use client'; 

import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../../components/language-switcher';
import React, { useState } from 'react'; 
import { ShieldCheck, Lock, Server, Terminal, Mail, ChevronRight, Menu, X } from 'lucide-react';
import Image from 'next/image';


export default function Home() {
  const t = useTranslations('HomePage');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500 selection:text-white ">
      
{/* --- Navigation --- */}
      <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 z-50 transition-all">
        <div className="w-full px-4 h-20 flex items-center justify-between">
          
          {/* 1. LEFT: Logo */}
          <div className="flex items-center gap-2 font-bold text-4xl md:text-5xl text-slate-100">
            <a href='#hero' onClick={() => setIsMobileMenuOpen(false)}>
              CYBER<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">SIMPLE</span>
            </a>
          </div>

          {/* 2. RIGHT: Everything else (Links + Language + Mobile Toggle) */}
          <div className="flex items-center gap-4 md:gap-8">
            
            {/* Desktop Links (Visible on PC, Hidden on Mobile) */}
            <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium">
              <a href="#about" className="hover:text-blue-400 transition-colors">{t('about')}</a>
              <a href="#services" className="hover:text-blue-400 transition-colors">{t('services')}</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">{t('contact')}</a>
            </div>

            {/* Icons & Toggles */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block"> 
                   <LanguageSwitcher />
              </div>

              {/* Hamburger Button (Mobile Only) */}
              <button 
                className="md:hidden text-slate-300 hover:text-white focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Menu Dropdown (Stays the same) */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-slate-950 border-b border-slate-800 p-6 flex flex-col gap-6 text-center animate-in slide-in-from-top-5">
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-blue-400">{t('about')}</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-blue-400">{t('services')}</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-blue-400">{t('contact')}</a>
            <div className="sm:hidden flex justify-center pt-4 border-t border-slate-900">
               <LanguageSwitcher />
            </div>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section id="hero" className=" relative pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-start justify-center min-h-[85vh] overflow-hidden">
        {/* <Image 
          src="/cyber_bg.jpg"     // Make sure this file is in your public folder
          alt="Cybersecurity Background"
          fill                   // Tells image to fill the parent section
          priority               // Loads image immediately (good for SEO/LCP)
          className="object-cover" // Ensures image doesn't stretch weirdly
        /> */}

        {/* <div className="absolute inset-0 bg-slate-950/80 z-0"></div> */}
        
        {/* <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-start w-full"> */}

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-blue-400 text-xs font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          {t('available')}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-slate-100 tracking-tight mb-6 break-words max-w-full">
          {t('heroTitle')}<br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            {t('heroTitle2')}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          {t('description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-200 transition-all w-full sm:w-auto">
            {t('getStarted')}
            <ChevronRight size={20} />
          </a>
          <a href="#services" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 border border-slate-700 text-white font-semibold rounded-lg hover:border-blue-500 transition-all w-full sm:w-auto">
            {t('learnMore')}
          </a>
          </div>
        {/* </div> */}
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-24 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">{t('servicesTitle')}</h2>
            <p className="text-slate-400 max-w-2xl">
              {t('servicesDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-950 transition-colors">
                <Terminal className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">{t('serviceTitle1')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t('serviceDescription1')}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-950 transition-colors">
                <Lock className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">{t('serviceTitle2')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t('serviceDescription2')}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-950 transition-colors">
                <Server className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">{t('serviceTitle3')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t('serviceDescription3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- About / Tech Stack --- */}
      <section id="about" className="py-24 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-100 mb-6">{t('aboutTitle')}</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {t('aboutDescription')}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {[
                t('skill1'), 
                t('skill2'), 
                t('skill3'), 
                t('skill4'), 
                t('skill5'), 
                t('skill6')
              ].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-blue-400">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex-1 w-full p-8  rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <Image 
                src="/icon.png"      // <--- Check your file extension (.png, .jpg, .svg)
                alt="Decorative Icon"
                width={200}          // Matches the previous icon size
                height={200}
                className="object-contain" // Ensures the image doesn't stretch
              />
            </div>
             <h3 className="text-lg font-bold text-white mb-4">{t('benefitsTitle')}</h3>
            <ul className="space-y-4">
            {[
                t('benefit1'),
                t('benefit2'),
                t('benefit3'),
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
          <h2 className="text-3xl font-bold text-slate-100 mb-6">{t('contactTitle')}</h2>
          <h2 className="text-xl font-bold text-slate-100 mb-6">info@cybersimple.ca</h2>
          <a 
            href="mailto:info@cybersimple.ca"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors mb-16"
          >
            <Mail size={18} />
            {t('emailMessage')}
          </a>

          <div className="text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} {t('rights')}
          </div>
        </div>
      </footer>
    </div>
  );
}


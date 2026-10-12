import React, { useState } from 'react';
import { Logo } from './Logo';
import { SupportedLanguage } from '../types';
import { Globe, ShieldCheck, FileSpreadsheet, Menu, X, ArrowUpRight, Phone, Mail, ChevronDown } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  activeTab: 'site' | 'admin' | 'codehub';
  setActiveTab: (tab: 'site' | 'admin' | 'codehub') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  setActiveTab,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs transition-all">
      {/* Top Corporate Ticker Bar */}
      <div className="bg-[#0B1B3D] text-stone-200 text-xs py-1.5 px-4 sm:px-8 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              Govt. Recognized Export House · APEDA RCMC Verified
            </span>
            <span className="hidden md:inline text-stone-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-stone-300">
              Direct Mill-To-Port Dispatch: Mundra &amp; Nhava Sheva
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a href="mailto:info@saglobalagro.com" className="flex items-center gap-1 hover:text-amber-400 transition-colors">
              <Mail className="w-3 h-3 text-amber-400 shrink-0" />
              <span>info@saglobalagro.com</span>
            </a>
            <span className="text-stone-500">|</span>
            <a href="tel:+919876543210" className="flex items-center gap-1 hover:text-amber-400 transition-colors font-mono">
              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
              <span>+91 98765 43210</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo (Left) */}
          <div
            onClick={() => {
              setActiveTab('site');
              onNavigateSection('home');
            }}
            className="cursor-pointer shrink-0 flex items-center"
          >
            <Logo variant="light" />
          </div>

          {/* Desktop Navigation Links (Center, Perfectly Vertically Aligned) */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-stone-700">
            <button
              onClick={() => {
                setActiveTab('site');
                onNavigateSection('home');
              }}
              className={`h-9 px-3 flex items-center rounded-md transition-colors ${
                activeTab === 'site'
                  ? 'text-amber-800 bg-amber-50/80 font-bold'
                  : 'hover:text-amber-800 hover:bg-stone-100'
              }`}
            >
              {t.navHome}
            </button>

            <button
              onClick={() => {
                setActiveTab('site');
                onNavigateSection('about');
              }}
              className="h-9 px-3 flex items-center rounded-md hover:text-amber-800 hover:bg-stone-100 transition-colors"
            >
              {t.navAbout}
            </button>

            <button
              onClick={() => {
                setActiveTab('site');
                onNavigateSection('products');
              }}
              className="h-9 px-3 flex items-center rounded-md hover:text-amber-800 hover:bg-stone-100 transition-colors"
            >
              {t.navProducts}
            </button>

            <button
              onClick={() => {
                setActiveTab('site');
                onNavigateSection('certifications');
              }}
              className="h-9 px-3 flex items-center rounded-md hover:text-amber-800 hover:bg-stone-100 transition-colors"
            >
              {t.navQuality}
            </button>

            <button
              onClick={() => {
                setActiveTab('site');
                onNavigateSection('contact');
              }}
              className="h-9 px-3 flex items-center rounded-md hover:text-amber-800 hover:bg-stone-100 transition-colors"
            >
              {t.navContact}
            </button>

            {/* PHP Architecture Link */}
            <button
              onClick={() => setActiveTab('codehub')}
              className={`h-9 px-3 flex items-center gap-1.5 rounded-md transition-colors ${
                activeTab === 'codehub'
                  ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                  : 'text-stone-600 hover:text-amber-800 hover:bg-stone-100'
              }`}
            >
              <span className="font-mono text-xs font-semibold">PHP Stack</span>
            </button>
          </nav>

          {/* Right Action Cluster (Uniform h-9 heights, aligned horizontally) */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Language Selector Dropdown */}
            <div className="relative group">
              <div className="h-9 flex items-center gap-1.5 px-2.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md border border-stone-200 cursor-pointer transition-colors select-none">
                <Globe className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{languages.find(l => l.code === currentLang)?.flag}</span>
                <span className="uppercase font-semibold">{currentLang}</span>
                <ChevronDown className="w-3 h-3 text-stone-400 group-hover:rotate-180 transition-transform" />
              </div>

              {/* Language Dropdown Menu */}
              <div className="absolute right-0 mt-1 w-36 bg-white border border-stone-200 rounded-lg shadow-lg py-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-amber-50 hover:text-amber-800 transition-colors ${
                      currentLang === lang.code ? 'font-bold text-amber-700 bg-amber-50/60' : 'text-stone-700'
                    }`}
                  >
                    <span>{lang.flag} {lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Admin ERP Button */}
            <button
              onClick={() => setActiveTab(activeTab === 'admin' ? 'site' : 'admin')}
              className={`h-9 flex items-center gap-1.5 px-3.5 text-xs font-semibold rounded-md border transition-all ${
                activeTab === 'admin'
                  ? 'bg-[#0B1B3D] text-amber-300 border-[#0B1B3D] shadow-sm'
                  : 'bg-stone-900 text-stone-100 border-stone-900 hover:bg-[#0B1B3D]'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{activeTab === 'admin' ? 'Exit ERP' : 'ERP Admin'}</span>
            </button>

            {/* Instant Quote CTA */}
            <button
              onClick={() => {
                setActiveTab('site');
                onNavigateSection('contact');
              }}
              className="h-9 flex items-center gap-1.5 px-4 text-xs font-semibold bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-md shadow-xs transition-all"
            >
              <span>Get Export Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>

          {/* Tablet & Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            {/* Quick Language Toggle on Mobile/Tablet */}
            <div className="relative group">
              <button className="h-9 px-2 text-xs flex items-center gap-1 bg-stone-100 rounded-md border border-stone-200 text-stone-700">
                <Globe className="w-3.5 h-3.5 text-amber-600" />
                <span className="uppercase font-semibold">{currentLang}</span>
              </button>
              <div className="absolute right-0 mt-1 w-32 bg-white border border-stone-200 rounded-lg shadow-lg py-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-amber-50"
                  >
                    {lang.flag} {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTab(activeTab === 'admin' ? 'site' : 'admin')}
              className="h-9 px-3 text-xs bg-stone-900 text-amber-300 rounded-md flex items-center gap-1 font-semibold"
              title="Admin ERP"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ERP</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 flex items-center justify-center text-stone-700 hover:text-stone-900 focus:outline-none rounded-md bg-stone-100 border border-stone-200"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-3 animate-in fade-in duration-200 shadow-md">
          <div className="flex flex-col space-y-1 text-sm font-medium text-stone-800">
            <button
              onClick={() => {
                setActiveTab('site');
                onNavigateSection('home');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-stone-100 hover:text-amber-700"
            >
              {t.navHome}
            </button>
            <button
              onClick={() => {
                setActiveTab('site');
                onNavigateSection('about');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-stone-100 hover:text-amber-700"
            >
              {t.navAbout}
            </button>
            <button
              onClick={() => {
                setActiveTab('site');
                onNavigateSection('products');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-stone-100 hover:text-amber-700"
            >
              {t.navProducts}
            </button>
            <button
              onClick={() => {
                setActiveTab('site');
                onNavigateSection('certifications');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-stone-100 hover:text-amber-700"
            >
              {t.navQuality}
            </button>
            <button
              onClick={() => {
                setActiveTab('site');
                onNavigateSection('contact');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-stone-100 hover:text-amber-700"
            >
              {t.navContact}
            </button>
            <button
              onClick={() => {
                setActiveTab('codehub');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md text-amber-800 bg-amber-50 font-semibold"
            >
              PHP 8.2 &amp; MySQL Code Stack
            </button>
          </div>

          <div className="pt-3 border-t border-stone-200 flex flex-wrap gap-2">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1.5 text-xs rounded-md border font-medium ${
                  currentLang === lang.code
                    ? 'bg-amber-600 text-white border-amber-600 font-bold'
                    : 'bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                {lang.flag} {lang.label}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setActiveTab('site');
                onNavigateSection('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-md flex items-center justify-center gap-1.5"
            >
              <span>Request Export Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

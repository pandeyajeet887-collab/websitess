import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ArrowRight, FileText, CheckCircle2, TrendingUp, Ship, Award, ShieldCheck } from 'lucide-react';
import heroBasmatiImg from '../assets/images/basmati_1121_raw_1791789975173.jpg';

interface HeroProps {
  currentLang: SupportedLanguage;
  onExploreProducts: () => void;
  onRequestQuote: () => void;
  onOpenERP: () => void;
  usdRate: number;
  eurRate: number;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onExploreProducts,
  onRequestQuote,
  onOpenERP,
  usdRate,
  eurRate
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section className="relative bg-[#071329] text-white overflow-hidden border-b border-amber-900/40">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-500 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
        {/* Subtle geometric grid */}
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Top Live Ticker Tag */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/40 text-xs text-amber-300 mb-6 backdrop-blur-sm shadow-inner">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-semibold tracking-wide">LIVE EXPORT DESK</span>
          <span className="text-stone-500">|</span>
          <span className="font-mono text-stone-200">1 USD = ₹{usdRate.toFixed(2)}</span>
          <span className="text-stone-500">|</span>
          <span className="font-mono text-stone-200">1 EUR = ₹{eurRate.toFixed(2)}</span>
          <span className="hidden sm:inline text-amber-400/80 font-medium">· Mundra &amp; Nhava Sheva Port Ready</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-editorial leading-tight tracking-tight text-stone-100">
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Value Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-stone-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Sortex Cleaned</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Custom Private Labeling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>FOB, CIF &amp; CFR Terms</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreProducts}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-stone-950 font-semibold text-sm rounded-md shadow-lg shadow-amber-900/30 flex items-center gap-2 transition-all group"
              >
                <span>{t.ctaCatalog}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onRequestQuote}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-stone-100 border border-stone-600/80 hover:border-amber-400 font-medium text-sm rounded-md backdrop-blur-sm flex items-center gap-2 transition-all"
              >
                <span>{t.ctaQuote}</span>
              </button>

              <button
                onClick={onOpenERP}
                className="px-4 py-3.5 bg-stone-900/80 hover:bg-stone-900 text-amber-300 border border-amber-500/40 font-medium text-sm rounded-md flex items-center gap-2 transition-all"
                title="Open Export Proforma Invoice (PI) & Commercial Invoice (CI) ERP Engine"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>{t.ctaAdmin}</span>
              </button>
            </div>
          </div>

          {/* Right Visual Card Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-stone-900 to-[#0B1B3D] border border-amber-500/30 p-1 shadow-2xl">
              <div className="relative rounded-lg overflow-hidden aspect-4/3 group">
                <img
                  src={heroBasmatiImg}
                  alt="Premium Long Grain Basmati Rice Grains"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071329] via-transparent to-transparent"></div>

                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-stone-950/85 backdrop-blur-md border border-amber-500/40 rounded-lg p-3 text-xs">
                  <div className="flex items-center justify-between text-amber-300 font-semibold mb-1">
                    <span className="flex items-center gap-1.5 font-cinzel">
                      <Award className="w-4 h-4 text-amber-400" />
                      1121 XXL Royal Basmati
                    </span>
                    <span className="font-mono text-stone-300 text-[11px]">HS 10063020</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-300">
                    <span>AGL: 8.35 - 8.40 mm</span>
                    <span>Elongation: 2.5x</span>
                    <span>Moisture: Max 12.5%</span>
                  </div>
                </div>
              </div>

              {/* Maritime Logistics Strip */}
              <div className="p-4 grid grid-cols-2 gap-3 text-xs bg-stone-900/60 border-t border-stone-800">
                <div className="flex items-center gap-2">
                  <Ship className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-stone-200">Port of Loading</div>
                    <div className="text-[11px] text-stone-400">Mundra / Nhava Sheva</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-stone-200">Container Stuffing</div>
                    <div className="text-[11px] text-stone-400">26 MT per 20ft FCL</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Stats Grid (SKRM inspired) */}
        <div className="mt-16 pt-10 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-lg bg-stone-900/40 border border-stone-800">
            <div className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-400">
              {t.statMilling}
            </div>
            <div className="text-xs sm:text-sm text-stone-300 font-medium mt-1">
              {t.statMillingLabel}
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">Satake &amp; Buhler Sortex lines</div>
          </div>

          <div className="p-4 rounded-lg bg-stone-900/40 border border-stone-800">
            <div className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-400">
              {t.statCountries}
            </div>
            <div className="text-xs sm:text-sm text-stone-300 font-medium mt-1">
              {t.statCountriesLabel}
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">GCC, EU, USA, Africa &amp; APAC</div>
          </div>

          <div className="p-4 rounded-lg bg-stone-900/40 border border-stone-800">
            <div className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-400">
              {t.statPurity}
            </div>
            <div className="text-xs sm:text-sm text-stone-300 font-medium mt-1">
              {t.statPurityLabel}
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">Zero GMO / DNA certified</div>
          </div>

          <div className="p-4 rounded-lg bg-stone-900/40 border border-stone-800">
            <div className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-400">
              {t.statStorage}
            </div>
            <div className="text-xs sm:text-sm text-stone-300 font-medium mt-1">
              {t.statStorageLabel}
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">Automated aeration &amp; aging</div>
          </div>
        </div>
      </div>
    </section>
  );
};

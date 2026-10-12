import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShieldCheck, Factory, Microscope, PackageCheck, Anchor, Award, CheckCircle } from 'lucide-react';
import millFacilityImg from '../assets/images/rice_mill_facility_1791791107190.jpg';
import satakeSorterImg from '../assets/images/satake_color_sorter_1791791206959.jpg';
import qualityLabImg from '../assets/images/rice_lab_testing_1791791156841.jpg';

interface AboutSectionProps {
  currentLang: SupportedLanguage;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  const processingSteps = [
    {
      icon: <Factory className="w-6 h-6 text-amber-600" />,
      title: 'Paddy Sourcing & De-Husking',
      desc: 'Sourced exclusively from certified contract farmers in the Indo-Gangetic basin. Processed through Swiss Buhler de-stoners and de-huskers.'
    },
    {
      icon: <Microscope className="w-6 h-6 text-amber-600" />,
      title: 'Japanese Satake Sortex Cleaning',
      desc: 'High-speed trichromatic optical sorting eliminates discolored grains, pinheads, and chalky kernels at 100% sortex accuracy.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      title: 'DNA Purity & Residue Testing',
      desc: 'Every container lot is tested for DNA authenticity (>95% varietal purity) and European MRL pesticide compliance.'
    },
    {
      icon: <PackageCheck className="w-6 h-6 text-amber-600" />,
      title: 'BOPP & Jute Container Stuffing',
      desc: 'Automated packing in 1kg to 50kg bags. Desiccant-controlled container stuffing preventing sea-transit moisture condensation.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-semibold text-amber-900 tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            Corporate Infrastructure Profile
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 tracking-tight">
            {t.aboutHeadline}
          </h2>
          <p className="mt-4 text-base text-stone-600 leading-relaxed">
            {t.aboutSubhead}
          </p>
        </div>

        {/* 2-Column Story & Mill Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className="text-2xl font-bold font-editorial text-stone-900">
              Pioneering Indian Agro Export Since Decades
            </h3>
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              At <strong className="text-stone-900 font-semibold">S&amp;A Global Agro Exporter</strong>, we combine generations of agro-milling mastery with cutting-edge German and Japanese processing automation. Our integrated facilities located in the heart of Haryana's basmati belt control the complete value chain from paddy procurement to sea container dispatch.
            </p>
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              Drawing inspiration from benchmark global leaders like SKRM India, we maintain world-class testing laboratories measuring pesticide residues, moisture retention, broken percentage, and grain elongation under strict ISO 22000, HACCP, and APEDA guidelines.
            </p>

            {/* Core Capability Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              {[
                '1,200 MT Daily Sortex Output',
                'Custom Private Label Packaging',
                'Pre-Shipment SGS / Bureau Veritas',
                'Direct Railway Siding to Mundra Port',
                'Zero-Chalkiness Guarantee',
                'Strict EU/US FDA Residue Compliance'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-stone-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Mill to Port Route Card */}
            <div className="p-4 bg-white rounded-lg border border-stone-200 shadow-xs flex items-center gap-4 mt-6">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <Anchor className="w-6 h-6 text-amber-700" />
              </div>
              <div className="text-xs sm:text-sm">
                <div className="font-bold text-stone-900">Seamless Inland to Maritime Gateway</div>
                <div className="text-stone-600 text-xs mt-0.5">
                  Direct express logistics from our mills in Taraori/Karnal (Haryana) to Container Freight Stations (CFS) at Mundra &amp; Nhava Sheva (JNPT) ports within 48 hours.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Collage */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-stone-200 aspect-16/10">
              <img
                src={millFacilityImg}
                alt="Modern Rice Mill Silos and Processing Plant"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-medium tracking-wide">
                  Fully Automated Parboiling &amp; Silo Complex
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden shadow-xs border border-stone-200 aspect-4/3">
                <img
                  src={satakeSorterImg}
                  alt="Satake Sortex Grain Inspection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-stone-900/40 flex items-end p-2.5">
                  <span className="text-white text-[11px] font-medium">Satake Optical Sorting</span>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden shadow-xs border border-stone-200 aspect-4/3">
                <img
                  src={qualityLabImg}
                  alt="Grain Length Measurement"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-stone-900/40 flex items-end p-2.5">
                  <span className="text-white text-[11px] font-medium">Quality Testing Lab</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Process Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processingSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center mb-4 transition-colors">
                {step.icon}
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-2">
                {step.title}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

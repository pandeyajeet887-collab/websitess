import React from 'react';
import { CERTIFICATIONS } from '../data/riceData';
import { ShieldCheck, Award, CheckCircle2, FileCheck2, Globe2 } from 'lucide-react';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Global Compliance &amp; Accreditations
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 tracking-tight">
            Certified Quality Guaranteed Across Every Ocean
          </h2>
          <p className="mt-3 text-base text-stone-600">
            Our processing plants and container stuffing procedures are audited and certified by leading global food safety inspection authorities.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-amber-400 shadow-xs hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-amber-100/60 group-hover:bg-amber-100 flex items-center justify-center transition-colors">
                  <Award className="w-6 h-6 text-amber-700" />
                </div>
                <span className="text-[10px] font-mono font-bold bg-white px-2 py-1 rounded border border-stone-200 text-stone-600">
                  {cert.code}
                </span>
              </div>

              <h3 className="text-lg font-bold font-editorial text-stone-900 mb-1.5">
                {cert.name}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                {cert.desc}
              </p>

              <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center gap-1.5 text-emerald-700 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Active Exporter Status</span>
              </div>
            </div>
          ))}
        </div>

        {/* Port Shipping Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0B1B3D] via-[#0F2854] to-[#0B1B3D] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-amber-500/30">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Globe2 className="w-4 h-4 text-amber-400" />
              Direct Freight Corridor &amp; Sea Route
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-editorial text-stone-100">
              Mundra &amp; Nhava Sheva (JNPT) Container Gateways
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Equipped with dedicated bonded warehouse allocations, 24/7 custom house clearing (CHA), computerized temperature-controlled fumigation, and pre-loading Phytosanitary certification.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center p-3 rounded-lg bg-white/10 border border-white/15">
              <div className="text-lg font-bold font-mono text-amber-400">20ft / 40ft</div>
              <div className="text-[10px] text-stone-300">FCL Container Stuffed</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/10 border border-white/15">
              <div className="text-lg font-bold font-mono text-amber-400">26 MT</div>
              <div className="text-[10px] text-stone-300">Max Payload Capacity</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

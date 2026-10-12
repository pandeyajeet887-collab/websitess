import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Mail, Phone, MapPin, Anchor, Award } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (section: string) => void;
  onOpenERP: () => void;
  onOpenCodeHub: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenERP,
  onOpenCodeHub
}) => {
  return (
    <footer className="bg-[#071329] text-stone-300 pt-16 pb-10 border-t border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="dark" />
            <p className="text-xs text-stone-400 leading-relaxed pr-4">
              S&amp;A Global Agro Exporter is a premier Indian processor and global shipper of extra-long grain Basmati and Non-Basmati rice varieties, operating integrated milling lines with automated Sortex cleaning in Haryana's fertile basmati heartland.
            </p>
            
            <div className="pt-2 text-xs space-y-1.5 font-mono text-stone-400">
              <div><strong>IEC Code:</strong> 0514089921</div>
              <div><strong>APEDA RCMC:</strong> RCMC/DEL/2026/0942</div>
              <div><strong>GSTIN:</strong> 07AAACS8920D1Z4</div>
            </div>
          </div>

          {/* Rice Products Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold font-editorial text-amber-300 uppercase tracking-wider">
              Export Rice Varieties
            </h4>
            <ul className="text-xs space-y-2 text-stone-400">
              <li><button onClick={() => onNavigateSection('products')} className="hover:text-amber-400 transition-colors">1121 XXL Basmati Rice (8.35mm AGL)</button></li>
              <li><button onClick={() => onNavigateSection('products')} className="hover:text-amber-400 transition-colors">1718 Extra Long Basmati Rice</button></li>
              <li><button onClick={() => onNavigateSection('products')} className="hover:text-amber-400 transition-colors">1509 Slender Basmati Rice</button></li>
              <li><button onClick={() => onNavigateSection('products')} className="hover:text-amber-400 transition-colors">1401 Steam &amp; Creamy Sella</button></li>
              <li><button onClick={() => onNavigateSection('products')} className="hover:text-amber-400 transition-colors">Traditional Royal Aged Basmati</button></li>
              <li><button onClick={() => onNavigateSection('products')} className="hover:text-amber-400 transition-colors">Sugandha &amp; Sharbati Aromatic Rice</button></li>
              <li><button onClick={() => onNavigateSection('products')} className="hover:text-amber-400 transition-colors">PR 11 / PR 14 &amp; Parmal IR-64</button></li>
            </ul>
          </div>

          {/* Infrastructure Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold font-editorial text-amber-300 uppercase tracking-wider">
              Gateways &amp; Tools
            </h4>
            <ul className="text-xs space-y-2 text-stone-400">
              <li><button onClick={() => onNavigateSection('about')} className="hover:text-amber-400 transition-colors">Milling Standards</button></li>
              <li><button onClick={() => onNavigateSection('certifications')} className="hover:text-amber-400 transition-colors">Certifications &amp; Labs</button></li>
              <li><button onClick={() => onNavigateSection('contact')} className="hover:text-amber-400 transition-colors">Request Container Quote</button></li>
              <li><button onClick={onOpenERP} className="text-amber-400 font-semibold hover:underline">Export ERP &amp; Invoice Portal</button></li>
              <li><button onClick={onOpenCodeHub} className="text-amber-400 font-semibold hover:underline">PHP 8.2 &amp; MySQL Code</button></li>
              <li>
                <a
                  href="/SAGlobalAgro_Full_Project.zip"
                  download="SAGlobalAgro_Full_Project.zip"
                  className="inline-flex items-center gap-1 text-emerald-400 font-bold hover:underline"
                >
                  <span>Download Full ZIP (25.5MB)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Port Logistics & Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold font-editorial text-amber-300 uppercase tracking-wider">
              Logistics &amp; Port Gateways
            </h4>
            <div className="text-xs space-y-2.5 text-stone-400">
              <div className="flex items-start gap-2">
                <Anchor className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Mundra Port (INMUN1) &amp; Nhava Sheva (INNSA1) CFS hubs with 48h direct rail link.</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Taraori, Karnal (Haryana) Milling Silos &amp; Connaught Place, New Delhi Export Office.</span>
              </div>
              <div className="flex items-center gap-2 pt-1 font-mono text-stone-300">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            &copy; 2026 S&amp;A Global Agro Exporter. All Rights Reserved. ISO 22000, HACCP &amp; APEDA Certified.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>UN Layout Key Compliant</span>
            <span>·</span>
            <span>INCOTERMS 2020 Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

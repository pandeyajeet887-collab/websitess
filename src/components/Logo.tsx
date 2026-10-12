import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'gold';
  className?: string;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  className = '',
  showSubtitle = true,
}) => {
  const isDarkBg = variant === 'dark' || variant === 'gold';
  const textColor = isDarkBg ? 'text-white' : 'text-slate-900';
  const subColor = isDarkBg ? 'text-amber-300' : 'text-amber-800';

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Premium Vector Emblem */}
      <svg
        className="w-12 h-12 md:w-14 md:h-14 shrink-0 transition-transform hover:scale-105 duration-300 drop-shadow-sm"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="S&A Global Agro Exporter Crest"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA820A" />
            <stop offset="100%" stopColor="#F7DF84" />
          </linearGradient>
          <linearGradient id="navyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1B3D" />
            <stop offset="100%" stopColor="#040D1E" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D4AF37" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer Circular Shield Frame */}
        <circle cx="80" cy="80" r="76" fill="url(#navyGradient)" stroke="url(#goldGradient)" strokeWidth="3" />
        <circle cx="80" cy="80" r="70" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

        {/* Meridian Global Lines (Subtle) */}
        <ellipse cx="80" cy="80" rx="60" ry="24" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.35" />
        <ellipse cx="80" cy="80" rx="28" ry="60" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.35" />
        <line x1="20" y1="80" x2="140" y2="80" stroke="#D4AF37" strokeWidth="0.8" opacity="0.35" />
        <line x1="80" y1="20" x2="80" y2="140" stroke="#D4AF37" strokeWidth="0.8" opacity="0.35" />

        {/* Left Golden Sheaf of Rice (Ear of Paddy) */}
        <g filter="url(#goldGlow)">
          <path d="M 40 120 Q 32 90 46 54" stroke="url(#goldGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Rice Grains Left */}
          <ellipse cx="44" cy="56" rx="4.5" ry="8" transform="rotate(-30 44 56)" fill="url(#goldGradient)" />
          <ellipse cx="37" cy="68" rx="4.5" ry="8" transform="rotate(-40 37 68)" fill="url(#goldGradient)" />
          <ellipse cx="34" cy="82" rx="4.5" ry="8" transform="rotate(-48 34 82)" fill="url(#goldGradient)" />
          <ellipse cx="35" cy="96" rx="4.5" ry="8" transform="rotate(-52 35 96)" fill="url(#goldGradient)" />
          <ellipse cx="40" cy="110" rx="4.5" ry="8" transform="rotate(-55 40 110)" fill="url(#goldGradient)" />
        </g>

        {/* Right Golden Sheaf of Rice (Ear of Paddy) */}
        <g filter="url(#goldGlow)">
          <path d="M 120 120 Q 128 90 114 54" stroke="url(#goldGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Rice Grains Right */}
          <ellipse cx="116" cy="56" rx="4.5" ry="8" transform="rotate(30 116 56)" fill="url(#goldGradient)" />
          <ellipse cx="123" cy="68" rx="4.5" ry="8" transform="rotate(40 123 68)" fill="url(#goldGradient)" />
          <ellipse cx="126" cy="82" rx="4.5" ry="8" transform="rotate(48 126 82)" fill="url(#goldGradient)" />
          <ellipse cx="125" cy="96" rx="4.5" ry="8" transform="rotate(52 125 96)" fill="url(#goldGradient)" />
          <ellipse cx="120" cy="110" rx="4.5" ry="8" transform="rotate(55 120 110)" fill="url(#goldGradient)" />
        </g>

        {/* Central Crown / Crest Star */}
        <polygon points="80,27 83,34 90,34 85,38 87,45 80,41 73,45 75,38 70,34 77,34" fill="url(#goldGradient)" />

        {/* Central Monogram Plate */}
        <circle cx="80" cy="80" r="32" fill="#071329" stroke="url(#goldGradient)" strokeWidth="1.8" />
        
        {/* S&A Monogram */}
        <text
          x="80"
          y="87"
          textAnchor="middle"
          fill="url(#goldGradient)"
          fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
          fontSize="24"
          fontWeight="bold"
          letterSpacing="1"
        >
          S&amp;A
        </text>

        {/* Ribbon / Scroll at Bottom */}
        <path d="M 45 130 Q 80 142 115 130 Q 80 137 45 130 Z" fill="url(#goldGradient)" />
        <text
          x="80"
          y="126"
          textAnchor="middle"
          fill="#D4AF37"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="6.5"
          fontWeight="bold"
          letterSpacing="2"
        >
          AGRO EXPORT
        </text>
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-cinzel tracking-wider text-xl md:text-2xl font-bold ${textColor}`}>
            S&amp;A
          </span>
          <span className="font-cinzel text-xs md:text-sm font-semibold tracking-widest text-amber-500 uppercase">
            GLOBAL
          </span>
        </div>
        {showSubtitle && (
          <div className="flex items-center gap-1.5 -mt-0.5">
            <span className={`text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase ${subColor}`}>
              AGRO EXPORTER
            </span>
            <span className="text-[9px] text-amber-500/80 font-mono tracking-tight">· INDIA</span>
          </div>
        )}
      </div>
    </div>
  );
};

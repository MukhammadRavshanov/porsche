import React from 'react';

export const PorscheLogo = ({ className = "text-xl tracking-[0.38em]" }) => {
  return (
    <span 
      className={`font-black uppercase text-white hover:text-white/90 select-none inline-block font-sans ${className}`}
      style={{ letterSpacing: '0.38em' }}
    >
      PORSCHE
    </span>
  );
};

export const PorscheCrest = ({ className = "w-5 h-7" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 130" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Porsche Crest"
    >
      <path 
        d="M50 2 C78 2 95 14 95 38 C95 86 65 116 50 128 C35 116 5 86 5 38 C5 14 22 2 50 2Z" 
        fill="#c49a45" 
        stroke="#e5b85d" 
        strokeWidth="3"
      />
      <path d="M50 8 L50 122" stroke="#121212" strokeWidth="4" />
      <rect x="18" y="24" width="28" height="40" fill="#d5001c" rx="1" />
      <rect x="54" y="66" width="28" height="40" fill="#d5001c" rx="1" />
      <path d="M22 34 Q32 28 42 36 M22 46 Q32 40 42 48" stroke="#f6ce72" strokeWidth="3" strokeLinecap="round" />
      <path d="M58 76 Q68 70 78 78 M58 88 Q68 82 78 90" stroke="#f6ce72" strokeWidth="3" strokeLinecap="round" />
      <path 
        d="M38 46 C38 46 62 46 62 46 C62 76 50 86 50 86 C50 86 38 76 38 46Z" 
        fill="#f6ce72" 
        stroke="#c49a45" 
        strokeWidth="1.5" 
      />
      <path 
        d="M48 54 C50 51 53 52 54 55 C53 58 52 61 54 64 C52 66 50 71 52 75 C49 74 48 70 47 67 C46 65 44 65 44 63 C46 63 47 61 47 58 C46 56 46 54 48 54 Z" 
        fill="#121212"
      />
      <path d="M22 14 H78 V22 H22 Z" fill="#121212" />
      <text x="50" y="20" fill="#f6ce72" fontSize="6.5" fontWeight="bold" textAnchor="middle" letterSpacing="1.2">PORSCHE</text>
    </svg>
  );
};

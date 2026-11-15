import React from 'react';
import { PorscheLogo, PorscheCrest } from './PorscheCrest';
import { Globe, ArrowUpRight, ShieldCheck, Mail } from 'lucide-react';

export const Footer = ({ setCurrentView, onOpenNewsletter }) => {
  return (
    <footer className="bg-[#07090b] text-[#8b949e] border-t border-[#1f242b] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-12 border-b border-[#1b1f26] gap-6">
          <div className="flex items-center gap-4">
            <PorscheCrest className="w-8 h-10" />
            <div>
              <PorscheLogo className="text-xl" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#6e7681] mt-1">Dr. Ing. h.c. F. Porsche AG</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-wider">
            <button 
              onClick={() => setCurrentView('dealers')} 
              className="text-white hover:text-porsche-red transition-colors flex items-center gap-1"
            >
              <Globe className="w-4 h-4 text-porsche-red" />
              <span>International / English</span>
            </button>
            <span className="text-[#30363d]">|</span>
            <button 
              onClick={() => setCurrentView('configurator')}
              className="hover:text-white transition-colors"
            >
              Porsche Configurator
            </button>
            <span className="text-[#30363d]">|</span>
            <button 
              onClick={() => setCurrentView('finder')}
              className="hover:text-white transition-colors"
            >
              Porsche Finder
            </button>
          </div>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 text-xs border-b border-[#1b1f26]">
          {/* Models */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Porsche Models</h4>
            <ul className="space-y-2.5">
              {['718 Boxster & Cayman', '911 Carrera & GT3 RS', 'Taycan All-Electric', 'Panamera E-Hybrid', 'Macan Electric', 'Cayenne SUV'].map((m) => (
                <li key={m}>
                  <button 
                    onClick={() => setCurrentView('models')} 
                    className="hover:text-white hover:underline transition-colors text-left"
                  >
                    {m}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicle Purchase */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Vehicle Purchase</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setCurrentView('finder')} className="hover:text-white transition-colors text-left">
                  Porsche Finder (Pre-Owned)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('configurator')} className="hover:text-white transition-colors text-left">
                  Car Configurator
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('dealers')} className="hover:text-white transition-colors text-left">
                  Locate Porsche Centre
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('dealers')} className="hover:text-white transition-colors text-left">
                  Book a Test Drive
                </button>
              </li>
              <li>
                <span className="text-[#555]">Porsche Financial Services</span>
              </li>
              <li>
                <span className="text-[#555]">Porsche Approved Warranty</span>
              </li>
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Experience & Racing</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setCurrentView('experience')} className="hover:text-white transition-colors text-left">
                  Porsche Motorsport (WEC & 24h)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('experience')} className="hover:text-white transition-colors text-left">
                  Formula E Team
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('experience')} className="hover:text-white transition-colors text-left">
                  Porsche Track Experience
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('experience')} className="hover:text-white transition-colors text-left">
                  Porsche Museum Stuttgart
                </button>
              </li>
              <li>
                <span className="text-[#555]">Christophorus Magazine</span>
              </li>
            </ul>
          </div>

          {/* Porsche Lifestyle & Shop */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Porsche Shop</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors text-left">
                  Porsche Design Chronographs
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors text-left">
                  Motorsport Apparel & Jackets
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors text-left">
                  Diecast Scale Models 1:18
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors text-left">
                  Luggage & Travel Bags
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors text-left">
                  911 Soundbar 2.0 Pro
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><span className="text-[#555]">Porsche AG Overview</span></li>
              <li><span className="text-[#555]">Sustainability Strategy 2030</span></li>
              <li><span className="text-[#555]">Investor Relations</span></li>
              <li><span className="text-[#555]">Careers at Porsche</span></li>
              <li><span className="text-[#555]">Porsche Newsroom</span></li>
            </ul>
          </div>
        </div>

        {/* Official WLTP Disclaimer */}
        <div className="py-8 text-[11px] leading-relaxed text-[#606770] border-b border-[#1b1f26]">
          <p className="mb-2">
            * Values are determined in accordance with the prescribed measurement procedure (WLTP). Further information about official fuel consumption and official specific CO2 emissions of new passenger cars is available at all authorized Porsche dealers and from DAT (Deutsche Automobil Treuhand GmbH).
          </p>
          <p>
            Taycan and Macan Electric models: Electric energy consumption combined: 16.7 – 21.1 kWh/100 km; CO2 emissions combined: 0 g/km; Electric range combined: up to 678 km (WLTP).
          </p>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#6e7681] gap-4">
          <p>© 2026 Dr. Ing. h.c. F. Porsche AG. Legal notice. Privacy Policy. Cookies. Open Source Software Notice.</p>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Notice</span>
            <span className="hover:text-white transition-colors cursor-pointer">Compliance & Whistleblower</span>
            <span className="hover:text-white transition-colors cursor-pointer">Legal Notice</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

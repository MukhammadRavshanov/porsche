import React, { useState } from 'react';
import { PorscheLogo } from './PorscheCrest';
import { 
  Menu, X, Search, Heart, ShoppingBag, 
  ChevronRight, Globe, Sliders, MapPin, 
  Compass, ArrowRight, ShieldCheck 
} from 'lucide-react';

export const Navbar = ({ 
  currentView, 
  setCurrentView, 
  cartCount = 0, 
  savedCount = 0,
  onOpenCart,
  onOpenTestDriveModal
}) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { id: 'models', label: 'Models' },
    { id: 'finder', label: 'Vehicle Purchase' },
    { id: 'shop', label: 'Porsche Shop' },
    { id: 'dealers', label: 'Dealers & Test Drive' },
    { id: 'experience', label: 'Experience' },
  ];

  const modelLines = [
    { id: '911', name: '911', title: 'The iconic rear-engine sports car', image: 'https://cdn.motor1.com/images/mgl/YAgVGq/s1/2024-porsche-cayenne-turbo-e-hybrid.webp', fuel: 'Petrol / T-Hybrid' },
    { id: 'taycan', name: 'Taycan', title: 'Pure electric sports car performance', image: 'https://a.storyblok.com/f/329189/1174x652/56d5b7be8b/2026-porsche-taycan.png/m/3840x0/filters:quality(75)', fuel: 'All-Electric' },
    { id: 'macan', name: 'Macan', title: 'The sporty all-electric SUV', image: 'https://hips.hearstapps.com/hmg-prod/images/2024-porsche-macan-ev-184-67fd250b4f167.jpg?crop=0.743xw:0.627xh;0.124xw,0.229xh&resize=1200:*', fuel: 'All-Electric' },
    { id: '718', name: '718', title: 'Uncompromising mid-engine agility', image: 'https://hips.hearstapps.com/hmg-prod/images/2022-porsche-cayman-gt4-rs-201-1647959909.jpg?crop=0.865xw:0.865xh;0.0950xw,0.0648xh&resize=640:*', fuel: 'Petrol' },
    { id: 'panamera', name: 'Panamera', title: 'The sports car of luxury sedans', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnNrH3g-CSy_0ii4IG4GpgAt-vQeXkUpvMsdqreDDGSo2x9CX6xsinDGs&s=10', fuel: 'E-Hybrid / Petrol' },
    { id: 'cayenne', name: 'Cayenne', title: 'Sports car feeling for five', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Porsche_Cayenne_%28III%2C_Facelift%29_%E2%80%93_f_01012025.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', fuel: 'E-Hybrid / Petrol' },
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setIsMegaMenuOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#07090c]/90 backdrop-blur-xl border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left: Menu & Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="flex items-center gap-2.5 py-2 px-3 text-xs font-semibold tracking-[0.18em] uppercase text-white hover:text-porsche-red transition-colors focus:outline-none rounded hover:bg-white/5"
              aria-label="Navigation Menu"
            >
              {isMegaMenuOpen ? <X className="w-5 h-5 text-porsche-red" /> : <Menu className="w-5 h-5" />}
              <span className="hidden sm:inline">Menu</span>
            </button>

            <button 
              onClick={() => handleNavClick('home')} 
              className="flex items-center focus:outline-none transition-opacity hover:opacity-85 pl-1"
            >
              <PorscheLogo className="text-xl sm:text-2xl tracking-[0.35em]" />
            </button>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 ml-12 xl:ml-16">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-xs font-semibold tracking-[0.18em] uppercase transition-colors relative py-2 ${
                  currentView === link.id
                    ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-porsche-red'
                    : 'text-[#9ea7b0] hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-[#9ea7b0] hover:text-white hover:bg-white/5 rounded-full transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Saved Configurations / Wishlist */}
            <button
              onClick={() => handleNavClick('saved')}
              className="relative p-2.5 text-[#9ea7b0] hover:text-white hover:bg-white/5 rounded-full transition-colors"
              title="Saved Builds"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-porsche-red text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-[#9ea7b0] hover:text-white hover:bg-white/5 rounded-full transition-colors"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-porsche-red text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Test Drive Button */}
            <button
              onClick={() => onOpenTestDriveModal?.()}
              className="hidden sm:inline-flex items-center text-xs font-semibold uppercase tracking-widest px-4 py-2 border border-white/20 hover:border-white text-white rounded transition-colors"
            >
              Test Drive
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mega Menu Drawer */}
      {isMegaMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-[#07090c]/98 backdrop-blur-2xl overflow-y-auto border-t border-white/10 animate-fadeIn">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-8">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-porsche-red font-semibold block mb-1">
                  Models Overview
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                  Discover Your Porsche
                </h3>
              </div>
              <button
                onClick={() => handleNavClick('models')}
                className="text-xs uppercase tracking-widest text-[#9ea7b0] hover:text-white flex items-center gap-1.5"
              >
                <span>View all models</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Models Visual Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {modelLines.map((series) => (
                <div
                  key={series.id}
                  onClick={() => handleNavClick('models')}
                  className="group bg-[#0e1216] border border-white/10 rounded overflow-hidden hover:border-porsche-red transition-all cursor-pointer p-5 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-xl font-bold uppercase text-white group-hover:text-porsche-red transition-colors">
                        {series.name}
                      </h4>
                      <p className="text-xs text-[#8b949e] mt-0.5">{series.title}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-white/10 rounded text-white font-mono">
                      {series.fuel}
                    </span>
                  </div>

                  <div className="relative h-44 overflow-hidden my-3 rounded">
                    <img
                      src={series.image}
                      alt={series.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#c4c7c9] pt-2 border-t border-white/5">
                    <span>Explore Models</span>
                    <ChevronRight className="w-4 h-4 text-porsche-red group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Navigation Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-xs">
              <div 
                onClick={() => handleNavClick('configurator')} 
                className="p-4 bg-[#0e1216] border border-white/5 hover:border-porsche-red rounded cursor-pointer transition-colors"
              >
                <Sliders className="w-5 h-5 text-porsche-red mb-2" />
                <h5 className="font-bold text-white uppercase tracking-wider mb-1">Car Configurator</h5>
                <p className="text-[#8b949e]">Build and customize your bespoke sports car.</p>
              </div>

              <div 
                onClick={() => handleNavClick('finder')} 
                className="p-4 bg-[#0e1216] border border-white/5 hover:border-porsche-red rounded cursor-pointer transition-colors"
              >
                <Compass className="w-5 h-5 text-porsche-red mb-2" />
                <h5 className="font-bold text-white uppercase tracking-wider mb-1">Porsche Finder</h5>
                <p className="text-[#8b949e]">Find new and Porsche Approved pre-owned vehicles.</p>
              </div>

              <div 
                onClick={() => handleNavClick('dealers')} 
                className="p-4 bg-[#0e1216] border border-white/5 hover:border-porsche-red rounded cursor-pointer transition-colors"
              >
                <MapPin className="w-5 h-5 text-porsche-red mb-2" />
                <h5 className="font-bold text-white uppercase tracking-wider mb-1">Locate Dealer</h5>
                <p className="text-[#8b949e]">Find authorized Porsche Centres worldwide.</p>
              </div>

              <div 
                onClick={() => handleNavClick('experience')} 
                className="p-4 bg-[#0e1216] border border-white/5 hover:border-porsche-red rounded cursor-pointer transition-colors"
              >
                <ShieldCheck className="w-5 h-5 text-porsche-red mb-2" />
                <h5 className="font-bold text-white uppercase tracking-wider mb-1">Heritage & Motorsport</h5>
                <p className="text-[#8b949e]">24 Hours of Le Mans and driving programs.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-24 px-4 animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#0e1216] border border-white/20 rounded shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-[0.2em] text-porsche-red font-semibold">
                Search Porsche
              </span>
              <button onClick={() => setIsSearchOpen(false)} className="text-[#8b949e] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-6">
              <Search className="w-5 h-5 absolute left-3 top-3.5 text-[#6e7681]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 911 GT3 RS, Taycan, Macan Electric, dealers, accessories..."
                className="w-full bg-[#181d24] text-white pl-11 pr-4 py-3 rounded border border-white/10 focus:outline-none focus:border-porsche-red text-sm"
                autoFocus
              />
            </div>

            <div className="text-xs text-[#8b949e]">
              <p className="uppercase tracking-widest mb-3 font-semibold text-white">Popular Searches:</p>
              <div className="flex flex-wrap gap-2">
                {['911 GT3 RS', 'Taycan Turbo GT', 'Macan Electric', 'Porsche Approved', 'Sport Chrono', 'Stuttgart Center', 'Chronograph'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      setIsSearchOpen(false);
                      handleNavClick('models');
                    }}
                    className="px-3 py-1.5 bg-[#181d24] hover:bg-porsche-red hover:text-white rounded text-xs transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

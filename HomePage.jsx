import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Sliders, ShieldCheck, 
  Zap, Flame, Sparkles, ChevronRight, 
  Volume2, Check, ExternalLink 
} from 'lucide-react';
import { engineAudio } from '../utils/engineSound';

export const HomePage = ({ setCurrentView, onSelectModelForConfig, onOpenTestDriveModal }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isRevving, setIsRevving] = useState(false);

  // Hero Slides
  const heroSlides = [
    {
      id: '911-gt3-rs',
      modelName: '911 GT3 RS',
      title: 'The new 911 GT3 RS.',
      subtitle: 'Timeless machine. Born from racing.',
      description: 'Aerodynamic downforce of 860 kg, intelligent lightweight carbon construction, and a 4.0-litre naturally aspirated engine revving up to 9,000 rpm.',
      image: 'https://images.pistonheads.com/nimg/47438/blobid0.jpg',
      specs: { power: '525 hp / 386 kW', accel: '3.2 s', topSpeed: '296 km/h' }
    },
    {
      id: 'taycan-turbo-gt',
      modelName: 'Taycan Turbo GT',
      title: 'The new Taycan Turbo GT.',
      subtitle: 'Soul, electrified. 1,034 hp.',
      description: 'Up to 1,034 horsepower with Launch Control, Attack Mode boosting 120 kW at the push of a button, and the fastest lap time at the Nürburgring.',
      image: 'https://hips.hearstapps.com/hmg-prod/images/2025-porsche-taycan-turbo-gt-weissach-118-6838612029974.jpg?crop=0.619xw:0.522xh;0.153xw,0.347xh&resize=1200:*',
      specs: { power: '1,034 hp / 760 kW', accel: '2.2 s', topSpeed: '305 km/h' }
    },
    {
      id: 'macan-turbo-electric',
      modelName: 'Macan Electric',
      title: 'The all-electric Macan.',
      subtitle: 'Keep your essence. Thrilling every day.',
      description: 'Sportscar soul meets progressive electric SUV versatility. Powered by 800V architecture with up to 270 kW DC fast charging.',
      image: 'https://ev-database.org/img/auto/Porsche_Macan_Turbo_2024/Porsche_Macan_Turbo_2024-01@2x.jpg',
      specs: { power: '639 hp / 470 kW', accel: '3.3 s', topSpeed: '260 km/h' }
    },
    {
      id: '718-cayman-gt4-rs',
      modelName: '718 Cayman GT4 RS',
      title: '718 Cayman GT4 RS.',
      subtitle: 'For the sport of it. Pure mid-engine.',
      description: 'The 4.0-litre flat-six from the 911 GT3 breathes through process air intakes next to your ears, screaming to 9,000 rpm.',
      image: 'https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXkBuNYdMGF4tl3U0%25z8rMHIspbWvanYb%255y%25oq%25vSTmjMXD4qAZeoNBPUSfUx4RmHlCgI7Zl2dioCx3hQDcFGDZuWXsOWbteV6iTWXIzhRc2uaEqA7fQrp9OJtWFnQbNWMbdJvgzyko6c09ItDVW8uw',
      specs: { power: '500 hp / 368 kW', accel: '3.4 s', topSpeed: '315 km/h' }
    }
  ];

  // Auto-advance hero slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    fetch('/api/models')
      .then((res) => res.json())
      .then((data) => {
        setModels(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredModels = models.filter((m) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'electric') return m.fuelType === 'All-Electric';
    if (activeTab === 'hybrid') return m.fuelType === 'E-Hybrid';
    if (activeTab === 'petrol') return m.fuelType === 'Petrol';
    return true;
  });

  const activeSlide = heroSlides[currentHeroSlide];

  const handleSoundRev = () => {
    setIsRevving(true);
    const soundType = activeSlide.id.includes('taycan') || activeSlide.id.includes('macan') ? 'electric' : 'flat6';
    engineAudio.playRev(soundType);
    setTimeout(() => setIsRevving(false), 2800);
  };

  return (
    <div className="space-y-28">
      {/* Pristine Fullscreen Hero Showcase */}
      <section className="relative min-h-[90vh] flex items-end justify-start overflow-hidden">
        {/* Hero Background Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              index === currentHeroSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-7000 ease-out"
            />
            {/* Cinematic subtle gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090c] via-black/35 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent" />
          </div>
        ))}

        {/* Hero Typography & CTAs */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-28 pt-20">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.28em] font-semibold text-[#c4c7c9] block mb-2">
              Dr. Ing. h.c. F. Porsche AG
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-none">
              {activeSlide.title}
            </h1>

            <p className="text-lg sm:text-2xl font-light text-[#f0f2f5] mt-3 tracking-wide">
              {activeSlide.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-[#c4c7c9] mt-4 leading-relaxed max-w-xl">
              {activeSlide.description}
            </p>

            {/* Official Porsche Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => {
                  const targetModel = models.find((m) => m.id === activeSlide.id) || models[0];
                  onSelectModelForConfig(targetModel);
                  setCurrentView('configurator');
                }}
                className="bg-white hover:bg-[#e2e5e8] text-black font-bold uppercase text-xs tracking-[0.2em] px-8 py-3.5 rounded transition-all shadow-xl"
              >
                Build Your Own
              </button>

              <button
                onClick={() => setCurrentView('models')}
                className="bg-black/40 hover:bg-black/60 text-white border border-white/30 backdrop-blur-md font-semibold uppercase text-xs tracking-[0.2em] px-7 py-3.5 rounded transition-colors"
              >
                All Models
              </button>

              {/* Discreet Engine Audio trigger */}
              <button
                onClick={handleSoundRev}
                className="bg-black/40 hover:bg-white/10 text-white border border-white/20 backdrop-blur-md p-3.5 rounded transition-colors"
                title="Acoustic Engine Preview"
              >
                <Volume2 className={`w-4 h-4 ${isRevving ? 'text-porsche-red animate-pulse' : 'text-white'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Slide Switcher Tabs */}
        <div className="absolute bottom-6 inset-x-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto pb-2 scrollbar-none border-t border-white/15 pt-4">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentHeroSlide(idx)}
                className={`text-left transition-all py-1 focus:outline-none flex-shrink-0 ${
                  idx === currentHeroSlide ? 'opacity-100' : 'opacity-40 hover:opacity-75'
                }`}
              >
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.2em] text-white block">
                  {slide.modelName}
                </span>
                <span className="text-[10px] text-[#8b949e] font-mono hidden sm:block">
                  {slide.specs.power}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Model Series Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-porsche-red block mb-2">
              Crafted in Germany
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              The Porsche Model Range
            </h2>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#0f1217] rounded border border-white/10 text-xs font-semibold uppercase tracking-wider">
            {[
              { id: 'all', label: 'All Models' },
              { id: 'electric', label: 'All-Electric' },
              { id: 'hybrid', label: 'E-Hybrid' },
              { id: 'petrol', label: 'Gasoline' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map((car) => (
            <div
              key={car.id}
              className="group bg-[#0e1216] border border-white/10 rounded overflow-hidden hover:border-porsche-red transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden bg-black">
                  <img
                    src={car.heroImage}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#0a0d11]/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                    {car.fuelType}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#0a0d11]/80 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono font-bold text-white border border-white/10">
                    from €{car.startingPrice?.toLocaleString()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8b949e] font-semibold">
                    {car.familyTitle || car.family} Series
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mt-1 group-hover:text-porsche-red transition-colors">
                    {car.name}
                  </h3>
                  <p className="text-xs text-[#8b949e] mt-2 line-clamp-2">
                    {car.description}
                  </p>

                  {/* Clean Technical Specs Grid */}
                  <div className="grid grid-cols-3 gap-2 py-4 mt-4 border-t border-white/5 text-center font-mono">
                    <div className="bg-[#141920] p-2 rounded">
                      <span className="text-[9px] text-[#707680] uppercase block">Power</span>
                      <span className="text-xs font-bold text-white">{car.powerHp} hp</span>
                    </div>
                    <div className="bg-[#141920] p-2 rounded">
                      <span className="text-[9px] text-[#707680] uppercase block">0-100</span>
                      <span className="text-xs font-bold text-white">{car.acceleration}</span>
                    </div>
                    <div className="bg-[#141920] p-2 rounded">
                      <span className="text-[9px] text-[#707680] uppercase block">Top Speed</span>
                      <span className="text-xs font-bold text-white">{car.topSpeed}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    onSelectModelForConfig(car);
                    setCurrentView('configurator');
                  }}
                  className="flex-1 bg-white hover:bg-[#e0e2e4] text-black text-xs font-bold uppercase tracking-[0.15em] py-3 rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure</span>
                </button>

                <button
                  onClick={() => {
                    onSelectModelForConfig(car);
                    onOpenTestDriveModal(car);
                  }}
                  className="bg-[#181d24] hover:bg-[#252c36] text-white text-xs font-semibold uppercase tracking-wider py-3 px-4 rounded border border-white/10 transition-colors"
                >
                  Test Drive
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Porsche Approved Pre-Owned Spotlight */}
      <section className="bg-gradient-to-r from-[#0e1216] via-[#141922] to-[#0e1216] border-y border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-porsche-red mb-2">
                <ShieldCheck className="w-4 h-4" />
                Porsche Approved
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-4">
                Factory Certified Pre-Owned
              </h2>
              <p className="text-sm text-[#9ea7b0] leading-relaxed mb-8">
                Every vehicle certified with the Porsche Approved seal meets the exacting standards of our Zuffenhausen engineers. Fully inspected across 111 technical checkpoints and protected by an official minimum 24-month warranty.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentView('finder')}
                  className="bg-white hover:bg-[#e0e2e4] text-black px-6 py-3.5 rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
                >
                  <span>Search Inventory</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentView('dealers')}
                  className="bg-[#1b2028] hover:bg-[#262d38] text-white border border-white/15 px-6 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Locate Porsche Centre
                </button>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="relative rounded overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.pistonheads.com/nimg/47438/blobid0.jpg"
                  alt="Porsche Approved Pre-Owned"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md p-4 rounded border border-white/10 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-white font-bold block">111-Point Technical Inspection</span>
                    <span className="text-[#8b949e]">24-month warranty with 100% genuine parts</span>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-porsche-red flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motorsport Heritage & Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-porsche-red block mb-2">
            Motorsport & Heritage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            There is no substitute.
          </h2>
          <p className="text-sm text-[#8b949e] mt-3">
            Since 1948, the race track has been Porsche's proving ground. Explore our endurance triumphs, Formula E innovation, and customer driving academies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            onClick={() => setCurrentView('experience')}
            className="group bg-[#0e1216] border border-white/10 rounded overflow-hidden hover:border-porsche-red transition-all cursor-pointer"
          >
            <div className="h-64 overflow-hidden">
              <img
                src="https://porschepictures.flowcenter.de/pmdb/thumbnail.cgi?id=335385&w=1035&h=582&crop=1&public=1&cs=234dc588f96c86a5"
                alt="24 Hours of Le Mans"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-porsche-red block mb-1">
                24 Hours of Le Mans
              </span>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-porsche-red transition-colors">
                19 Overall Victories
              </h3>
              <p className="text-xs text-[#8b949e]">
                Discover how Porsche Penske Motorsport and the 963 hybrid prototype lead the top tier of endurance racing worldwide.
              </p>
            </div>
          </div>

          <div 
            onClick={() => setCurrentView('experience')}
            className="group bg-[#0e1216] border border-white/10 rounded overflow-hidden hover:border-porsche-red transition-all cursor-pointer"
          >
            <div className="h-64 overflow-hidden">
              <img
                src="https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dw144b4fca/images/1-Partnership-REVAMP/motorsports/3-Porsche-FormulaE/2023/tag-heuer-porsche-formula-e-team-5-m.png"
                alt="Formula E"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-porsche-red block mb-1">
                Formula E World Championship
              </span>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-porsche-red transition-colors">
                High-Voltage Street Racing
              </h3>
              <p className="text-xs text-[#8b949e]">
                The factory Porsche 99X Electric tests next-generation electric software and regenerative braking on world circuits.
              </p>
            </div>
          </div>

          <div 
            onClick={() => setCurrentView('experience')}
            className="group bg-[#0e1216] border border-white/10 rounded overflow-hidden hover:border-porsche-red transition-all cursor-pointer"
          >
            <div className="h-64 overflow-hidden">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Porsche-Museum_Main_Entrance.JPG?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original"
                alt="Porsche Museum"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-porsche-red block mb-1">
                Stuttgart-Zuffenhausen
              </span>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-porsche-red transition-colors">
                The Porsche Museum
              </h3>
              <p className="text-xs text-[#8b949e]">
                Over 80 historic vehicles from the 356 'No. 1' to modern icons, housed in an architectural landmark at Porscheplatz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Porsche Design & Lifestyle Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#0e1216] border border-white/10 rounded-lg p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-porsche-red block mb-2">
              Porsche Design
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white mb-3">
              Precision Timepieces & Accessories
            </h2>
            <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed mb-6">
              Form follows function. Discover COSC-certified chronographs, motorsport apparel, and precision luggage engineered with automotive passion.
            </p>
            <button
              onClick={() => setCurrentView('shop')}
              className="bg-white hover:bg-[#e0e2e4] text-black px-7 py-3 rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
            >
              <span>Visit Porsche Shop</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-4">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=85"
              alt="Porsche Watch"
              className="w-36 sm:w-48 h-48 object-cover rounded border border-white/10"
            />
            <img
              src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=85"
              alt="Motorsport Jacket"
              className="w-36 sm:w-48 h-48 object-cover rounded border border-white/10 hidden sm:block"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

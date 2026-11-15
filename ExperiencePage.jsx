import React, { useState, useEffect } from 'react';
import { 
  Trophy, ShieldCheck, Flag, Sparkles, 
  ArrowRight, Calendar, Compass, ExternalLink 
} from 'lucide-react';

export const ExperiencePage = ({ onOpenTestDriveModal, setCurrentView }) => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch('/api/experiences')
      .then((res) => res.json())
      .then((data) => setExperiences(data.data || []))
      .catch((err) => console.error(err));
  }, []);

  const milestones = [
    { year: '1948', title: 'Porsche 356 "No. 1" Roadster', desc: 'Ferry Porsche builds the very first sports car bearing the Porsche name in Gmünd, Austria.' },
    { year: '1963', title: 'The Porsche 911 Debut', desc: 'Unveiled at the Frankfurt IAA as the 901, establishing the timeless rear-engine silhouette.' },
    { year: '1970', title: 'First Le Mans Overall Victory', desc: 'Hans Herrmann and Richard Attwood conquer the 24 Hours of Le Mans in the legendary red and white Porsche 917 KH.' },
    { year: '1986', title: 'The Revolutionary 959', desc: 'All-wheel drive supercar with twin-turbo engine and electronic management, the fastest street-legal production car of its era.' },
    { year: '2013', title: 'Porsche 918 Spyder', desc: 'The 887 hp hybrid hypercar becomes the first production vehicle to break the 7-minute barrier at the Nürburgring Nordschleife (6:57 min).' },
    { year: '2019', title: 'Taycan: Soul, Electrified', desc: 'Porsche enters the all-electric era with 800-volt architecture and blistering repeatable performance.' },
    { year: '2024+', title: '911 T-Hybrid & All-Electric Macan', desc: 'Supercharged agility meets performance electrification for the next generation.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero */}
      <div className="relative rounded-lg overflow-hidden border border-[#20252e] min-h-[420px] flex items-end p-8 sm:p-12">
        <img
          src={experiences[0]?.image || "https://porschepictures.flowcenter.de/pmdb/thumbnail.cgi?id=335385&w=1035&h=582&crop=1&public=1&cs=234dc588f96c86a5"}
          alt="Porsche Motorsport Le Mans"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded border border-white/20 text-white text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
            <Trophy className="w-3.5 h-3.5 text-porsche-red" />
            19 Overall Victories at Le Mans
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Motorsport & Heritage
          </h1>
          <p className="text-sm text-[#d0d4d8] mt-3 leading-relaxed">
            We don't build race cars to win races. We race to build better sports cars. Experience the triumphs, driving academies, and historical milestones of Porsche.
          </p>
        </div>
      </div>

      {/* Experience Programs Cards */}
      <div className="space-y-6">
        <div className="border-b border-[#20252e] pb-4">
          <span className="text-xs uppercase tracking-widest text-porsche-red font-semibold block mb-1">
            Exclusive Programs
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white">
            Porsche Driving Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#0e1216] border border-[#20252e] rounded overflow-hidden hover:border-porsche-red transition-all flex flex-col justify-between group"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-white border border-[#262c36]">
                  {exp.category}
                </div>
              </div>

              <div className="p-6">
                <span className="text-xs text-porsche-red font-semibold uppercase tracking-wider block mb-1">
                  {exp.subtitle}
                </span>
                <h3 className="text-xl font-bold uppercase text-white mb-2 group-hover:text-porsche-red transition-colors">
                  {exp.title}
                </h3>
                <p className="text-xs text-[#8b949e] leading-relaxed mb-6">
                  {exp.description}
                </p>

                <button
                  onClick={() => onOpenTestDriveModal()}
                  className="w-full bg-[#161a22] hover:bg-porsche-red text-white py-2.5 rounded text-xs uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-2 border border-[#29303d] hover:border-porsche-red"
                >
                  <span>Inquire Program</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Milestones Timeline */}
      <div className="bg-[#0e1216] border border-[#20252e] rounded-lg p-8 sm:p-12 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-porsche-red font-semibold block mb-1">
            Driven by Dreams Since 1948
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white">
            75+ Years of Porsche Heritage
          </h2>
          <p className="text-xs sm:text-sm text-[#8b949e] mt-2">
            "In the beginning I looked around and could not find quite the car I was dreaming of. So I decided to build it myself." — Ferry Porsche
          </p>
        </div>

        <div className="space-y-6 pt-4 border-t border-[#1f252f]">
          {milestones.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start pb-6 border-b border-[#1b2027] last:border-b-0">
              <span className="text-2xl sm:text-3xl font-black font-mono text-porsche-red tracking-tight min-w-[100px]">
                {item.year}
              </span>
              <div>
                <h4 className="text-base font-bold text-white uppercase">{item.title}</h4>
                <p className="text-xs text-[#8b949e] mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

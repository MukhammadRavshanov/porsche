import React, { useState, useEffect } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Search, 
  ArrowRight, ShieldCheck, Zap, Compass 
} from 'lucide-react';

export const DealersPage = ({ onOpenTestDriveModal }) => {
  const [dealers, setDealers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dealers')
      .then((res) => res.json())
      .then((data) => {
        setDealers(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredDealers = dealers.filter((d) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      d.city.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.address.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-[#21262f] pb-6">
        <span className="text-xs uppercase tracking-[0.2em] text-porsche-red font-semibold block mb-1">
          Global Network
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
          Porsche Centre Locator
        </h1>
        <p className="text-xs sm:text-sm text-[#8b949e] mt-2 max-w-2xl">
          Visit an authorized Porsche Centre for personalized vehicle consultations, Exclusive Manufaktur fitting, factory deliveries, and certified maintenance.
        </p>
      </div>

      {/* Search Toolbar */}
      <div className="bg-[#0e1216] border border-[#20252e] p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#6e7681]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by city, country or name (Stuttgart, London, Dubai...)"
            className="w-full bg-[#161a22] border border-[#272d37] text-white text-xs pl-10 pr-4 py-2.5 rounded focus:outline-none focus:border-porsche-red"
          />
        </div>

        <div className="text-xs text-[#8b949e] flex items-center gap-2">
          <Compass className="w-4 h-4 text-porsche-red" />
          <span>Found <strong className="text-white font-mono">{filteredDealers.length}</strong> Official Centres</span>
        </div>
      </div>

      {/* Dealers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDealers.map((d) => (
          <div
            key={d.id}
            className="bg-[#0e1216] border border-[#20252e] rounded p-6 hover:border-porsche-red transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#171c23] text-porsche-red font-bold rounded border border-[#242b36]">
                  {d.country}
                </span>
                <span className="text-xs text-white font-semibold">{d.city}</span>
              </div>

              <h3 className="text-lg font-bold text-white uppercase mt-2 mb-3">
                {d.name}
              </h3>

              <div className="space-y-2 text-xs text-[#8b949e]">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#6e7681] flex-shrink-0 mt-0.5" />
                  <span>{d.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#6e7681] flex-shrink-0" />
                  <span className="font-mono text-white">{d.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#6e7681] flex-shrink-0" />
                  <span>{d.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#6e7681] flex-shrink-0" />
                  <span>{d.openingHours}</span>
                </p>
              </div>

              {/* Service Badges */}
              <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[#1b2027]">
                {d.services?.map((svc, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 bg-[#14181f] text-[#a4abb4] rounded border border-[#222731]">
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            {/* Test Drive CTA */}
            <div className="mt-6 pt-4 border-t border-[#1b2027]">
              <button
                onClick={() => onOpenTestDriveModal()}
                className="w-full bg-[#181d24] hover:bg-porsche-red text-white text-xs uppercase font-bold tracking-widest py-2.5 rounded transition-colors flex items-center justify-center gap-2 border border-[#2a313b] hover:border-porsche-red"
              >
                <span>Book Test Drive Here</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

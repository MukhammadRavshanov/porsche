import React, { useState, useEffect } from 'react';
import { 
  Sliders, ArrowRight, Gauge, Zap, Sparkles, Flame, 
  Check, X, ChevronRight, Layers, SlidersHorizontal 
} from 'lucide-react';

export const ModelsPage = ({ setCurrentView, onSelectModelForConfig, onOpenTestDriveModal }) => {
  const [models, setModels] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState('all');
  const [selectedFuel, setSelectedFuel] = useState('all');
  const [comparedModels, setComparedModels] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const families = [
    { id: 'all', label: 'All Families' },
    { id: '718', label: '718' },
    { id: '911', label: '911' },
    { id: 'taycan', label: 'Taycan' },
    { id: 'panamera', label: 'Panamera' },
    { id: 'macan', label: 'Macan' },
    { id: 'cayenne', label: 'Cayenne' }
  ];

  const fuelTypes = [
    { id: 'all', label: 'All Powertrains' },
    { id: 'Petrol', label: 'Petrol' },
    { id: 'E-Hybrid', label: 'E-Hybrid' },
    { id: 'All-Electric', label: 'All-Electric' }
  ];

  const filteredModels = models.filter((m) => {
    const familyMatch = selectedFamily === 'all' || m.family.toLowerCase() === selectedFamily.toLowerCase();
    const fuelMatch = selectedFuel === 'all' || m.fuelType.toLowerCase() === selectedFuel.toLowerCase();
    return familyMatch && fuelMatch;
  });

  const toggleCompare = (car) => {
    if (comparedModels.some((c) => c.id === car.id)) {
      setComparedModels(comparedModels.filter((c) => c.id !== car.id));
    } else {
      if (comparedModels.length >= 3) {
        alert('You can compare up to 3 Porsche models simultaneously.');
        return;
      }
      setComparedModels([...comparedModels, car]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Title & Intro */}
      <div className="border-b border-[#20252e] pb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-porsche-red font-semibold block mb-1">
          The Full Lineup
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
          Porsche Models
        </h1>
        <p className="text-sm text-[#8b949e] mt-2 max-w-2xl">
          Discover the soul of sports cars. From iconic flat-six coupes to high-voltage electric sedans and performance luxury SUVs.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0e1216] p-4 rounded border border-[#1f252f]">
        {/* Family Tabs */}
        <div className="flex flex-wrap gap-2">
          {families.map((fam) => (
            <button
              key={fam.id}
              onClick={() => setSelectedFamily(fam.id)}
              className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                selectedFamily === fam.id
                  ? 'bg-porsche-red text-white'
                  : 'bg-[#181d24] text-[#8b949e] hover:text-white'
              }`}
            >
              {fam.label}
            </button>
          ))}
        </div>

        {/* Fuel Type Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#707680] uppercase tracking-wider hidden sm:inline">Drive:</span>
          {fuelTypes.map((fuel) => (
            <button
              key={fuel.id}
              onClick={() => setSelectedFuel(fuel.id)}
              className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                selectedFuel === fuel.id
                  ? 'bg-white text-black'
                  : 'bg-[#181d24] text-[#8b949e] hover:text-white'
              }`}
            >
              {fuel.label}
            </button>
          ))}
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredModels.map((car) => {
          const isComparing = comparedModels.some((c) => c.id === car.id);
          return (
            <div
              key={car.id}
              className={`bg-[#0d1014] border rounded overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                isComparing ? 'border-porsche-red shadow-lg shadow-porsche-red/15' : 'border-[#1e232c] hover:border-[#38414e]'
              }`}
            >
              <div>
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-black group">
                  <img
                    src={car.heroImage}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-white border border-[#262c36]">
                    {car.fuelType}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono font-bold text-white border border-[#262c36]">
                    from €{car.startingPrice?.toLocaleString()}
                  </div>

                  {/* Compare button overlay */}
                  <button
                    onClick={() => toggleCompare(car)}
                    className={`absolute bottom-3 right-3 px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider backdrop-blur-md border transition-all ${
                      isComparing 
                        ? 'bg-porsche-red text-white border-porsche-red'
                        : 'bg-black/60 text-[#c4c7c9] border-white/20 hover:text-white'
                    }`}
                  >
                    {isComparing ? '✓ Comparing' : '+ Compare'}
                  </button>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-porsche-red font-semibold">
                        {car.category}
                      </span>
                      <h2 className="text-xl font-bold uppercase tracking-tight text-white mt-0.5">
                        {car.name}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs text-[#8b949e] mt-2 line-clamp-2">
                    {car.description}
                  </p>

                  {/* Key specs */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#1b2027] text-center font-mono text-xs">
                    <div className="bg-[#141920] p-2.5 rounded">
                      <span className="text-[9px] text-[#707680] uppercase block">Power</span>
                      <strong className="text-white">{car.powerHp} hp</strong>
                    </div>
                    <div className="bg-[#141920] p-2.5 rounded">
                      <span className="text-[9px] text-[#707680] uppercase block">0-100</span>
                      <strong className="text-white">{car.acceleration}</strong>
                    </div>
                    <div className="bg-[#141920] p-2.5 rounded">
                      <span className="text-[9px] text-[#707680] uppercase block">Top Speed</span>
                      <strong className="text-white">{car.topSpeed}</strong>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#707680] mt-3 space-y-1">
                    <p>Transmission: <span className="text-white">{car.transmission}</span></p>
                    <p>Drive: <span className="text-white">{car.drivetrain}</span></p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    onSelectModelForConfig(car);
                    setCurrentView('configurator');
                  }}
                  className="flex-1 bg-porsche-red hover:bg-porsche-red-dark text-white text-xs font-bold uppercase tracking-widest py-3 rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Build Your Own</span>
                </button>

                <button
                  onClick={() => {
                    onSelectModelForConfig(car);
                    onOpenTestDriveModal(car);
                  }}
                  className="bg-[#171c23] hover:bg-[#252c36] text-white text-xs font-semibold uppercase tracking-wider py-3 px-3.5 rounded border border-[#2b333e] transition-colors"
                  title="Test Drive"
                >
                  Test Drive
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Compare Bar */}
      {comparedModels.length > 0 && (
        <div className="fixed bottom-6 inset-x-4 sm:inset-x-8 z-40 max-w-4xl mx-auto bg-[#10141a]/95 backdrop-blur-xl border border-porsche-red p-4 rounded-lg shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-porsche-red font-bold">
              Comparing ({comparedModels.length}/3):
            </span>
            <div className="flex gap-2">
              {comparedModels.map((c) => (
                <div key={c.id} className="flex items-center gap-1.5 bg-[#1a2028] px-2.5 py-1 rounded text-xs text-white">
                  <span>{c.name}</span>
                  <button onClick={() => toggleCompare(c)} className="text-[#888] hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setComparedModels([])}
              className="text-xs text-[#8b949e] hover:text-white uppercase tracking-wider px-2"
            >
              Clear
            </button>
            <button
              onClick={() => setShowCompareModal(true)}
              className="flex-1 sm:flex-none bg-porsche-red hover:bg-porsche-red-dark text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded transition-colors"
            >
              Compare Specifications
            </button>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-5xl bg-[#0e1216] border border-[#262c36] rounded-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-[#20252e] mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-porsche-red font-semibold">Technical Comparison</span>
                <h3 className="text-2xl font-bold uppercase text-white">Side-By-Side Specs</h3>
              </div>
              <button onClick={() => setShowCompareModal(false)} className="text-[#8b949e] hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-${comparedModels.length} gap-6`}>
              {comparedModels.map((car) => (
                <div key={car.id} className="bg-[#14181f] p-4 rounded border border-[#232933]">
                  <img src={car.heroImage} alt={car.name} className="w-full h-40 object-cover rounded mb-4" />
                  <h4 className="text-lg font-bold uppercase text-white mb-1">{car.name}</h4>
                  <p className="text-xs text-porsche-red font-mono font-bold mb-4">from €{car.startingPrice?.toLocaleString()}</p>

                  <div className="space-y-3 text-xs font-mono">
                    <div className="pb-2 border-b border-[#20252e]">
                      <span className="text-[#707680] block text-[10px] uppercase">Powertrain</span>
                      <span className="text-white font-semibold">{car.fuelType}</span>
                    </div>
                    <div className="pb-2 border-b border-[#20252e]">
                      <span className="text-[#707680] block text-[10px] uppercase">Power (Output)</span>
                      <span className="text-white font-semibold">{car.powerHp} hp ({car.powerKw} kW)</span>
                    </div>
                    <div className="pb-2 border-b border-[#20252e]">
                      <span className="text-[#707680] block text-[10px] uppercase">0 - 100 km/h</span>
                      <span className="text-white font-semibold">{car.acceleration}</span>
                    </div>
                    <div className="pb-2 border-b border-[#20252e]">
                      <span className="text-[#707680] block text-[10px] uppercase">Top Speed</span>
                      <span className="text-white font-semibold">{car.topSpeed}</span>
                    </div>
                    <div className="pb-2 border-b border-[#20252e]">
                      <span className="text-[#707680] block text-[10px] uppercase">Drivetrain</span>
                      <span className="text-white font-semibold">{car.drivetrain}</span>
                    </div>
                    <div className="pb-2 border-b border-[#20252e]">
                      <span className="text-[#707680] block text-[10px] uppercase">Transmission</span>
                      <span className="text-white font-semibold">{car.transmission}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectModelForConfig(car);
                      setShowCompareModal(false);
                      setCurrentView('configurator');
                    }}
                    className="w-full mt-6 bg-porsche-red text-white py-2.5 text-xs uppercase font-bold tracking-widest rounded"
                  >
                    Configure {car.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

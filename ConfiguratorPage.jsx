import React, { useState, useEffect } from 'react';
import { CarVisualizer } from '../components/CarVisualizer';
import { 
  Check, Heart, Share2, FileText, ChevronRight, 
  Sparkles, ShieldCheck, ArrowRight, Sliders, CheckCircle2 
} from 'lucide-react';

export const ConfiguratorPage = ({ 
  selectedModel, 
  onSaveConfiguration, 
  onOpenTestDriveModal 
}) => {
  const [model, setModel] = useState(selectedModel || null);
  const [allModels, setAllModels] = useState([]);
  const [activeTab, setActiveTab] = useState('exterior'); // 'exterior', 'wheels', 'interior', 'packages'
  
  // Customization state
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedWheels, setSelectedWheels] = useState(null);
  const [selectedInterior, setSelectedInterior] = useState(null);
  const [selectedPackages, setSelectedPackages] = useState([]);
  
  // UI states
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showSpecSheet, setShowSpecSheet] = useState(false);

  // Load models from API if not provided
  useEffect(() => {
    fetch('/api/models')
      .then((res) => res.json())
      .then((data) => {
        const list = data.data || [];
        setAllModels(list);
        if (!model && list.length > 0) {
          setModel(list[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // When model changes, set initial options
  useEffect(() => {
    if (selectedModel) {
      setModel(selectedModel);
    }
  }, [selectedModel]);

  useEffect(() => {
    if (model) {
      setSelectedColor(model.colors?.[0] || null);
      setSelectedWheels(model.wheels?.[0] || null);
      setSelectedInterior(model.interiors?.[0] || null);
      setSelectedPackages([]);
    }
  }, [model]);

  if (!model) {
    return (
      <div className="py-24 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-porsche-red border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-sm uppercase tracking-wider text-[#8b949e]">Loading Porsche Configurator...</p>
      </div>
    );
  }

  // Calculate total price
  const basePrice = model.startingPrice || 0;
  const colorPrice = selectedColor?.price || 0;
  const wheelsPrice = selectedWheels?.price || 0;
  const interiorPrice = selectedInterior?.price || 0;
  const packagesPrice = selectedPackages.reduce((acc, p) => acc + (p.price || 0), 0);
  const totalPrice = basePrice + colorPrice + wheelsPrice + interiorPrice + packagesPrice;

  const togglePackage = (pkg) => {
    if (selectedPackages.some((p) => p.id === pkg.id)) {
      setSelectedPackages(selectedPackages.filter((p) => p.id !== pkg.id));
    } else {
      setSelectedPackages([...selectedPackages, pkg]);
    }
  };

  const handleSaveConfig = () => {
    const configData = {
      id: 'cfg-' + Date.now().toString(36),
      model,
      selectedColor,
      selectedWheels,
      selectedInterior,
      selectedPackages,
      totalPrice,
      date: new Date().toLocaleDateString()
    };
    onSaveConfiguration(configData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header: Model Switcher & Porsche Code */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-[#21262f] gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-porsche-red">
            Official Porsche Car Configurator
          </span>
          <h1 className="text-3xl font-extrabold uppercase text-white mt-0.5">
            {model.name}
          </h1>
          <p className="text-xs text-[#8b949e]">Porsche Code: <span className="font-mono text-white">PR7X992-GT3</span></p>
        </div>

        {/* Change Model Selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-[#8b949e] hidden sm:inline">Model:</span>
          <select
            value={model.id}
            onChange={(e) => {
              const found = allModels.find((m) => m.id === e.target.value);
              if (found) setModel(found);
            }}
            className="bg-[#14181f] border border-[#2b323c] text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-porsche-red font-semibold"
          >
            {allModels.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Visualizer on Left, Options on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Car Visualizer & Real-time Preview (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <CarVisualizer
            model={model}
            selectedColor={selectedColor}
            selectedWheels={selectedWheels}
            selectedInterior={selectedInterior}
            selectedPackages={selectedPackages}
          />

          {/* Quick Technical Highlights Bar */}
          <div className="grid grid-cols-4 gap-3 bg-[#0e1216] p-4 rounded border border-[#20252e] text-center font-mono">
            <div>
              <span className="text-[10px] text-[#707680] uppercase block">Power</span>
              <strong className="text-xs sm:text-sm text-white">{model.powerHp} hp</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#707680] uppercase block">0-100 km/h</span>
              <strong className="text-xs sm:text-sm text-white">{model.acceleration}</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#707680] uppercase block">Top Speed</span>
              <strong className="text-xs sm:text-sm text-white">{model.topSpeed}</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#707680] uppercase block">Drivetrain</span>
              <strong className="text-xs sm:text-sm text-white">{model.drivetrain?.includes('All') ? 'AWD' : 'RWD'}</strong>
            </div>
          </div>
        </div>

        {/* Right: Customization Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0e1216] border border-[#20252e] rounded-lg p-6 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex border-b border-[#21262f] pb-2 text-xs font-semibold uppercase tracking-wider overflow-x-auto gap-1">
            {[
              { id: 'exterior', label: 'Exterior' },
              { id: 'wheels', label: 'Wheels' },
              { id: 'interior', label: 'Interior' },
              { id: 'packages', label: 'Packages' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3 rounded transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-porsche-red text-white'
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Exterior Colors */}
          {activeTab === 'exterior' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-[#8b949e] font-semibold">
                  Exterior Paintwork
                </h3>
                <p className="text-sm font-bold text-white mt-1">
                  {selectedColor?.name} {selectedColor?.price > 0 ? `(+€${selectedColor.price.toLocaleString()})` : '(Standard)'}
                </p>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 pt-2">
                {model.colors?.map((col) => {
                  const isSelected = selectedColor?.id === col.id;
                  return (
                    <button
                      key={col.id}
                      onClick={() => setSelectedColor(col)}
                      className={`relative group flex flex-col items-center p-2 rounded border transition-all ${
                        isSelected ? 'border-porsche-red bg-[#181d24]' : 'border-[#262c36] hover:border-white/40'
                      }`}
                      title={`${col.name} - ${col.price > 0 ? `€${col.price}` : 'No Cost'}`}
                    >
                      <span
                        className="w-10 h-10 rounded-full border border-white/20 shadow-md group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="text-[9px] text-[#8b949e] mt-1.5 text-center truncate max-w-[60px]">
                        {col.name.split(' ')[0]}
                      </span>
                      {isSelected && (
                        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-porsche-red rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Wheels */}
          {activeTab === 'wheels' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-[#8b949e] font-semibold">
                  Wheels & Rims
                </h3>
                <p className="text-sm font-bold text-white mt-1">
                  {selectedWheels?.name}
                </p>
              </div>

              <div className="space-y-3">
                {model.wheels?.map((wheel) => {
                  const isSelected = selectedWheels?.id === wheel.id;
                  return (
                    <div
                      key={wheel.id}
                      onClick={() => setSelectedWheels(wheel)}
                      className={`p-3.5 rounded border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected ? 'border-porsche-red bg-[#181d24]' : 'border-[#262c36] hover:border-white/30'
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-bold text-white">{wheel.name}</h4>
                        <span className="text-[11px] text-[#8b949e]">{wheel.size}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-white">
                          {wheel.price === 0 ? 'Included' : `+€${wheel.price.toLocaleString()}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Interior */}
          {activeTab === 'interior' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-[#8b949e] font-semibold">
                  Interior & Materials
                </h3>
                <p className="text-sm font-bold text-white mt-1">
                  {selectedInterior?.name}
                </p>
              </div>

              <div className="space-y-3">
                {model.interiors?.map((inter) => {
                  const isSelected = selectedInterior?.id === inter.id;
                  return (
                    <div
                      key={inter.id}
                      onClick={() => setSelectedInterior(inter)}
                      className={`p-3.5 rounded border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected ? 'border-porsche-red bg-[#181d24]' : 'border-[#262c36] hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span 
                          className="w-5 h-5 rounded-full border border-white/20"
                          style={{ backgroundColor: inter.colorHex || '#111' }}
                        />
                        <h4 className="text-xs font-bold text-white">{inter.name}</h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-white">
                        {inter.price === 0 ? 'Included' : `+€${inter.price.toLocaleString()}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 4: Packages */}
          {activeTab === 'packages' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-[#8b949e] font-semibold">
                  Equipment & Performance Packages
                </h3>
                <p className="text-xs text-[#8b949e] mt-1">
                  Enhance track precision, acoustics, and motorsport capability.
                </p>
              </div>

              <div className="space-y-3">
                {model.packages?.map((pkg) => {
                  const isChecked = selectedPackages.some((p) => p.id === pkg.id);
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => togglePackage(pkg)}
                      className={`p-3.5 rounded border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked ? 'border-porsche-red bg-[#181d24]' : 'border-[#262c36] hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked ? 'bg-porsche-red border-porsche-red text-white' : 'border-[#555]'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{pkg.name}</h4>
                          <span className="text-[10px] uppercase text-porsche-red font-semibold">{pkg.category}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-white">
                        {pkg.price === 0 ? 'Included' : `+€${pkg.price.toLocaleString()}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Summary & Purchase Actions */}
          <div className="pt-6 border-t border-[#21262f] space-y-4">
            <div className="space-y-1.5 text-xs text-[#8b949e]">
              <div className="flex justify-between">
                <span>Base MSRP:</span>
                <span className="font-mono text-white">€{basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Equipment & Colors:</span>
                <span className="font-mono text-white">+€{(colorPrice + wheelsPrice + interiorPrice + packagesPrice).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#21262f]">
                <span className="uppercase tracking-wider">Total Price:</span>
                <span className="font-mono text-porsche-red text-xl">€{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onOpenTestDriveModal(model)}
                className="w-full bg-porsche-red hover:bg-porsche-red-dark text-white uppercase text-xs font-bold tracking-widest py-3.5 rounded flex items-center justify-center gap-2 transition-colors"
              >
                <span>Request Quotation & Test Drive</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSaveConfig}
                  className={`py-2.5 px-3 rounded border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                    savedSuccess 
                      ? 'bg-green-950/80 border-green-600 text-green-300' 
                      : 'bg-[#14181f] border-[#2b323c] text-white hover:border-white'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 text-porsche-red" />
                  <span>{savedSuccess ? 'Saved!' : 'Save Build'}</span>
                </button>

                <button
                  onClick={() => setShowSpecSheet(true)}
                  className="bg-[#14181f] border border-[#2b323c] text-white hover:border-white py-2.5 px-3 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Spec Sheet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spec Sheet Modal */}
      {showSpecSheet && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#0e1216] border border-[#282f3a] rounded p-6 shadow-2xl">
            <h3 className="text-xl font-bold uppercase text-white mb-2">Build Specification Sheet</h3>
            <p className="text-xs text-[#8b949e] mb-4">Official Dr. Ing. h.c. F. Porsche AG Vehicle Summary</p>

            <div className="bg-[#14181f] p-4 rounded text-xs space-y-2 font-mono text-[#c4c7c9] border border-[#222832] mb-6">
              <p><strong className="text-white">Model:</strong> {model.name}</p>
              <p><strong className="text-white">Exterior Paint:</strong> {selectedColor?.name}</p>
              <p><strong className="text-white">Wheels:</strong> {selectedWheels?.name}</p>
              <p><strong className="text-white">Interior:</strong> {selectedInterior?.name}</p>
              <p><strong className="text-white">Packages:</strong> {selectedPackages.map(p => p.name).join(', ') || 'Standard'}</p>
              <p className="pt-2 border-t border-[#232934] text-porsche-red text-sm font-bold">
                Total MSRP: €{totalPrice.toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => setShowSpecSheet(false)}
              className="w-full bg-porsche-red text-white py-2.5 text-xs uppercase font-bold tracking-widest rounded"
            >
              Close Spec Sheet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

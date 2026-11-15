import React from 'react';
import { Heart, Trash2, Sliders, ArrowRight, Car, CheckCircle2 } from 'lucide-react';

export const SavedPage = ({ 
  savedConfigurations = [], 
  onRemoveConfiguration, 
  onSelectModelForConfig, 
  setCurrentView,
  onOpenTestDriveModal 
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-[#21262f] pb-6 flex justify-between items-end">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-porsche-red font-semibold block mb-1">
            My Porsche Garage
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            Saved Configurations
          </h1>
          <p className="text-xs sm:text-sm text-[#8b949e] mt-2">
            Your personalized Porsche builds saved for review, quote request, or factory ordering.
          </p>
        </div>

        <span className="text-xs font-mono text-[#8b949e]">
          {savedConfigurations.length} Saved Builds
        </span>
      </div>

      {savedConfigurations.length === 0 ? (
        <div className="text-center py-20 bg-[#0e1216] border border-[#20252e] rounded-lg p-8">
          <Heart className="w-12 h-12 mx-auto mb-3 text-[#3a414c]" />
          <h3 className="text-base font-bold uppercase text-white">No Saved Configurations</h3>
          <p className="text-xs text-[#8b949e] mt-1 max-w-sm mx-auto mb-6">
            Use the official Porsche Car Configurator to design your bespoke dream car and save your configuration.
          </p>
          <button
            onClick={() => setCurrentView('configurator')}
            className="bg-porsche-red hover:bg-porsche-red-dark text-white px-6 py-3 rounded text-xs uppercase font-bold tracking-widest transition-colors inline-flex items-center gap-2"
          >
            <Sliders className="w-4 h-4" />
            <span>Launch Configurator</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedConfigurations.map((item) => (
            <div
              key={item.id}
              className="bg-[#0e1216] border border-[#21262d] rounded-lg overflow-hidden flex flex-col justify-between hover:border-porsche-red transition-all group"
            >
              <div>
                <div className="relative h-56 bg-black overflow-hidden">
                  <img
                    src={item.model?.heroImage}
                    alt={item.model?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-white border border-[#262c36]">
                    Saved on {item.date}
                  </div>
                  <button
                    onClick={() => onRemoveConfiguration(item.id)}
                    className="absolute top-3 right-3 p-1.5 bg-black/80 hover:bg-porsche-red text-white rounded transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6">
                  <span className="text-[10px] uppercase tracking-widest text-porsche-red font-semibold">
                    {item.model?.family} Series
                  </span>
                  <h3 className="text-xl font-bold uppercase text-white mt-1">
                    {item.model?.name}
                  </h3>

                  {/* Summary */}
                  <div className="mt-4 space-y-2 text-xs font-mono text-[#a5abb4] border-t border-[#1c222b] pt-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: item.selectedColor?.hex || '#111' }}
                      />
                      <span>Paint: <strong className="text-white">{item.selectedColor?.name}</strong></span>
                    </div>
                    <div>
                      <span>Wheels: <strong className="text-white">{item.selectedWheels?.size || 'Standard'}</strong></span>
                    </div>
                    <div>
                      <span>Interior: <strong className="text-white">{item.selectedInterior?.name?.split(' ')[0]}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#1b2027] mt-3">
                <div className="flex justify-between items-center py-3">
                  <span className="text-xs uppercase text-[#8b949e]">Total Price:</span>
                  <span className="text-lg font-mono font-bold text-porsche-red">
                    €{item.totalPrice?.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onSelectModelForConfig(item.model);
                      setCurrentView('configurator');
                    }}
                    className="w-full bg-[#181d24] hover:bg-[#252c36] text-white py-2.5 rounded text-xs uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-2 border border-[#2b333e]"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Open in Configurator</span>
                  </button>

                  <button
                    onClick={() => onOpenTestDriveModal(item.model)}
                    className="w-full bg-porsche-red hover:bg-porsche-red-dark text-white py-2.5 rounded text-xs uppercase font-bold tracking-widest transition-colors"
                  >
                    Request Quotation
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

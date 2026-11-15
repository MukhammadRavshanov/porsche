import React, { useState } from 'react';
import { Volume2, RotateCw, Eye, Sparkles } from 'lucide-react';
import { engineAudio } from '../utils/engineSound';

export const CarVisualizer = ({ 
  model, 
  selectedColor, 
  selectedWheels, 
  selectedInterior,
  selectedPackages = [] 
}) => {
  const [activeAngle, setActiveAngle] = useState('side'); // 'side', 'front', 'rear'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlaySound = () => {
    setIsPlayingAudio(true);
    const soundType = model?.fuelType === 'All-Electric' ? 'electric' : 'flat6';
    engineAudio.playRev(soundType);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2800);
  };

  // Color tint style for realistic vehicle rendering
  const colorHex = selectedColor?.hex || '#c3001e';

  return (
    <div className="relative w-full bg-gradient-to-b from-[#13171e] via-[#0d1014] to-[#07090b] rounded-lg border border-[#232932] overflow-hidden p-6 sm:p-10 flex flex-col justify-between min-h-[460px]">
      {/* Top HUD Specs & Audio Button */}
      <div className="flex justify-between items-start z-10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-porsche-red">
            Porsche Visualizer Studio
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-0.5">
            {model?.name || '911 GT3 RS'}
          </h2>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-[#8b949e]">
            <span className="px-2 py-0.5 bg-[#1f252f] text-white rounded text-[11px] font-mono">
              {model?.fuelType || 'Petrol'}
            </span>
            <span>•</span>
            <span className="font-mono text-white">{model?.powerHp || 525} hp</span>
            <span>•</span>
            <span className="font-mono text-white">0-100: {model?.acceleration || '3.2 s'}</span>
          </div>
        </div>

        {/* Engine Rev Sound Button */}
        <button
          onClick={handlePlaySound}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all ${
            isPlayingAudio
              ? 'bg-porsche-red text-white border-porsche-red scale-105 shadow-lg shadow-porsche-red/30'
              : 'bg-[#181d25] text-white border-[#2f3742] hover:border-porsche-red'
          }`}
          title="Start Engine & Rev"
        >
          <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-white' : 'text-porsche-red'}`} />
          <span>{isPlayingAudio ? 'Reving Engine...' : (model?.fuelType === 'All-Electric' ? 'Propulsion Sound' : 'Engine Sound')}</span>
        </button>
      </div>

      {/* Main Car Visual Canvas */}
      <div className="relative my-6 flex items-center justify-center min-h-[260px] group">
        {/* Soft studio ambient light underneath */}
        <div 
          className="absolute bottom-2 w-3/4 h-8 rounded-full blur-2xl opacity-60 transition-colors duration-500"
          style={{ backgroundColor: colorHex }}
        />

        {/* Dynamic Studio Car Graphics */}
        <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center">
          {/* Main Car Photo with active color tint filter overlay */}
          <div className="relative w-full overflow-hidden rounded-md shadow-2xl">
            <img
              src={model?.heroImage || "https://cdn.motor1.com/images/mgl/YAgVGq/s1/2024-porsche-cayenne-turbo-e-hybrid.webp"}
              alt={model?.name}
              className="w-full h-72 sm:h-80 object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.02]"
            />
            
            {/* Color Accent Glow overlay reflecting current paint choice */}
            <div 
              className="absolute inset-0 mix-blend-color opacity-45 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: colorHex }}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-[#0d1014] via-transparent to-transparent opacity-80"
            />
          </div>

          {/* Caliper / PCCB Yellow Caliper indicator if selected */}
          {selectedPackages.some(p => p.id?.includes('pccb')) && (
            <div className="absolute bottom-16 right-24 bg-[#ffd700] text-black text-[9px] font-bold px-2 py-0.5 rounded shadow tracking-widest uppercase">
              PCCB Ceramic Calipers
            </div>
          )}

          {/* Weissach Carbon Badge if selected */}
          {selectedPackages.some(p => p.id?.includes('weissach')) && (
            <div className="absolute top-4 right-4 bg-black/80 border border-[#444] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow tracking-widest uppercase flex items-center gap-1.5 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-porsche-red" />
              Weissach Package
            </div>
          )}
        </div>
      </div>

      {/* Bottom studio bar: Current Selected Specs & Camera Angles */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-[#1c2128] z-10 text-xs">
        {/* Selected options pills */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-[#161a20] px-3 py-1.5 rounded border border-[#262c35]">
            <span 
              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: colorHex }}
            />
            <span className="text-white font-medium">{selectedColor?.name || 'Paint Choice'}</span>
          </div>

          <div className="bg-[#161a20] px-3 py-1.5 rounded border border-[#262c35] text-[#c4c7c9] truncate max-w-[240px]">
            <span className="text-white font-medium">{selectedWheels?.name?.split(' ')[0] || 'Wheels'}:</span> {selectedWheels?.size || '20/21"'}
          </div>

          <div className="bg-[#161a20] px-3 py-1.5 rounded border border-[#262c35] text-[#c4c7c9]">
            <span className="text-white font-medium">Interior:</span> {selectedInterior?.name?.split(' ')[0] || 'Race-Tex'}
          </div>
        </div>

        {/* View Angle selector buttons */}
        <div className="flex items-center gap-1 bg-[#14181f] p-1 rounded border border-[#252a33]">
          {['side', 'front', 'rear'].map((angle) => (
            <button
              key={angle}
              onClick={() => setActiveAngle(angle)}
              className={`px-3 py-1 rounded uppercase tracking-wider text-[11px] font-semibold transition-colors ${
                activeAngle === angle ? 'bg-[#29303c] text-white' : 'text-[#8b949e] hover:text-white'
              }`}
            >
              {angle}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

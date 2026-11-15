import React, { useState, useEffect } from 'react';
import { 
  Search, SlidersHorizontal, ShieldCheck, MapPin, 
  Car, ArrowRight, Heart, Check, X 
} from 'lucide-react';

export const FinderPage = ({ onOpenTestDriveModal, onSaveConfiguration }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [family, setFamily] = useState('all');
  const [condition, setCondition] = useState('all');
  const [fuelType, setFuelType] = useState('all');
  const [maxPrice, setMaxPrice] = useState(320000);
  const [sort, setSort] = useState('price-desc');
  const [search, setSearch] = useState('');

  const fetchInventory = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (family !== 'all') params.append('family', family);
    if (condition !== 'all') params.append('condition', condition);
    if (fuelType !== 'all') params.append('fuelType', fuelType);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (sort) params.append('sort', sort);

    fetch(`/api/inventory?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInventory();
  }, [family, condition, fuelType, maxPrice, sort]);

  const filteredVehicles = vehicles.filter((v) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      v.title.toLowerCase().includes(q) ||
      v.location.toLowerCase().includes(q) ||
      v.dealer.toLowerCase().includes(q) ||
      v.color.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="border-b border-[#21262f] pb-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-porsche-red font-semibold mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Porsche Finder</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
          Vehicle Search & Inventory
        </h1>
        <p className="text-xs sm:text-sm text-[#8b949e] mt-2">
          Find your dream Porsche from factory-certified new vehicles and Porsche Approved pre-owned cars worldwide.
        </p>
      </div>

      {/* Main Layout: Filters Sidebar (3 Cols) + Vehicle Grid (9 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filter Sidebar */}
        <div className="lg:col-span-3 bg-[#0e1216] border border-[#212731] rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-[#1f252e]">
            <span className="text-xs uppercase tracking-widest font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-porsche-red" />
              Filter Results
            </span>
            <button
              onClick={() => {
                setFamily('all');
                setCondition('all');
                setFuelType('all');
                setMaxPrice(320000);
                setSearch('');
              }}
              className="text-[11px] text-[#8b949e] hover:text-white uppercase tracking-wider"
            >
              Reset
            </button>
          </div>

          {/* Keyword Search */}
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-[#8b949e] mb-1.5 font-semibold">
              Search Keywords
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#6e7681]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="GT3, Stuttgart, Red..."
                className="w-full bg-[#161a20] border border-[#262c36] text-white text-xs pl-9 pr-3 py-2 rounded focus:outline-none focus:border-porsche-red"
              />
            </div>
          </div>

          {/* Model Family */}
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-[#8b949e] mb-1.5 font-semibold">
              Model Series
            </label>
            <select
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              className="w-full bg-[#161a20] border border-[#262c36] text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-porsche-red"
            >
              <option value="all">All Series</option>
              <option value="911">911</option>
              <option value="taycan">Taycan</option>
              <option value="718">718</option>
              <option value="panamera">Panamera</option>
              <option value="macan">Macan</option>
              <option value="cayenne">Cayenne</option>
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-[#8b949e] mb-1.5 font-semibold">
              Vehicle Condition
            </label>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'All Conditions' },
                { id: 'New', label: 'New Vehicles' },
                { id: 'Approved', label: 'Porsche Approved (Pre-Owned)' }
              ].map((c) => (
                <label key={c.id} className="flex items-center gap-2 cursor-pointer text-[#8b949e] hover:text-white">
                  <input
                    type="radio"
                    name="condition"
                    checked={condition === c.id}
                    onChange={() => setCondition(c.id)}
                    className="accent-porsche-red"
                  />
                  <span>{c.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fuel type */}
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-[#8b949e] mb-1.5 font-semibold">
              Drive / Fuel Type
            </label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              className="w-full bg-[#161a20] border border-[#262c36] text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-porsche-red"
            >
              <option value="all">All Fuel Types</option>
              <option value="Petrol">Petrol</option>
              <option value="E-Hybrid">E-Hybrid</option>
              <option value="All-Electric">All-Electric</option>
            </select>
          </div>

          {/* Max Price Slider */}
          <div>
            <div className="flex justify-between items-center text-[11px] uppercase tracking-widest text-[#8b949e] mb-1.5 font-semibold">
              <span>Max Price</span>
              <span className="font-mono text-white">€{Number(maxPrice).toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="80000"
              max="350000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full accent-porsche-red"
            />
          </div>

          {/* Sorting */}
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-[#8b949e] mb-1.5 font-semibold">
              Sort By
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-[#161a20] border border-[#262c36] text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-porsche-red"
            >
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="mileage-asc">Mileage: Lowest First</option>
              <option value="year-desc">Year: Newest First</option>
            </select>
          </div>
        </div>

        {/* Vehicle Inventory Grid */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex justify-between items-center text-xs text-[#8b949e] pb-2 border-b border-[#1f252e]">
            <span>Showing <strong className="text-white font-mono">{filteredVehicles.length}</strong> available Porsche vehicles</span>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-porsche-red border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-xs uppercase tracking-widest text-[#8b949e]">Updating Inventory...</p>
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="py-16 text-center bg-[#0e1216] border border-[#21262d] rounded p-8">
              <Car className="w-12 h-12 mx-auto mb-3 text-[#444]" />
              <h3 className="text-base font-bold uppercase text-white">No Vehicles Matched</h3>
              <p className="text-xs text-[#8b949e] mt-1">Try widening your price range or clearing filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVehicles.map((car) => (
                <div
                  key={car.id}
                  className="bg-[#0e1216] border border-[#20252e] rounded overflow-hidden hover:border-porsche-red transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative h-56 overflow-hidden bg-black">
                      <img
                        src={car.image}
                        alt={car.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-white border border-[#262c36] flex items-center gap-1.5">
                        {car.condition === 'Porsche Approved' && <ShieldCheck className="w-3.5 h-3.5 text-porsche-red" />}
                        <span>{car.condition}</span>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-[#c4c7c9] font-mono">
                        {car.mileage} {car.mileageUnit} • {car.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-white uppercase group-hover:text-porsche-red transition-colors line-clamp-1">
                        {car.title}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-[#8b949e] mt-1">
                        <MapPin className="w-3.5 h-3.5 text-porsche-red" />
                        <span>{car.location}</span>
                      </div>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#1b2027] text-xs font-mono">
                        <div>
                          <span className="text-[10px] text-[#707680] block">Color</span>
                          <span className="text-white font-semibold">{car.color}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#707680] block">Power</span>
                          <span className="text-white font-semibold">{car.powerHp} hp</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {car.highlights?.slice(0, 3).map((hl, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-[#161a22] text-[#8b949e] text-[10px] rounded border border-[#222834]">
                            {hl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="p-5 pt-0 border-t border-[#1b2027] mt-3">
                    <div className="flex justify-between items-center mb-3 pt-3">
                      <div>
                        <span className="text-[10px] uppercase text-[#707680] block font-mono">Retail Price</span>
                        <strong className="text-lg font-mono text-white">€{car.price?.toLocaleString()}</strong>
                      </div>
                      <span className="text-[10px] text-green-400 font-semibold uppercase tracking-wider">
                        Available Now
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenTestDriveModal({ name: car.title, id: car.model })}
                      className="w-full bg-porsche-red hover:bg-porsche-red-dark text-white uppercase text-xs font-bold tracking-widest py-2.5 rounded transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Inquire / Book Test Drive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

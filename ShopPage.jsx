import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, ShieldCheck, Sparkles, Filter, 
  Check, ArrowRight, Heart 
} from 'lucide-react';

export const ShopPage = ({ onAddToCart, onOpenCart }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [addedIds, setAddedIds] = useState([]);

  useEffect(() => {
    fetch('/api/shop/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'Timepieces', label: 'Timepieces' },
    { id: 'Apparel', label: 'Motorsport Apparel' },
    { id: 'Models & Toys', label: 'Scale Models' },
    { id: 'Accessories', label: 'Eyewear & Accessories' },
    { id: 'Luggage', label: 'Luggage & Bags' },
    { id: 'Audio & Electronics', label: 'Audio & Sound' }
  ];

  const filteredProducts = products.filter((p) => {
    if (category === 'all') return true;
    return p.category.toLowerCase() === category.toLowerCase();
  });

  const handleAdd = (item) => {
    onAddToCart(item);
    setAddedIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== item.id));
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Banner */}
      <div className="relative rounded-lg overflow-hidden border border-[#21262f] bg-gradient-to-r from-[#12161c] via-[#1a2028] to-[#0e1216] p-8 sm:p-12">
        <div className="max-w-xl">
          <span className="text-xs uppercase tracking-[0.2em] text-porsche-red font-semibold block mb-2">
            Porsche Design & Lifestyle
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            Engineered Luxury & Precision
          </h1>
          <p className="text-xs sm:text-sm text-[#9ea7b0] mt-3 leading-relaxed">
            Form follows function. Discover exclusive timepieces, motorsport heritage collections, and precision luggage engineered with automotive passion.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-[#1f252e]">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
              category === cat.id
                ? 'bg-porsche-red text-white'
                : 'bg-[#12151b] text-[#8b949e] hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-porsche-red border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-xs uppercase tracking-widest text-[#8b949e]">Loading Porsche Lifestyle Collection...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((item) => {
            const isJustAdded = addedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-[#0e1216] border border-[#20252e] rounded overflow-hidden hover:border-porsche-red transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.badge && (
                      <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-white border border-[#262c36]">
                        {item.badge}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] uppercase tracking-widest text-[#707680] font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-white uppercase mt-1 group-hover:text-porsche-red transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#8b949e] mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#1b2027] mt-3">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-lg font-mono font-bold text-white">
                      €{item.price?.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-green-400 font-semibold uppercase">
                      In Stock
                    </span>
                  </div>

                  <button
                    onClick={() => handleAdd(item)}
                    className={`w-full py-3 rounded text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-colors ${
                      isJustAdded
                        ? 'bg-green-600 text-white'
                        : 'bg-porsche-red hover:bg-porsche-red-dark text-white'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added To Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add To Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

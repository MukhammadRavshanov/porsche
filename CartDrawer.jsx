import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const response = await fetch('/api/shop/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          customer: { name: 'Porsche Connoisseur' }
        })
      });

      const data = await response.json();
      if (response.ok) {
        setOrderComplete(data.order);
        onClearCart();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e1216] border-l border-[#21262e] text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#21262e] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-porsche-red" />
              <h2 className="text-lg font-bold uppercase tracking-wider">Porsche Bag</h2>
            </div>
            <button onClick={onClose} className="text-[#8b949e] hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderComplete ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-porsche-red mx-auto mb-4" />
                <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Order Confirmed</h3>
                <p className="text-xs text-[#8b949e] mb-6">
                  Thank you for your order. Your Porsche Lifestyle items are being prepared for insured courier delivery.
                </p>
                <div className="bg-[#161a20] p-4 rounded text-left text-xs font-mono space-y-1 mb-6 border border-[#2a3038]">
                  <p><span className="text-white font-bold">Order ID:</span> {orderComplete.orderId}</p>
                  <p><span className="text-white font-bold">Total:</span> €{orderComplete.total?.toLocaleString()}</p>
                  <p><span className="text-white font-bold">Status:</span> {orderComplete.status}</p>
                </div>
                <button
                  onClick={() => {
                    setOrderComplete(null);
                    onClose();
                  }}
                  className="w-full bg-porsche-red text-white py-3 text-xs uppercase font-bold tracking-widest rounded"
                >
                  Continue Browsing
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-16 text-[#8b949e]">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Your shopping bag is currently empty.</p>
                <p className="text-xs text-[#555] mt-1">Explore our Porsche Design timepieces, motorsport apparel, and accessories.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-[#14181f] border border-[#232932] rounded">
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded bg-[#0a0c0e]" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-[#8b949e]">{item.category}</p>
                      <p className="text-xs font-mono text-white font-semibold mt-1">€{item.price.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1f252f]">
                      <div className="flex items-center gap-2 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 bg-[#212730] hover:bg-[#2e3643] rounded flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-mono">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 bg-[#212730] hover:bg-[#2e3643] rounded flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#6e7681] hover:text-porsche-red text-xs transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {!orderComplete && cartItems.length > 0 && (
            <div className="p-6 border-t border-[#21262e] bg-[#0b0e12] space-y-4">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-[#8b949e] uppercase tracking-wider text-xs">Subtotal</span>
                <span className="text-xl font-bold font-mono">€{total.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#8b949e]">
                <ShieldCheck className="w-4 h-4 text-porsche-red" />
                <span>Complimentary insured shipping & official Porsche authenticity</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full bg-porsche-red hover:bg-porsche-red-dark text-white uppercase text-xs font-bold tracking-widest py-3.5 rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <span>{checkingOut ? 'Processing Checkout...' : 'Proceed To Checkout'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

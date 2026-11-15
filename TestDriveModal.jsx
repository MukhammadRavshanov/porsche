import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, AlertCircle, Phone, Mail, User, Car } from 'lucide-react';

export const TestDriveModal = ({ isOpen, onClose, preselectedModel = null }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    modelName: preselectedModel?.name || '911 GT3 RS',
    modelId: preselectedModel?.id || '911-gt3-rs',
    preferredDate: '',
    dealerId: 'pc-stuttgart',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/test-drive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit test drive request');
      }

      setSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0f1318] border border-[#2a3038] rounded-sm p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8b949e] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-porsche-red mx-auto mb-4" />
            <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-2">
              Request Confirmed
            </h3>
            <p className="text-sm text-[#c4c7c9] mb-4">
              {success.message}
            </p>
            <div className="bg-[#181d24] p-4 rounded text-xs text-left mb-6 font-mono text-[#8b949e] border border-[#282f38]">
              <p><strong className="text-white">Booking Ref:</strong> {success.booking?.bookingId}</p>
              <p><strong className="text-white">Vehicle:</strong> {success.booking?.modelName}</p>
              <p><strong className="text-white">Client:</strong> {success.booking?.fullName} ({success.booking?.email})</p>
            </div>
            <button
              onClick={() => {
                setSuccess(null);
                onClose();
              }}
              className="bg-porsche-red text-white uppercase text-xs font-semibold tracking-widest px-8 py-3 rounded hover:bg-porsche-red-dark transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest text-porsche-red font-semibold block mb-1">
                Official Porsche Experience
              </span>
              <h2 className="text-2xl font-bold uppercase tracking-wider text-white">
                Book A Test Drive
              </h2>
              <p className="text-xs text-[#8b949e] mt-1">
                Experience the visceral emotion, motorsport dynamics, and precision engineering firsthand.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#9ea7b0] mb-1 font-semibold">
                  Select Porsche Model
                </label>
                <div className="relative">
                  <Car className="w-4 h-4 absolute left-3 top-3 text-[#6e7681]" />
                  <select
                    value={formData.modelName}
                    onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                    className="w-full bg-[#171b21] border border-[#282f38] text-white text-xs pl-10 pr-4 py-2.5 rounded focus:border-porsche-red focus:outline-none"
                    required
                  >
                    <option value="911 GT3 RS">911 GT3 RS (525 hp / 4.0L Flat-6)</option>
                    <option value="911 Carrera GTS">911 Carrera GTS (541 hp / T-Hybrid)</option>
                    <option value="Taycan Turbo GT">Taycan Turbo GT (1,034 hp / Electric)</option>
                    <option value="718 Cayman GT4 RS">718 Cayman GT4 RS (500 hp / Mid-engine)</option>
                    <option value="Panamera Turbo E-Hybrid">Panamera Turbo E-Hybrid (680 hp)</option>
                    <option value="Macan Turbo Electric">The New Macan Turbo Electric (639 hp)</option>
                    <option value="Cayenne Turbo E-Hybrid">Cayenne Turbo E-Hybrid Coupe (739 hp)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#9ea7b0] mb-1 font-semibold">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-[#6e7681]" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Alexander Porsche"
                      className="w-full bg-[#171b21] border border-[#282f38] text-white text-xs pl-10 pr-3 py-2.5 rounded focus:border-porsche-red focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#9ea7b0] mb-1 font-semibold">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-[#6e7681]" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@porsche.com"
                      className="w-full bg-[#171b21] border border-[#282f38] text-white text-xs pl-10 pr-3 py-2.5 rounded focus:border-porsche-red focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#9ea7b0] mb-1 font-semibold">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-[#6e7681]" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+49 170 1234567"
                      className="w-full bg-[#171b21] border border-[#282f38] text-white text-xs pl-10 pr-3 py-2.5 rounded focus:border-porsche-red focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#9ea7b0] mb-1 font-semibold">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-3 text-[#6e7681]" />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-[#171b21] border border-[#282f38] text-white text-xs pl-10 pr-3 py-2.5 rounded focus:border-porsche-red focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#9ea7b0] mb-1 font-semibold">
                  Preferred Porsche Centre
                </label>
                <select
                  value={formData.dealerId}
                  onChange={(e) => setFormData({ ...formData, dealerId: e.target.value })}
                  className="w-full bg-[#171b21] border border-[#282f38] text-white text-xs px-3 py-2.5 rounded focus:border-porsche-red focus:outline-none"
                >
                  <option value="pc-stuttgart">Porsche Centre Stuttgart-Zuffenhausen (Germany)</option>
                  <option value="pc-london-mayfair">Porsche Centre London Mayfair (UK)</option>
                  <option value="pc-munich">Porsche Centre Munich Olympiapark (Germany)</option>
                  <option value="pc-paris">Porsche Centre Paris Montparnasse (France)</option>
                  <option value="pc-dubai">Porsche Centre Dubai Downtown (UAE)</option>
                  <option value="pc-zurich">Porsche Centre Zurich Schlieren (Switzerland)</option>
                  <option value="pc-new-york">Porsche Studio Manhattan (USA)</option>
                  <option value="pc-tokyo">Porsche Centre Tokyo Ginza (Japan)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-porsche-red hover:bg-porsche-red-dark text-white uppercase text-xs font-bold tracking-widest py-3 rounded transition-colors disabled:opacity-50"
                >
                  {loading ? 'Submitting Request...' : 'Confirm Test Drive Request'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

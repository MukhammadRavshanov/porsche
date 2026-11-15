import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Mail, Key, LogOut, Plus, 
  Edit3, Trash2, CheckCircle2, AlertCircle, Eye, 
  Car, ShoppingBag, Calendar, Sliders, RefreshCw, X, ArrowLeft
} from 'lucide-react';
import { PorscheLogo, PorscheCrest } from '../components/PorscheCrest';

export const AdminPage = ({ setCurrentView }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('porsche_admin_auth') === 'true';
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active section tab
  const [activeTab, setActiveTab] = useState('models'); // 'models', 'inventory', 'shop', 'bookings'

  // Data states
  const [models, setModels] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Modal states for Create / Edit
  const [modalType, setModalType] = useState(null); // 'create-model', 'edit-model', 'create-inventory', 'edit-inventory', 'create-product', 'edit-product'
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!email || !email.includes('@')) {
      setLoginError('Please enter a valid Gmail / corporate email address.');
      return;
    }

    if (password === '7777') {
      setIsAuthenticated(true);
      localStorage.setItem('porsche_admin_auth', 'true');
      localStorage.setItem('porsche_admin_email', email);
    } else {
      setLoginError('Security Access Denied. Invalid Admin PIN Code.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('porsche_admin_auth');
    localStorage.removeItem('porsche_admin_email');
  };

  // Fetch all data
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [mRes, iRes, pRes, bRes] = await Promise.all([
        fetch('/api/models').then(r => r.json()),
        fetch('/api/inventory').then(r => r.json()),
        fetch('/api/shop/products').then(r => r.json()),
        fetch('/api/test-drives').then(r => r.json())
      ]);

      setModels(mRes.data || []);
      setInventory(iRes.data || []);
      setProducts(pRes.data || []);
      setBookings(bRes.data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const showNotification = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3500);
  };

  // ================= MODELS CRUD =================
  const handleOpenModelModal = (model = null) => {
    if (model) {
      setModalType('edit-model');
      setEditingItem(model);
      setFormData({
        name: model.name || '',
        family: model.family || '911',
        startingPrice: model.startingPrice || '',
        powerHp: model.powerHp || '',
        acceleration: model.acceleration || '',
        topSpeed: model.topSpeed || '',
        fuelType: model.fuelType || 'Petrol',
        heroImage: model.heroImage || '',
        tagline: model.tagline || '',
        description: model.description || ''
      });
    } else {
      setModalType('create-model');
      setEditingItem(null);
      setFormData({
        name: '',
        family: '911',
        startingPrice: 150000,
        powerHp: 500,
        acceleration: '3.4 s',
        topSpeed: '300 km/h',
        fuelType: 'Petrol',
        heroImage: 'https://images.pistonheads.com/nimg/47438/blobid0.jpg',
        tagline: 'Driven by Dreams.',
        description: 'Iconic sports car engineered with pure motorsport pedigree.'
      });
    }
  };

  const handleSaveModel = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'create-model') {
        const res = await fetch('/api/models', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (res.ok) {
          showNotification('Porsche Model successfully created!');
          setModalType(null);
          loadAllData();
        } else {
          alert(data.error || 'Failed to create model');
        }
      } else {
        const res = await fetch(`/api/models/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (res.ok) {
          showNotification('Model updated successfully!');
          setModalType(null);
          loadAllData();
        } else {
          alert(data.error || 'Failed to update model');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteModel = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/models/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification(`Model ${name} deleted.`);
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= INVENTORY CRUD =================
  const handleOpenInventoryModal = (item = null) => {
    if (item) {
      setModalType('edit-inventory');
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        price: item.price || '',
        mileage: item.mileage || 0,
        year: item.year || 2024,
        condition: item.condition || 'Porsche Approved',
        color: item.color || '',
        fuelType: item.fuelType || 'Petrol',
        location: item.location || '',
        image: item.image || ''
      });
    } else {
      setModalType('create-inventory');
      setEditingItem(null);
      setFormData({
        title: 'Porsche 911 GT3 RS',
        price: 265000,
        mileage: 1200,
        year: 2024,
        condition: 'Porsche Approved',
        color: 'Guards Red',
        fuelType: 'Petrol',
        location: 'Stuttgart, Germany',
        image: 'https://images.pistonheads.com/nimg/47438/blobid0.jpg'
      });
    }
  };

  const handleSaveInventory = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'create-inventory') {
        const res = await fetch('/api/inventory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          showNotification('Vehicle added to Porsche Finder inventory!');
          setModalType(null);
          loadAllData();
        }
      } else {
        const res = await fetch(`/api/inventory/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          showNotification('Vehicle details updated!');
          setModalType(null);
          loadAllData();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInventory = async (id, title) => {
    if (!window.confirm(`Delete ${title} from inventory?`)) return;
    try {
      const res = await fetch(`/api/inventory/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification('Vehicle removed from inventory.');
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= SHOP CRUD =================
  const handleOpenProductModal = (prod = null) => {
    if (prod) {
      setModalType('edit-product');
      setEditingItem(prod);
      setFormData({
        title: prod.title || '',
        category: prod.category || 'Timepieces',
        price: prod.price || '',
        description: prod.description || '',
        image: prod.image || '',
        badge: prod.badge || ''
      });
    } else {
      setModalType('create-product');
      setEditingItem(null);
      setFormData({
        title: '',
        category: 'Timepieces',
        price: 850,
        description: 'Official Porsche Design precision craftsmanship.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        badge: 'New Arrival'
      });
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'create-product') {
        const res = await fetch('/api/shop/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          showNotification('Product created in Porsche Shop!');
          setModalType(null);
          loadAllData();
        }
      } else {
        const res = await fetch(`/api/shop/products/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          showNotification('Product updated!');
          setModalType(null);
          loadAllData();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id, title) => {
    if (!window.confirm(`Delete product "${title}"?`)) return;
    try {
      const res = await fetch(`/api/shop/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification('Product removed.');
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= BOOKINGS STATUS =================
  const handleUpdateBookingStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/test-drives/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showNotification(`Booking status updated to ${status}.`);
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Delete this test drive booking?')) return;
    try {
      const res = await fetch(`/api/test-drives/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification('Booking deleted.');
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- LOGIN SCREEN ----------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-md bg-[#0e1216] border border-white/15 rounded-lg p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <PorscheCrest className="w-10 h-12 mx-auto mb-3" />
            <PorscheLogo className="text-xl" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-porsche-red font-semibold block mt-1">
              Porsche Management Portal
            </span>
            <p className="text-xs text-[#8b949e] mt-2">
              Sign in with your administrator email and 4-digit PIN code.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 bg-red-950/70 border border-red-700 text-red-200 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-[#9ea7b0] mb-1 font-semibold">
                Admin Email (Gmail)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3.5 text-[#6e7681]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="w-full bg-[#161a22] border border-white/15 text-white text-xs pl-10 pr-3 py-3 rounded focus:outline-none focus:border-porsche-red"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest text-[#9ea7b0] mb-1 font-semibold">
                Security PIN / Password (7777)
              </label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3 top-3.5 text-[#6e7681]" />
                <input
                  type="password"
                  required
                  maxLength={10}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter 7777"
                  className="w-full bg-[#161a22] border border-white/15 text-white text-xs pl-10 pr-3 py-3 rounded focus:outline-none focus:border-porsche-red font-mono tracking-widest text-center text-base"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-porsche-red hover:bg-porsche-red-dark text-white uppercase text-xs font-bold tracking-[0.2em] py-3.5 rounded transition-all mt-2"
            >
              Sign In To Admin Panel
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <button
              onClick={() => setCurrentView('home')}
              className="text-xs text-[#8b949e] hover:text-white flex items-center justify-center gap-1.5 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Porsche Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- ADMIN DASHBOARD ----------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {message && (
        <div className="fixed top-24 right-6 z-50 bg-[#161b22] border border-porsche-red text-white px-5 py-3 rounded shadow-2xl flex items-center gap-3 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-porsche-red" />
          <span>{message}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-porsche-red font-semibold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Porsche AG Administration</span>
          </div>
          <h1 className="text-3xl font-black uppercase text-white">
            Command Center
          </h1>
          <p className="text-xs text-[#8b949e] mt-1">
            Logged in as: <strong className="text-white font-mono">{localStorage.getItem('porsche_admin_email') || 'admin@porsche.com'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            className="p-2.5 bg-[#141820] hover:bg-white/10 text-[#8b949e] hover:text-white rounded border border-white/10 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-porsche-red' : ''}`} />
          </button>

          <button
            onClick={() => setCurrentView('home')}
            className="px-4 py-2 bg-[#141820] hover:bg-white/10 text-white rounded border border-white/10 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Live Site
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 bg-porsche-red hover:bg-porsche-red-dark text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0e1216] border border-white/10 p-5 rounded">
          <span className="text-[10px] uppercase tracking-widest text-[#707680] block font-semibold">Active Models</span>
          <span className="text-3xl font-black font-mono text-white mt-1 block">{models.length}</span>
          <span className="text-[11px] text-[#8b949e] mt-1 block">Full line-up & configurator</span>
        </div>

        <div className="bg-[#0e1216] border border-white/10 p-5 rounded">
          <span className="text-[10px] uppercase tracking-widest text-[#707680] block font-semibold">Finder Inventory</span>
          <span className="text-3xl font-black font-mono text-white mt-1 block">{inventory.length}</span>
          <span className="text-[11px] text-[#8b949e] mt-1 block">Pre-owned & New Vehicles</span>
        </div>

        <div className="bg-[#0e1216] border border-white/10 p-5 rounded">
          <span className="text-[10px] uppercase tracking-widest text-[#707680] block font-semibold">Shop Merchandise</span>
          <span className="text-3xl font-black font-mono text-white mt-1 block">{products.length}</span>
          <span className="text-[11px] text-[#8b949e] mt-1 block">Watches & Lifestyle</span>
        </div>

        <div className="bg-[#0e1216] border border-white/10 p-5 rounded">
          <span className="text-[10px] uppercase tracking-widest text-[#707680] block font-semibold">Test Drive Requests</span>
          <span className="text-3xl font-black font-mono text-porsche-red mt-1 block">{bookings.length}</span>
          <span className="text-[11px] text-[#8b949e] mt-1 block">Customer Inquiries</span>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex border-b border-white/10 pb-3 gap-2 overflow-x-auto text-xs font-bold uppercase tracking-wider">
        {[
          { id: 'models', label: 'Models Manager', icon: Car, count: models.length },
          { id: 'inventory', label: 'Porsche Finder Inventory', icon: Sliders, count: inventory.length },
          { id: 'shop', label: 'Shop Products', icon: ShoppingBag, count: products.length },
          { id: 'bookings', label: 'Test Drive Requests', icon: Calendar, count: bookings.length },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-porsche-red text-white'
                  : 'bg-[#12161c] text-[#8b949e] hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.2 bg-black/40 rounded text-[10px] font-mono">{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* ---------------- TAB 1: MODELS MANAGER ---------------- */}
      {activeTab === 'models' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold uppercase text-white">Vehicle Models ({models.length})</h3>
            <button
              onClick={() => handleOpenModelModal(null)}
              className="bg-white hover:bg-[#e0e2e4] text-black px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Model</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((m) => (
              <div key={m.id} className="bg-[#0e1216] border border-white/10 rounded overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="relative h-48 overflow-hidden bg-black">
                    <img src={m.heroImage} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-white border border-white/10">
                      {m.fuelType}
                    </div>
                    <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs font-mono font-bold text-white border border-white/10">
                      €{m.startingPrice?.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-[10px] uppercase text-porsche-red font-semibold">{m.family} Series</span>
                    <h4 className="text-lg font-bold uppercase text-white">{m.name}</h4>
                    <p className="text-xs text-[#8b949e] mt-1 line-clamp-2">{m.tagline}</p>

                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/5 text-center text-xs font-mono">
                      <div className="bg-[#14181f] p-1.5 rounded">
                        <span className="text-[9px] text-[#707680] block">HP</span>
                        <strong className="text-white">{m.powerHp}</strong>
                      </div>
                      <div className="bg-[#14181f] p-1.5 rounded">
                        <span className="text-[9px] text-[#707680] block">0-100</span>
                        <strong className="text-white">{m.acceleration}</strong>
                      </div>
                      <div className="bg-[#14181f] p-1.5 rounded">
                        <span className="text-[9px] text-[#707680] block">Vmax</span>
                        <strong className="text-white">{m.topSpeed}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-white/5 flex gap-2 mt-3">
                  <button
                    onClick={() => handleOpenModelModal(m)}
                    className="flex-1 bg-[#181d25] hover:bg-white/10 text-white py-2 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-white/10"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteModel(m.id, m.name)}
                    className="p-2 bg-red-950/40 hover:bg-porsche-red text-red-200 hover:text-white rounded border border-red-900/50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- TAB 2: INVENTORY MANAGER ---------------- */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold uppercase text-white">Porsche Finder Cars ({inventory.length})</h3>
            <button
              onClick={() => handleOpenInventoryModal(null)}
              className="bg-white hover:bg-[#e0e2e4] text-black px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((car) => (
              <div key={car.id} className="bg-[#0e1216] border border-white/10 rounded overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="relative h-44 overflow-hidden bg-black">
                    <img src={car.image} alt={car.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-white font-mono border border-white/10">
                      {car.condition}
                    </div>
                    <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs text-white font-mono font-bold border border-white/10">
                      €{car.price?.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-sm font-bold text-white uppercase line-clamp-1">{car.title}</h4>
                    <p className="text-xs text-[#8b949e] mt-1">{car.location} • {car.mileage} {car.mileageUnit}</p>
                    <p className="text-xs font-mono text-[#a0a5ad] mt-2">Color: {car.color} | {car.powerHp} hp</p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-white/5 flex gap-2 mt-2">
                  <button
                    onClick={() => handleOpenInventoryModal(car)}
                    className="flex-1 bg-[#181d25] hover:bg-white/10 text-white py-2 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-white/10"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteInventory(car.id, car.title)}
                    className="p-2 bg-red-950/40 hover:bg-porsche-red text-red-200 hover:text-white rounded border border-red-900/50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- TAB 3: SHOP MANAGER ---------------- */}
      {activeTab === 'shop' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold uppercase text-white">Porsche Lifestyle Store ({products.length})</h3>
            <button
              onClick={() => handleOpenProductModal(null)}
              className="bg-white hover:bg-[#e0e2e4] text-black px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-[#0e1216] border border-white/10 rounded overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="relative h-44 overflow-hidden bg-black">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-white border border-white/10">
                      {p.category}
                    </div>
                    <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs text-white font-mono font-bold border border-white/10">
                      €{p.price?.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-sm font-bold text-white uppercase line-clamp-1">{p.title}</h4>
                    <p className="text-xs text-[#8b949e] mt-1 line-clamp-2">{p.description}</p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-white/5 flex gap-2 mt-2">
                  <button
                    onClick={() => handleOpenProductModal(p)}
                    className="flex-1 bg-[#181d25] hover:bg-white/10 text-white py-2 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-white/10"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(p.id, p.title)}
                    className="p-2 bg-red-950/40 hover:bg-porsche-red text-red-200 hover:text-white rounded border border-red-900/50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- TAB 4: TEST DRIVES ---------------- */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold uppercase text-white">Client Test Drive Inquiries ({bookings.length})</h3>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 text-center bg-[#0e1216] border border-white/10 rounded">
              <Calendar className="w-12 h-12 text-[#444] mx-auto mb-3" />
              <p className="text-sm text-[#8b949e]">No test drive bookings yet.</p>
            </div>
          ) : (
            <div className="bg-[#0e1216] border border-white/10 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs text-[#c4c7c9]">
                <thead className="bg-[#141820] text-[#8b949e] uppercase tracking-wider border-b border-white/10 font-semibold text-[10px]">
                  <tr>
                    <th className="p-3.5">Ref ID</th>
                    <th className="p-3.5">Vehicle</th>
                    <th className="p-3.5">Client Info</th>
                    <th className="p-3.5">Preferred Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {bookings.map((b) => (
                    <tr key={b.bookingId} className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-bold text-white">{b.bookingId}</td>
                      <td className="p-3.5 text-white font-sans font-bold">{b.modelName}</td>
                      <td className="p-3.5 font-sans">
                        <div className="text-white font-semibold">{b.fullName}</div>
                        <div className="text-[#8b949e] text-[11px]">{b.email} • {b.phone}</div>
                      </td>
                      <td className="p-3.5 text-white">{b.preferredDate}</td>
                      <td className="p-3.5">
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateBookingStatus(b.bookingId, e.target.value)}
                          className="bg-[#181d24] border border-white/15 text-white text-[11px] px-2 py-1 rounded focus:outline-none focus:border-porsche-red"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDeleteBooking(b.bookingId)}
                          className="text-[#8b949e] hover:text-porsche-red transition-colors p-1"
                          title="Delete Request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ================= MODAL EDITOR ================= */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0e1216] border border-white/20 rounded-lg p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 text-[#8b949e] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold uppercase text-white mb-4">
              {modalType.startsWith('create') ? 'Create New' : 'Edit'} {modalType.includes('model') ? 'Model' : modalType.includes('inventory') ? 'Vehicle' : 'Product'}
            </h3>

            {/* MODEL FORM */}
            {modalType.includes('model') && (
              <form onSubmit={handleSaveModel} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#8b949e] uppercase font-semibold mb-1">Model Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. 911 GT3 RS"
                    className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#8b949e] uppercase font-semibold mb-1">Family</label>
                    <select
                      value={formData.family || '911'}
                      onChange={(e) => setFormData({ ...formData, family: e.target.value })}
                      className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                    >
                      <option value="911">911</option>
                      <option value="taycan">Taycan</option>
                      <option value="718">718</option>
                      <option value="panamera">Panamera</option>
                      <option value="macan">Macan</option>
                      <option value="cayenne">Cayenne</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8b949e] uppercase font-semibold mb-1">Fuel Type</label>
                    <select
                      value={formData.fuelType || 'Petrol'}
                      onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                      className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="All-Electric">All-Electric</option>
                      <option value="E-Hybrid">E-Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8b949e] uppercase font-semibold mb-1">Starting Price (€) *</label>
                    <input
                      type="number"
                      required
                      value={formData.startingPrice || ''}
                      onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                      placeholder="185000"
                      className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white font-mono focus:border-porsche-red focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#8b949e] uppercase font-semibold mb-1">Power (hp)</label>
                    <input
                      type="number"
                      value={formData.powerHp || ''}
                      onChange={(e) => setFormData({ ...formData, powerHp: e.target.value })}
                      placeholder="525"
                      className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white font-mono focus:border-porsche-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8b949e] uppercase font-semibold mb-1">0-100 km/h</label>
                    <input
                      type="text"
                      value={formData.acceleration || ''}
                      onChange={(e) => setFormData({ ...formData, acceleration: e.target.value })}
                      placeholder="3.2 s"
                      className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white font-mono focus:border-porsche-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8b949e] uppercase font-semibold mb-1">Top Speed</label>
                    <input
                      type="text"
                      value={formData.topSpeed || ''}
                      onChange={(e) => setFormData({ ...formData, topSpeed: e.target.value })}
                      placeholder="296 km/h"
                      className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white font-mono focus:border-porsche-red focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#8b949e] uppercase font-semibold mb-1">Hero Image URL</label>
                  <input
                    type="url"
                    value={formData.heroImage || ''}
                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                  />
                  {formData.heroImage && (
                    <img src={formData.heroImage} alt="Preview" className="w-full h-32 object-cover rounded mt-2 border border-white/10" />
                  )}
                </div>

                <div>
                  <label className="block text-[#8b949e] uppercase font-semibold mb-1">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline || ''}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="Timeless machine."
                    className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#8b949e] uppercase font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2.5 bg-[#181d24] hover:bg-white/10 text-white rounded uppercase font-semibold tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-porsche-red hover:bg-porsche-red-dark text-white rounded uppercase font-bold tracking-wider"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* INVENTORY FORM */}
            {modalType.includes('inventory') && (
              <form onSubmit={handleSaveInventory} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#8b949e] uppercase font-semibold mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#8b949e] uppercase font-semibold mb-1">Price (€) *</label>
                    <input
                      type="number"
                      required
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white font-mono focus:border-porsche-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8b949e] uppercase font-semibold mb-1">Mileage (km)</label>
                    <input
                      type="number"
                      value={formData.mileage || ''}
                      onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                      className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white font-mono focus:border-porsche-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8b949e] uppercase font-semibold mb-1">Year</label>
                    <input
                      type="number"
                      value={formData.year || ''}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white font-mono focus:border-porsche-red focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#8b949e] uppercase font-semibold mb-1">Condition</label>
                    <select
                      value={formData.condition || 'Porsche Approved'}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                    >
                      <option value="Porsche Approved">Porsche Approved</option>
                      <option value="New Vehicle">New Vehicle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#8b949e] uppercase font-semibold mb-1">Color</label>
                    <input
                      type="text"
                      value={formData.color || ''}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="Guards Red"
                      className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#8b949e] uppercase font-semibold mb-1">Dealer Location</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Stuttgart, Germany"
                    className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#8b949e] uppercase font-semibold mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded mt-2 border border-white/10" />
                  )}
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2.5 bg-[#181d24] hover:bg-white/10 text-white rounded uppercase font-semibold tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-porsche-red hover:bg-porsche-red-dark text-white rounded uppercase font-bold tracking-wider"
                  >
                    Save Vehicle
                  </button>
                </div>
              </form>
            )}

            {/* PRODUCT FORM */}
            {modalType.includes('product') && (
              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#8b949e] uppercase font-semibold mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#8b949e] uppercase font-semibold mb-1">Category</label>
                    <select
                      value={formData.category || 'Timepieces'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                    >
                      <option value="Timepieces">Timepieces</option>
                      <option value="Apparel">Apparel</option>
                      <option value="Models & Toys">Models & Toys</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Luggage">Luggage</option>
                      <option value="Audio & Electronics">Audio & Electronics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#8b949e] uppercase font-semibold mb-1">Price (€) *</label>
                    <input
                      type="number"
                      required
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white font-mono focus:border-porsche-red focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#8b949e] uppercase font-semibold mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Limited Edition"
                    className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#8b949e] uppercase font-semibold mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded mt-2 border border-white/10" />
                  )}
                </div>

                <div>
                  <label className="block text-[#8b949e] uppercase font-semibold mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#181d24] border border-white/15 p-2.5 rounded text-white focus:border-porsche-red focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2.5 bg-[#181d24] hover:bg-white/10 text-white rounded uppercase font-semibold tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-porsche-red hover:bg-porsche-red-dark text-white rounded uppercase font-bold tracking-wider"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

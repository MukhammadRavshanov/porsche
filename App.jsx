import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ModelsPage } from './pages/ModelsPage';
import { ConfiguratorPage } from './pages/ConfiguratorPage';
import { FinderPage } from './pages/FinderPage';
import { DealersPage } from './pages/DealersPage';
import { ShopPage } from './pages/ShopPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { SavedPage } from './pages/SavedPage';
import { TestDriveModal } from './components/TestDriveModal';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedModelForConfig, setSelectedModelForConfig] = useState(null);

  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('porsche_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Saved vehicle builds persisted to localStorage
  const [savedConfigs, setSavedConfigs] = useState(() => {
    try {
      const saved = localStorage.getItem('porsche_saved_configs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [testDriveModalData, setTestDriveModalData] = useState({ isOpen: false, model: null });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('porsche_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('porsche_saved_configs', JSON.stringify(savedConfigs));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [savedConfigs]);

  // Cart operations
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Saved configs operations
  const handleSaveConfiguration = (config) => {
    setSavedConfigs((prev) => [config, ...prev]);
  };

  const handleRemoveConfiguration = (id) => {
    setSavedConfigs((prev) => prev.filter((c) => c.id !== id));
  };

  const handleOpenTestDrive = (model = null) => {
    setTestDriveModalData({ isOpen: true, model });
  };

  const handleCloseTestDrive = () => {
    setTestDriveModalData({ isOpen: false, model: null });
  };

  // Scroll to top on page view switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-[#07090b] text-[#f2f4f7] flex flex-col justify-between selection:bg-porsche-red selection:text-white">
      {/* Global Luxury Porsche Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        savedCount={savedConfigs.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTestDriveModal={() => handleOpenTestDrive(null)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            setCurrentView={setCurrentView}
            onSelectModelForConfig={(model) => setSelectedModelForConfig(model)}
            onOpenTestDriveModal={handleOpenTestDrive}
          />
        )}

        {currentView === 'models' && (
          <ModelsPage
            setCurrentView={setCurrentView}
            onSelectModelForConfig={(model) => setSelectedModelForConfig(model)}
            onOpenTestDriveModal={handleOpenTestDrive}
          />
        )}

        {currentView === 'configurator' && (
          <ConfiguratorPage
            selectedModel={selectedModelForConfig}
            onSaveConfiguration={handleSaveConfiguration}
            onOpenTestDriveModal={handleOpenTestDrive}
          />
        )}

        {currentView === 'finder' && (
          <FinderPage
            onOpenTestDriveModal={handleOpenTestDrive}
            onSaveConfiguration={handleSaveConfiguration}
          />
        )}

        {currentView === 'dealers' && (
          <DealersPage onOpenTestDriveModal={handleOpenTestDrive} />
        )}

        {currentView === 'shop' && (
          <ShopPage
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentView === 'experience' && (
          <ExperiencePage
            onOpenTestDriveModal={handleOpenTestDrive}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'saved' && (
          <SavedPage
            savedConfigurations={savedConfigs}
            onRemoveConfiguration={handleRemoveConfiguration}
            onSelectModelForConfig={(model) => setSelectedModelForConfig(model)}
            setCurrentView={setCurrentView}
            onOpenTestDriveModal={handleOpenTestDrive}
          />
        )}
      </main>

      {/* Official Porsche Global Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Book a Test Drive Modal */}
      <TestDriveModal
        isOpen={testDriveModalData.isOpen}
        onClose={handleCloseTestDrive}
        preselectedModel={testDriveModalData.model}
      />
    </div>
  );
}

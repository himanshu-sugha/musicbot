import React from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Hero />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import WaterProcess from './components/WaterProcess';
import About from './components/About';
import StoreLocator from './components/StoreLocator';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import NamibianPride from './components/NamibianPride';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot/ChatBot';
import Loader from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const id = target.getAttribute('href')?.slice(1);
      if (id) {
        e.preventDefault();
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleScroll);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className={`relative transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <section id="home">
            <Hero />
          </section>
          
          <div className="section-padding">
            <section id="products" className="bg-gray-50">
              <div className="container-custom">
                <Products />
              </div>
            </section>

            <section id="namibian-pride">
              <div className="container-custom">
                <NamibianPride />
              </div>
            </section>

            <section id="process">
              <div className="container-custom">
                <WaterProcess />
              </div>
            </section>

            <section id="about" className="bg-gray-50">
              <div className="container-custom">
                <About />
              </div>
            </section>

            <section id="locations" className="bg-gray-50">
              <div className="container-custom">
                <StoreLocator />
              </div>
            </section>

            <section id="faq">
              <div className="container-custom">
                <FAQ />
              </div>
            </section>
          </div>
        </main>
        
        <Contact />
        <Footer />
        <ChatBot />
      </div>
    </>
  );
}

export default App;
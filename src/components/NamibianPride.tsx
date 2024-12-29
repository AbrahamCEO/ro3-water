import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Adobe Stock images
import adobeStock1 from '../assets/AdobeStock_238452334.jpg';
import adobeStock2 from '../assets/AdobeStock_407857499.jpg';

const images = [adobeStock1, adobeStock2];

export default function NamibianPride() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[60vh] overflow-hidden">
      {/* Background Images with Zoom Animation */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: 1, 
            scale: 1.1,
            transition: { 
              opacity: { duration: 1 },
              scale: { duration: 5, ease: "linear" }
            }
          }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1 }
          }}
          className="absolute inset-0"
        >
          <img
            src={images[currentImageIndex]}
            alt="Namibian landscape"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          RO3 Water proudly Namibian
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          className="w-24 h-1 bg-white rounded-full mb-6"
        />
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
          className="text-lg md:text-xl text-white/90 max-w-2xl"
        >
          Bringing pure, refreshing water to our beautiful nation
        </motion.p>
      </div>
    </section>
  );
}

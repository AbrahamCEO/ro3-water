import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import stillWater from '../assets/RO3-Still-Water.png';
import sparklingWater from '../assets/Oasis-sparkling-water-1.png';
import iceProduct from '../assets/R03-2kg-ice.png';
import containers from '../assets/R03-containers.png';
import dispenser from '../assets/Oasis-Water-Dispensers-Cover2-1.png';

const products = [
  {
    id: 1,
    name: 'still water',
    image: stillWater,
    link: '/products/still-water',
    description: 'Experience the pure taste of premium quality water, carefully processed to ensure the highest standards of hydration.'
  },
  {
    id: 2,
    name: 'sparkling water',
    image: sparklingWater,
    link: '/products/sparkling-water',
    description: 'Add some fizz to your life with our premium sparkling water, crafted to quench your thirst and delight your senses.'
  },
  {
    id: 3,
    name: 'ice cubes',
    image: iceProduct,
    link: '/products/ice-cubes',
    description: 'Chill out with our premium ice cubes, made from the purest water and designed to keep your drinks cool and refreshing.'
  },
  {
    id: 4,
    name: 'refill water',
    image: containers,
    link: '/products/refill-water',
    description: 'Refill and recharge with our premium refill water, carefully crafted to provide the best hydration experience.'
  },
  {
    id: 5,
    name: 'water dispensers',
    image: dispenser,
    link: '/products/dispensers',
    description: 'Experience the convenience of our premium water dispensers, designed to provide you with fresh and clean drinking water at all times.'
  }
];

export default function Products() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % products.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % products.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + products.length) % products.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeIn"
      }
    })
  };

  return (
    <section id="products" className="relative min-h-screen bg-white">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-4 py-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#002B5B] mb-4">
            Our Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience pure hydration with our premium water products
          </p>
        </div>

        {/* Product Showcase */}
        <div className="relative h-[500px] w-full max-w-5xl mx-auto overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <div className="grid grid-cols-2 h-full items-center gap-12">
                {/* Left side - Image with Circle */}
                <div className="relative group">
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 bg-blue-50/50 rounded-full transform group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-4 bg-blue-100/30 rounded-full transform group-hover:scale-105 transition-transform duration-700 delay-75" />
                    
                    {/* Product image */}
                    <img
                      src={products[activeIndex].image}
                      alt={products[activeIndex].name}
                      className="absolute inset-0 m-auto max-h-[75%] w-auto object-contain transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="flex flex-col items-start">
                  <span className="text-sm text-blue-600 font-medium tracking-wider uppercase mb-2">
                    Featured Product
                  </span>
                  <h2 className="text-4xl font-bold text-[#002B5B] mb-4">
                    {products[activeIndex].name}
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {products[activeIndex].description || "Experience the pure taste of premium quality water, carefully processed to ensure the highest standards of hydration."}
                  </p>
                  <a
                    href={products[activeIndex].link}
                    className="group inline-flex items-center gap-2 bg-white border-2 border-[#002B5B] text-[#002B5B] px-6 py-2.5 rounded-full 
                             hover:bg-[#002B5B] hover:text-white transition-all duration-300"
                  >
                    Explore Product
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 text-[#002B5B] p-3 rounded-full 
                     shadow-lg hover:bg-[#002B5B] hover:text-white hover:border-[#002B5B] transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 text-[#002B5B] p-3 rounded-full 
                     shadow-lg hover:bg-[#002B5B] hover:text-white hover:border-[#002B5B] transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Product Indicators */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 
                  ${index === activeIndex 
                    ? 'bg-[#002B5B] w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
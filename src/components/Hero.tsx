import { motion } from 'framer-motion';
import desktopVideo from '../assets/desktop-video_1.mp4';
import { ArrowDown, Droplets } from 'lucide-react';

export default function Hero() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          src={desktopVideo}
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-end pb-32 px-4">
        {/* Buttons Container */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Primary CTA */}
          <button
            onClick={scrollToProducts}
            className="group relative px-8 py-4 bg-white text-[#002B5B] rounded-full font-semibold 
                     hover:bg-[#0077B6] hover:text-white transition-all duration-300 
                     shadow-lg hover:shadow-xl hover:shadow-[#0077B6]/20"
          >
            <span className="flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              Explore Our Products
            </span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 
                     text-white rounded-full hover:bg-white/20 transition-all duration-300"
          >
            Learn More
            <ArrowDown className="inline ml-2 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ 
            duration: 1,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <ArrowDown className="w-6 h-6 text-white" />
        </motion.div>
      </div>
    </div>
  );
}
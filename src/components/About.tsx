import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DROP_IMAGE_URL = "https://ro3water.co.na/wp-content/uploads/2023/07/Drop1.png";

// Content for tabs
const content = {
  vision: "Our vision is to revolutionize access to clean water across Southern Africa, making pure, refreshing water available to everyone.",
  mission: [
    "To be Africa’s leading brand for purified water.",
  ],
  philosophy: "We believe that everyone deserves access to clean, safe drinking water. Our philosophy centers on sustainability, innovation, and community empowerment."
};

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const dropVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="about" className="py-24 bg-[#F8FAFC]">
      <motion.div 
        className="container mx-auto px-4 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image and Title */}
          <div className="relative text-center lg:text-left">
            <div className="relative max-w-[400px] mx-auto lg:mx-0">
              <div className="relative h-[500px]">
                {/* Text layers positioned with expanding width */}
                <motion.div 
                  className="absolute inset-0 flex flex-col items-center justify-start pt-20 z-0"
                  variants={itemVariants}
                >
                  <span className="text-[2rem] font-bold text-[#002B5B] mb-2 w-[200px] text-left">
                    Water for
                  </span>
                  <span className="text-[4.5rem] leading-[1] font-bold text-[#002B5B] mb-2 w-[300px] text-center">
                    living
                  </span>
                  <span className="text-[4.5rem] leading-[1] font-bold text-[#002B5B] w-[400px] text-right">
                    better
                  </span>
                </motion.div>
                
                {/* Water drop overlay */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center z-10 translate-y-[50px]"
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <motion.img
                    src={DROP_IMAGE_URL}
                    alt="Water Drop"
                    className="w-[150px]"
                    variants={dropVariants}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <motion.h2 
              variants={itemVariants}
              className="text-[2.5rem] font-bold text-[#002B5B]"
            >
              About RO3 Water
            </motion.h2>

            <motion.div 
              variants={itemVariants}
              className="space-y-4"
            >
              <p className="text-gray-600 leading-relaxed">
                To say we are in the business of bottled water is not untrue, but it's not the entire 
                story! We've combined the idea of bottling drinking water with purified refill water.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We have a passion for providing clean, safe drinking water to everyone, and we believe 
                that by offering both bottled water and refill options, we can make a real difference 
                in people's lives while also being environmentally conscious.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, with more than 360 stores across South Africa, Namibia, Botswana, and 
                Eswatini, we are well on our way to achieving our goals!
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="mt-8">
              <motion.div 
                className="flex flex-wrap gap-2 mb-6"
                variants={itemVariants}
              >
                {['mission', 'vision', 'philosophy'].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-[#002B5B] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab}
                  </motion.button>
                ))}
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-600 min-h-[100px]"
                >
                  {activeTab === 'mission' ? (
                    <motion.ul 
                      className="list-none space-y-2"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {content.mission.map((item, index) => (
                        <motion.li
                          key={index}
                          variants={itemVariants}
                          className="flex items-center gap-2"
                        >
                          <motion.span 
                            className="w-2 h-2 bg-[#002B5B] rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          />
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  ) : (
                    <motion.p
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {content[activeTab]}
                    </motion.p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
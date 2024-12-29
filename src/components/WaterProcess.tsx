import { Filter, Waves, Droplets, CircleDot, Zap, Wind } from 'lucide-react';
import { motion } from 'framer-motion';

const processes = [
  {
    icon: <Filter className="w-8 h-8" />,
    name: 'Sediment filtration',
    description: 'Removes larger particles and sediments from water'
  },
  {
    icon: <Waves className="w-8 h-8" />,
    name: 'Element filtration',
    description: 'Filters out microscopic impurities and particles'
  },
  {
    icon: <Droplets className="w-8 h-8" />,
    name: 'Reverse osmosis',
    description: 'Removes dissolved solids and contaminants'
  },
  {
    icon: <CircleDot className="w-8 h-8" />,
    name: 'Carbon filtration',
    description: 'Eliminates chlorine and improves taste'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    name: 'UV protection',
    description: 'Eliminates harmful bacteria and viruses'
  },
  {
    icon: <Wind className="w-8 h-8" />,
    name: 'Ozonation',
    description: 'Final purification and preservation step'
  },
];

export default function WaterProcess() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#002B5B] mb-6">
            Pure Water, Pure Quality
          </h2>
          <div className="bg-blue-600/10 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-xl text-gray-700">
              Our water goes through a rigorous <span className="font-semibold">6-step purification process</span>,
              ensuring a TDS count of less than 20 compared to Namibia's municipal water TDS of 150+
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processes.map((process, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {process.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {process.name}
                </h3>
                <p className="text-gray-600">
                  {process.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <div className="bg-blue-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Why RO3 Water?
            </h3>
            <p className="text-lg opacity-90">
              We pride ourselves on delivering clean, safe, and great-tasting drinking water. 
              Our advanced purification process removes harmful contaminants including hormones 
              and heavy metals, ensuring the highest quality water for your well-being.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
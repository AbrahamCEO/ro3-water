import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoaderProps {
  onLoadingComplete: () => void;
}

const Loader = ({ onLoadingComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;

    const checkIfImagesAreLoaded = () => {
      loadedImages++;
      const currentProgress = (loadedImages / totalImages) * 100;
      setProgress(currentProgress);

      if (loadedImages === totalImages) {
        setTimeout(() => {
          onLoadingComplete();
        }, 1000); // Add a small delay for smooth transition
      }
    };

    if (totalImages === 0) {
      onLoadingComplete();
      return;
    }

    images.forEach(img => {
      if (img.complete) {
        checkIfImagesAreLoaded();
      } else {
        img.addEventListener('load', checkIfImagesAreLoaded);
        img.addEventListener('error', checkIfImagesAreLoaded); // Handle failed loads
      }
    });

    // Cleanup
    return () => {
      images.forEach(img => {
        img.removeEventListener('load', checkIfImagesAreLoaded);
        img.removeEventListener('error', checkIfImagesAreLoaded);
      });
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="text-4xl font-bold text-blue-600 mb-6"
        >
          RO3 Water
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-blue-600"
          />
        </div>

        {/* Loading Animation */}
        <div className="mt-6">
          <motion.div
            className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;

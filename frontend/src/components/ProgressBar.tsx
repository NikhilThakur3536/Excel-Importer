import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  
  const startProgress = () => {
    setProgress(0); // Reset progress
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Increase progress by 2 every 50ms
      });
    }, 50);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={startProgress}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4"
      >
        Start Progress
      </button>
      
      {/* Progress Bar */}
      <motion.div
        className="w-full bg-gray-300 h-4 rounded-lg overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-full bg-blue-500"></div>
      </motion.div>

      <div className="mt-2 text-sm text-gray-700">{progress}%</div>
    </div>
  );
}

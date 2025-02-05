"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function CircularProgress({ percentage, label }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const controls = useAnimation(); // Declare controls
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (currentPercentage / 100) * circumference;

  useEffect(() => {
    setIsVisible(true);
    controls.start({ value: percentage });

    const increment = setInterval(() => {
      setCurrentPercentage((prev) => {
        if (prev < percentage) {
          return prev + 1;
        } else {
          clearInterval(increment);
          return percentage;
        }
      });
    }, 10); // Adjust speed here

    return () => clearInterval(increment); // Cleanup interval on unmount
  }, [percentage, controls]);

  return (
    <div className="flex flex-col bg-background items-center justify-center">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="stroke-[#1e1e1e] dark:stroke-white"
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            fill="none"
          />
          <motion.circle
            className="stroke-[#FF014F]"
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: isVisible ? strokeDashoffset : circumference }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {currentPercentage}%
          </span>
        </motion.div>
      </div>
      <motion.span
        className="mt-2 text-base sm:text-lg font-medium font-josefin text-gray-900 dark:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {label}
      </motion.span>
    </div>
  );
}

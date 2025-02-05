"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function StatItem({ number, label, duration, index }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = number / ((duration * 1000) / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [number, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-background rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 
                 hover:border-[#FF014F] transition-all duration-300 group flex flex-col items-center justify-center p-6"
    >
      <span className="text-[#FF014F] text-4xl font-playpen font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
        {count}+
      </span>
      <span className="text-gray-600 dark:text-gray-300 text-sm font-josefin uppercase tracking-wider text-center group-hover:text-[#FF014F] transition-colors duration-300">
        {label}
      </span>
    </motion.div>
  );
}

export default function Stats() {
  const statsData = [
    { number: 12, label: "Years of Experience", duration: 2 },
    { number: 97, label: "Completed Projects", duration: 2 },
    { number: 81, label: "Happy Customers", duration: 2 },
    { number: 53, label: "Awards Won", duration: 2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-2 gap-4 w-full max-w-4xl mx-auto"
    >
      {statsData.map((stat, index) => (
        <StatItem
          key={index}
          number={stat.number}
          label={stat.label}
          duration={stat.duration}
          index={index}
        />
      ))}
    </motion.div>
  );
}

"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

const topCompanyLogos = [
  "https://logo.clearbit.com/google.com",
  "https://logo.clearbit.com/amazon.com",
  "https://logo.clearbit.com/apple.com",
  "https://logo.clearbit.com/microsoft.com",
  "https://logo.clearbit.com/facebook.com",
];

const bottomCompanyLogos = [
  "https://logo.clearbit.com/tesla.com",
  "https://logo.clearbit.com/netflix.com",
  "https://logo.clearbit.com/adobe.com",
  "https://logo.clearbit.com/salesforce.com",
  "https://logo.clearbit.com/ibm.com",
];

const SlidingRow = ({ direction, logos }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20, // Adjust duration for speed
          ease: "linear",
        },
      },
    });
  }, [controls, direction]);

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex space-x-16 whitespace-nowrap"
        animate={controls}
        style={{ display: "inline-flex" }} // Ensures logos appear in a single line
      >
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={logo}
              alt={`Client logo ${index + 1}`}
              width={120}
              height={80}
              className="w-auto h-12 object-contain dark:invert opacity-50 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function SlidingLogos() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center space-y-2">
          <p className="text-sm font-medium font-josefin tracking-wider text-[#FF014F] uppercase">
            TRUSTED BY
          </p>
          <h2 className="text-4xl font-playpen font-bold tracking-tight dark:text-white">
            Clients I've Worked With
          </h2>
        </div>

        <div className="space-y-16">
          <SlidingRow direction="left" logos={topCompanyLogos} />
          <SlidingRow direction="right" logos={bottomCompanyLogos} />
        </div>
      </div>
    </section>
  );
}

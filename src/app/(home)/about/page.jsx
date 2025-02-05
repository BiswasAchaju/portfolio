"use client";

import { motion } from "framer-motion";
import CircularProgress from "./_components/Circular-progress";
import Stats from "./_components/StatsAbout";
import TimelineSections from "./_components/Timeline";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const personalInfo = [
  { label: "Name", value: "Suman Acharya" },
  { label: "Nationality", value: "Neplease" },
  {
    label: "Freelance",
    value: <span className="text-[#FF014F]">Available</span>,
  },
  { label: "Address", value: "Kathmandu, Nepal" },
  { label: "Phone", value: "+977 9815029324" },
  { label: "Email", value: "acharyas186@gmail.com" },
];

const skills = [
  { label: "HTML", percentage: 25 },
  { label: "JAVASCRIPT", percentage: 89 },
  { label: "CSS", percentage: 70 },
  { label: "PHP", percentage: 66 },
  { label: "WORDPRESS", percentage: 95 },
  { label: "JQUERY", percentage: 50 },
  { label: "ANGULAR", percentage: 65 },
  { label: "REACT", percentage: 45 },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-white">
      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="pt-20 px-4 md:px-8"
      >
        <div className="max-w-7xl mb-10 mx-auto mt-7">
          <h1 className="text-4xl md:text-6xl font-bold font-playpen text-center mb-16 md:mb-20 mt-10 text-black dark:text-white">
            ABOUT <span className="">ME</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold font-playpen mb-10 text-[#FF014F]">
                PERSONAL INFOS
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {personalInfo.map((info, index) => (
                  <p key={index} className="mb-1">
                    <span className="text-gray-400 font-josefin">
                      {info.label}:{" "}
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {info.value}
                    </span>
                  </p>
                ))}
              </div>
              {/* <Button className="mt-8 bg-[#FF014F] hover:bg-[#FF014F]/90">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button> */}
               <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="mt-10 bg-gradient-to-r from-[#FF014F] to-[#FF6B6B] font-josefin text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg glow-effect"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </Button>
              </motion.div>
            </div>
            <Stats />
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="py-20 px-4 md:px-8 bg-background"
      >
        <TimelineSections />
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="pt-12 pb-28 px-4 md:px-8 bg-background"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 font-playpen text-[#FF014F]">
            MY SKILLS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {skills.map((skill) => (
              <CircularProgress
                key={skill.label}
                percentage={skill.percentage}
                label={skill.label}
              />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

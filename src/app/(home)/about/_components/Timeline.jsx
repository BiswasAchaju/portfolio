"use client"

import { motion } from "framer-motion"

const experienceData = [
  {
    period: "2017 - 2019",
    title: "WEB DESIGNER",
    company: "ENVATO",
    description: "Led the design and implementation of responsive web interfaces, collaborating with cross-functional teams to deliver exceptional user experiences."
  },
  {
    period: "2014 - 2017",
    title: "WEB DEVELOPER",
    company: "TWITTER",
    description: "Developed and maintained high-traffic web applications, implementing modern JavaScript frameworks and optimizing performance."
  },
  {
    period: "2010 - 2014",
    title: "CONSULTANT",
    company: "GOOGLE",
    description: "Provided technical consultation for enterprise clients, developing solutions for complex business requirements and improving system architectures."
  }
]

const educationData = [
  {
    period: "2007 - 2010",
    title: "ENGINEERING DEGREE",
    institution: "ISTANBUL UNIVERSITY",
    description: "Specialized in software engineering with focus on web technologies and distributed systems architecture."
  },
  {
    period: "2005 - 2007",
    title: "MASTERS DEGREE",
    institution: "PARIS UNIVERSITY",
    description: "Advanced studies in computer science, focusing on artificial intelligence and machine learning applications."
  },
  {
    period: "2001 - 2005",
    title: "BACHELOR DEGREE",
    institution: "MOSCOW HIGH SCHOOL",
    description: "Fundamental studies in computer science and mathematics, with emphasis on algorithmic thinking and problem-solving."
  }
]

const TimelineItem = ({ data, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-0 h-full w-[2px] bg-[#FF014F] dark:bg-[#FF014F]">
        <div className="absolute -left-[5px] top-[10px] h-3 w-3 rounded-full bg-[#FF014F] dark:bg-[#FF014F] ring-2 ring-background dark:ring-gray-900" />
      </div>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <span>{data.period}</span>
      </div>
      <div className="mt-2">
        <h3 className="text-md font-semibold tracking-wide text-gray-900 dark:text-white font-josefin ">
          {data.title} <span className="mx-2 text-gray-500 dark:text-gray-400">—</span> {data.company || data.institution}
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-500 ">{data.description}</p>
      </div>
    </motion.div>
  )
}

export default function TimelineSections() {
  return (
    <div className="w-full bg-background pt-20 pb-10">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-12 tracking-tight font-playpen text-[#FF014F]"
            >
              EXPERIENCE
            </motion.h2>
            <div className="space-y-6">
              {experienceData.map((item, index) => (
                <TimelineItem key={index} data={item} index={index} />
              ))}
            </div>
          </div>
          
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-12 tracking-tight font-playpen text-[#FF014F]"
            >
              EDUCATION
            </motion.h2>
            <div className="space-y-6">
              {educationData.map((item, index) => (
                <TimelineItem key={index} data={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


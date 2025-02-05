"use client"

import { motion } from "framer-motion"
import { Palette, Globe, Smartphone, Megaphone } from 'lucide-react'

const services = [
  {
    icon: Palette,
    title: "Graphics Design",
    description: "Develop the Visual Identity of Your Business.",
    bgColor: "bg-[#f8f9d7]",
    iconBg: "bg-[#8cc751]",
  },
  {
    icon: Globe,
    title: "Web Design",
    description: "Connect With Your Users, Not Just Your Business.",
    bgColor: "bg-[#ffe6e6]",
    iconBg: "bg-[#fb5b71]",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "We Develop the Visual Identity of Your Business.",
    bgColor: "bg-[#e6f8ff]",
    iconBg: "bg-[#58b7e6]",
  },
  {
    icon: Megaphone,
    title: "Seo & Marketing",
    description: "Taking your site at the top of Google's ranking.",
    bgColor: "bg-[#e6ffe6]",
    iconBg: "bg-[#f8b720]",
  },
]

const ServiceCard = ({ icon: Icon, title, description, bgColor, iconBg }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-3xl p-8 ${bgColor} border border-gray-200 shadow-lg`}  // Added shadow-lg
    >
      <div className="flex flex-col items-center text-center space-y-4 cursor-pointer">
        <div className={`p-4 rounded-full bg-white shadow-lg`}> {/* Added shadow-lg to the icon wrapper */}
          <Icon className={`w-8 h-8 ${iconBg} text-white rounded-full p-1`} />
        </div>
        <h3 className="text-2xl font-semibold font-josefin text-[#FF014F]">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="space-y-4 text-center mb-16">
          <h4 className="text-sm font-medium tracking-wider text-[#FF014F] uppercase font-josefin ">SERVICES</h4>
          <h2 className="text-4xl font-bold font-playpen">What We Offer</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

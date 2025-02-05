"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, MessageSquare, Smartphone, Wifi, Settings } from 'lucide-react';
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: MessageSquare,
    title: "Business Strategy",
    description: "I throw myself down among the tall grass by the stream as I lie close to the earth.",
  },
  {
    icon: BookOpen,
    title: "App Development",
    description: "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence.",
  },
  {
    icon: Settings,
    title: "App Development",
    description: "I throw myself down among the tall grass by the stream as I lie close to the earth.",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority.",
  },
  {
    icon: Wifi,
    title: "CEO Marketing",
    description: "always free from repetition, injected humour, or non-characteristic words etc.",
  },
  {
    icon: Settings,
    title: "Personal Portfolio April",
    description: "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence.",
  },
];

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative cursor-pointer h-full p-8 overflow-hidden group bg-card hover:bg-accent transition-colors">
        <div className="space-y-4">
          <Icon className="w-12 h-12 text-[#FF014F]" />
          <h3 className="text-2xl font-semibold font-poppins">{title}</h3>
          <p className="text-muted-foreground font-inter">{description}</p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100"
        >
          <ArrowRight className="w-6 h-6 text-[#FF014F]" />
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default function FeaturesGrid() {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-7xl px-4 mx-auto">
        <div className="space-y-4 text-left mb-16">
          <p className="text-sm font-medium tracking-wider text-[#FF014F] uppercase font-josefin">FEATURES</p>
          <h2 className="text-5xl font-bold tracking-tight font-playpen">What I Do</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Code, Paintbrush, WorkflowIcon as Wordpress, FileCode, Database, Terminal } from 'lucide-react'

const categories = [
  { name: "JavaScript", icon: Code },
  { name: "Product Design", icon: Paintbrush },
  { name: "Wordpress", icon: Wordpress },
  { name: "HTML to React", icon: FileCode },
  { name: "React To Laravel", icon: Database },
  { name: "Python", icon: Terminal }
]

const clients = [
  {
    id: 1,
    name: "John Due",
    logo: "/placeholder.svg?height=100&width=100",
    categories: ["JavaScript", "Product Design"]
  },
  {
    id: 2,
    name: "Smiths Marth",
    logo: "/placeholder.svg?height=100&width=100",
    categories: ["JavaScript", "Wordpress"]
  },
  {
    id: 3,
    name: "Add Dev",
    logo: "/placeholder.svg?height=100&width=100",
    categories: ["HTML to React", "Python"]
  },
  {
    id: 4,
    name: "Jone Due",
    logo: "/placeholder.svg?height=100&width=100",
    categories: ["React To Laravel", "JavaScript"]
  },
  {
    id: 5,
    name: "John Due",
    logo: "/placeholder.svg?height=100&width=100",
    categories: ["Product Design", "Python"]
  },
  {
    id: 6,
    name: "Adon Smith",
    logo: "/placeholder.svg?height=100&width=100",
    categories: ["Wordpress", "JavaScript"]
  },
  {
    id: 7,
    name: "Smitha Mila",
    logo: "/placeholder.svg?height=100&width=100",
    categories: ["HTML to React", "Product Design"]
  },
  {
    id: 8,
    name: "Sultana Mila",
    logo: "/placeholder.svg?height=100&width=100",
    categories: ["React To Laravel", "Python"]
  },
  {
    id: 9,
    name: "Jannat",
    logo: "/placeholder.svg?height=100&width=100",
    categories: ["JavaScript", "Wordpress"]
  },
]

export default function ClientGrid() {
  const [selectedCategory, setSelectedCategory] = useState("JavaScript")

  const filteredClients = selectedCategory === "all" 
    ? clients 
    : clients.filter(client => client.categories.includes(selectedCategory))

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center space-y-2">
          <p className="text-sm font-medium font-josefin tracking-wider text-[#FF014F] uppercase">
            POPULAR CLIENTS
          </p>
          <h2 className="text-4xl font-playpen font-bold tracking-tight">
            Awesome Clients
          </h2>
        </div>

        <div className="lg:grid lg:grid-cols-[200px,1fr] gap-8">
          <div className="mb-8 lg:mb-0 lg:sticky lg:top-20 lg:self-start">
            <ScrollArea className="w-full whitespace-nowrap lg:whitespace-normal">
              <Tabs
                defaultValue="JavaScript"
                orientation="vertical"
                className="w-full"
                onValueChange={setSelectedCategory}
              >
                <TabsList className="h-auto flex lg:flex-col items-stretch bg-transparent space-x-2 lg:space-x-0 lg:space-y-1">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.name}
                      value={category.name}
                      className="flex items-center justify-start px-4 py-3 text-left data-[state=active]:bg-card data-[state=active]:text-[#FF014F] transition-all"
                    >
                      <category.icon className="w-5 h-5 mr-2 lg:mr-3" />
                      <span className="hidden lg:inline">{category.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <ScrollBar orientation="horizontal" className="lg:hidden" />
            </ScrollArea>
          </div>

          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
            <AnimatePresence mode="wait">
              {filteredClients.map((client) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="relative p-4 bg-card rounded-lg transition-all hover:border-[#FF014F] border border-border">
                    <div className="aspect-square relative mb-2 w-16 h-16 mx-auto">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        className="object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <h3 className="text-center text-sm font-medium">
                      {client.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}


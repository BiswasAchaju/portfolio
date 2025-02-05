"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Github, ExternalLink, X } from 'lucide-react'
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

const projects = [
  {
    id: 1,
    title: "The services provide for design",
    category: "DEVELOPMENT",
    type: "coding", 
    likes: 600,
    image: "/placeholder.svg?height=600&width=800",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate distinctio assumenda explicabo veniam temporibus eligendi.",
    longDescription: "Consectetur adipisicing elit. Cupiditate distinctio assumenda dolorum alias suscipit rerum maiores aliquam earum edit, nihil culpa quas iusto hic minus!",
    github: "https://github.com/yourusername/project1",
    liveUrl: "https://project1.com"
  },
  {
    id: 2,
    title: "Mobile app landing design & app maintain",
    category: "APPLICATION",
    type: "coding",
    likes: 750,
    image: "/placeholder.svg?height=600&width=800",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    longDescription: "Consectetur adipisicing elit. Cupiditate distinctio assumenda dolorum alias suscipit rerum maiores aliquam earum edit, nihil culpa quas iusto hic minus!",
    github: "https://github.com/yourusername/project2",
    liveUrl: "https://project2.com"
  },
  {
    id: 3,
    title: "Logo design creativity & Application",
    category: "PHOTOSHOP",
    type: "wordpress",
    likes: 630,
    image: "/placeholder.svg?height=600&width=800",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    longDescription: "Consectetur adipisicing elit. Cupiditate distinctio assumenda dolorum alias suscipit rerum maiores aliquam earum edit, nihil culpa quas iusto hic minus!",
    liveUrl: "https://project3.com"
  },
  // Add more projects as needed
]

export default function PortfolioGrid() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState("all")
  const [likedProjects, setLikedProjects] = useState([])

  const filteredProjects = projects.filter(project => 
    filter === "all" || project.type === filter
  )

  const handleLike = (projectId) => {
    setLikedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )
  }

  return (
   
      
        <section className="py-12 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16 space-y-2">
              <p className="text-sm font-josefin font-medium tracking-wider text-[#FF014F] uppercase">
                VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK
              </p>
              <h2 className="text-6xl font-playpen font-bold tracking-tight">
                My Portfolio
              </h2>
            </div>

            <Tabs
              defaultValue="all"
              className="w-full mb-12"
              onValueChange={setFilter}
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="coding">Coding</TabsTrigger>
                <TabsTrigger value="wordpress">WordPress</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-lg bg-card cursor-pointer">
                      <div
                        className="cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="object-cover w-full aspect-video transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-[#FF014F]">
                            {project.category}
                          </span>
                          <button
                            onClick={() => handleLike(project.id)}
                            className="flex items-center space-x-1 text-sm"
                          >
                            <Heart
                              className={cn(
                                "w-4 h-4 transition-colors",
                                likedProjects.includes(project.id)
                                  ? "fill-[#FF014F] text-[#FF014F]"
                                  : "text-muted-foreground"
                              )}
                            />
                            <span className="text-muted-foreground">
                              {project.likes + (likedProjects.includes(project.id) ? 1 : 0)}
                            </span>
                          </button>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex items-center space-x-4">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-[#FF014F] transition-colors"
                            >
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-[#FF014F] transition-colors"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-[#FF014F] block">
                      {selectedProject?.category}
                    </span>
                    <span className="text-2xl font-bold">
                      {selectedProject?.title}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              {selectedProject && (
                <div className="space-y-6">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={800}
                    height={500}
                    className="rounded-lg object-cover w-full aspect-video"
                  />
                  <p className="text-muted-foreground">
                    {selectedProject.longDescription}
                  </p>
                  <div className="flex justify-between items-center">
                    <Button
                      onClick={() => handleLike(selectedProject.id)}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <Heart
                        className={cn(
                          "w-4 h-4",
                          likedProjects.includes(selectedProject.id)
                            ? "fill-[#FF014F] text-[#FF014F]"
                            : ""
                        )}
                      />
                      <span>Like this</span>
                    </Button>
                    <Button asChild>
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </section>
      
  )
}


"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronRight } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import projectsData from "@/data/projects.json"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null)

  // Default projects if data is not available
  const defaultProjects = {
    projects: [
      {
        id: "project1",
        title: "E-commerce Platform",
        description:
          "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
        shortDescription: "Modern e-commerce solution with React and Node.js",
        image: "/placeholder.svg?height=600&width=800",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
        liveUrl: "https://example.com/ecommerce",
        githubUrl: "https://github.com/username/ecommerce",
        features: [
          "User authentication and authorization",
          "Product catalog with search and filtering",
          "Shopping cart and checkout process",
          "Payment processing with Stripe",
          "Order history and tracking",
        ],
      },
      {
        id: "project2",
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates and team workspaces.",
        shortDescription: "Trello-like task management with drag-and-drop functionality",
        image: "/placeholder.svg?height=600&width=800",
        technologies: ["React", "Firebase", "Material UI", "Redux"],
        liveUrl: "https://example.com/taskapp",
        githubUrl: "https://github.com/username/taskapp",
        features: [
          "Drag-and-drop task management",
          "Real-time collaboration",
          "Team workspaces and permissions",
          "Task comments and attachments",
          "Deadline notifications",
        ],
      },
      {
        id: "project3",
        title: "Weather Dashboard",
        description: "A weather dashboard that displays current and forecasted weather data for multiple locations.",
        shortDescription: "Weather visualization with OpenWeather API",
        image: "/placeholder.svg?height=600&width=800",
        technologies: ["React", "Chart.js", "OpenWeather API", "Tailwind CSS"],
        liveUrl: "https://example.com/weather",
        githubUrl: "https://github.com/username/weather",
        features: [
          "Current weather conditions",
          "5-day weather forecast",
          "Location search and favorites",
          "Interactive weather maps",
          "Weather alerts and notifications",
        ],
      },
    ],
  }

  const projects = projectsData.projects?.length ? projectsData : defaultProjects

  return (
    <section id="projects" className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <SectionHeading title="Projects" subtitle="My recent work" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.projects.map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </div>
          ))}
        </div>
      </div>

      <ProjectDialog project={selectedProject} open={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}

function ProjectCard({ project, onClick }: { project: any; onClick: () => void }) {
  return (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.shortDescription}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 3).map((tech: string, index: number) => (
            <Badge key={index} variant="secondary">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && <Badge variant="outline">+{project.technologies.length - 3}</Badge>}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {project.liveUrl && (
              <Button size="icon" variant="ghost" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Live Demo</span>
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button size="icon" variant="ghost" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub Repository</span>
                </a>
              </Button>
            )}
          </div>

          <Button variant="ghost" size="sm" onClick={onClick} className="gap-1">
            Details
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectDialog({ project, open, onClose }: { project: any; open: boolean; onClose: () => void }) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.shortDescription}</DialogDescription>
        </DialogHeader>

        <div className="relative h-64 w-full overflow-hidden rounded-md">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        </div>

        <div className="space-y-4">
          <p>{project.description}</p>

          <div>
            <h4 className="font-medium mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {project.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            {project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

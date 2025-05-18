"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Folder } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import lessProjectsData from "@/data/less-important-projects.json"

export default function LessImportantProjects() {
  // Default projects if data is not available
  const defaultProjects = {
    projects: [
      {
        id: "minor1",
        title: "URL Shortener",
        description: "A simple URL shortening service built with Node.js and MongoDB.",
        technologies: ["Node.js", "Express", "MongoDB"],
        githubUrl: "https://github.com/username/url-shortener",
      },
      {
        id: "minor2",
        title: "Markdown Note Taking App",
        description: "A browser-based markdown editor with local storage persistence.",
        technologies: ["React", "Markdown", "LocalStorage"],
        githubUrl: "https://github.com/username/markdown-notes",
        liveUrl: "https://example.com/markdown-notes",
      },
      {
        id: "minor3",
        title: "Recipe Finder",
        description: "A web app that helps users find recipes based on available ingredients.",
        technologies: ["JavaScript", "API Integration", "CSS Grid"],
        githubUrl: "https://github.com/username/recipe-finder",
      },
      {
        id: "minor4",
        title: "Budget Calculator",
        description: "A simple budget tracking application with expense categories and visualizations.",
        technologies: ["React", "Chart.js", "CSS"],
        githubUrl: "https://github.com/username/budget-calc",
        liveUrl: "https://example.com/budget-calc",
      },
      {
        id: "minor5",
        title: "Weather Widget",
        description: "A reusable weather widget component that can be embedded in any website.",
        technologies: ["JavaScript", "Weather API", "CSS"],
        githubUrl: "https://github.com/username/weather-widget",
      },
      {
        id: "minor6",
        title: "Portfolio Template",
        description: "A customizable portfolio template for developers to showcase their work.",
        technologies: ["HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/username/portfolio-template",
        liveUrl: "https://example.com/portfolio-template",
      },
    ],
  }

  const projects = lessProjectsData.projects?.length ? lessProjectsData : defaultProjects

  return (
    <section id="less-important-projects" className="py-20 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto">
        <SectionHeading title="Other Projects" subtitle="Small but noteworthy projects" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.projects.map((project) => (
            <div key={project.id}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Folder className="h-6 w-6" />
                    </div>
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
                  </div>

                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                </CardContent>

                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

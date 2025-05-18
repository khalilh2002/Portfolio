"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import experienceData from "@/data/experience.json"

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Default experience if data is not available
  const defaultExperience = {
    jobs: [
      {
        id: "job1",
        title: "Senior Frontend Developer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
        startDate: "Jan 2021",
        endDate: "Present",
        description:
          "Leading the frontend development team in building modern web applications using React, TypeScript, and Next.js.",
        responsibilities: [
          "Architected and implemented responsive UI components using React and TypeScript",
          "Improved application performance by 40% through code optimization and lazy loading",
          "Mentored junior developers and conducted code reviews to ensure code quality",
        ],
        technologies: ["React", "TypeScript", "Next.js", "Redux", "Tailwind CSS"],
      },
      {
        id: "job2",
        title: "Full Stack Developer",
        company: "Digital Innovations",
        location: "Boston, MA",
        startDate: "Mar 2018",
        endDate: "Dec 2020",
        description: "Worked on full stack development for e-commerce applications using Java Spring Boot and React.",
        responsibilities: [
          "Developed RESTful APIs using Java Spring Boot",
          "Built responsive frontend interfaces with React and Material UI",
          "Implemented authentication and authorization using OAuth 2.0",
        ],
        technologies: ["Java", "Spring Boot", "React", "MySQL", "Docker"],
      },
      {
        id: "job3",
        title: "Junior Developer",
        company: "WebCraft Studios",
        location: "Seattle, WA",
        startDate: "Jun 2016",
        endDate: "Feb 2018",
        description: "Assisted in the development of web applications for various clients.",
        responsibilities: [
          "Implemented UI designs using HTML, CSS, and JavaScript",
          "Fixed bugs and improved existing features",
          "Collaborated with designers to ensure pixel-perfect implementation",
        ],
        technologies: ["HTML", "CSS", "JavaScript", "jQuery", "PHP"],
      },
    ],
  }

  const experience = experienceData.jobs?.length ? experienceData : defaultExperience

  return (
    <section id="experience" className="py-20 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto">
        <SectionHeading title="Experience" subtitle="My professional journey" />

        <div className="mt-12 space-y-8">
          {experience.jobs.map((job) => (
            <div key={job.id}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="p-6 cursor-pointer" onClick={() => toggleExpand(job.id)}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {job.startDate} - {job.endDate}
                        </span>
                      </div>
                    </div>

                    <p className="text-muted-foreground">{job.description}</p>
                  </div>

                  {expandedId === job.id && (
                    <div className="px-6 pb-6 pt-2 border-t">
                      <h4 className="font-medium mb-2">Key Responsibilities:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                        {job.responsibilities.map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>

                      <h4 className="font-medium mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

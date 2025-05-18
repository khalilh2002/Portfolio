"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SectionHeading from "@/components/section-heading"
import skillsData from "@/data/skills.json"

// Import all icons from Lucide React
import * as LucideIcons from "lucide-react"

export default function Skills() {
  const [activeTab, setActiveTab] = useState("all")

  // Get icon component by name
  const getIconByName = (name: string) => {
    const iconName = name as keyof typeof LucideIcons
    const IconComponent = LucideIcons[iconName] || LucideIcons.Code
    return <IconComponent className="h-6 w-6" />
  }

  // Default skills if data is not available
  const defaultSkills = {
    categories: [
      {
        name: "Frontend",
        skills: [
          { name: "React", level: 90, icon: "React" },
          { name: "JavaScript", level: 85, icon: "FileJson" },
          { name: "HTML/CSS", level: 90, icon: "FileCode" },
        ],
      },
      {
        name: "Backend",
        skills: [
          { name: "Java", level: 80, icon: "Coffee" },
          { name: "Spring", level: 75, icon: "Leaf" },
          { name: "Node.js", level: 70, icon: "Server" },
        ],
      },
      {
        name: "Tools",
        skills: [
          { name: "Git", level: 85, icon: "GitBranch" },
          { name: "Docker", level: 70, icon: "Container" },
          { name: "AWS", level: 65, icon: "Cloud" },
        ],
      },
    ],
  }

  const skills = skillsData.categories?.length ? skillsData : defaultSkills

  return (
    <section id="skills" className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <SectionHeading title="Skills" subtitle="My technical expertise" />

        <Tabs defaultValue="all" className="mt-12" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              {skills.categories.map((category) => (
                <TabsTrigger key={category.name} value={category.name.toLowerCase()}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.categories.flatMap((category) =>
                category.skills.map((skill, index) => (
                  <div key={`${category.name}-${skill.name}`}>
                    <SkillCard skill={skill} getIconByName={getIconByName} />
                  </div>
                )),
              )}
            </div>
          </TabsContent>

          {skills.categories.map((category) => (
            <TabsContent key={category.name} value={category.name.toLowerCase()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.skills.map((skill, index) => (
                  <div key={`${category.name}-${skill.name}`}>
                    <SkillCard skill={skill} getIconByName={getIconByName} />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

function SkillCard({
  skill,
  getIconByName,
}: {
  skill: { name: string; level: number; icon: string }
  getIconByName: (name: string) => JSX.Element
}) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 rounded-full bg-primary/10 text-primary">{getIconByName(skill.icon)}</div>
          <div>
            <h3 className="font-medium">{skill.name}</h3>
            <Badge variant="outline" className="mt-1">
              {skill.level >= 80 ? "Expert" : skill.level >= 60 ? "Advanced" : "Intermediate"}
            </Badge>
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: `${skill.level}%` }} />
        </div>
      </CardContent>
    </Card>
  )
}

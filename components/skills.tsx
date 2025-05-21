"use client"

import { useState, useRef, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import SectionHeading from "@/components/section-heading"
import skillsData from "@/data/skills.json"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

// Import all icons from Lucide React
import * as LucideIcons from "lucide-react"

export default function Skills() {
  const [activeTab, setActiveTab] = useState("all")
  const [visibleSkills, setVisibleSkills] = useState(8)
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const tabsListRef = useRef<HTMLDivElement>(null)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    width: 0,
  })
  const [showScrollButtons, setShowScrollButtons] = useState({
    left: false,
    right: false,
  })

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

  // Get all skills for the "All" tab
  const allSkills = skills.categories.flatMap((category) =>
    category.skills.map((skill) => ({
      ...skill,
      category: category.name,
    })),
  )

  // Update highlight position when tab changes
  useEffect(() => {
    const updateHighlight = () => {
      const currentTabRef = tabRefs.current[activeTab]
      if (currentTabRef) {
        const { offsetLeft, offsetWidth } = currentTabRef
        setHighlightStyle({
          left: offsetLeft,
          width: offsetWidth,
        })

        // Scroll to make active tab visible
        if (tabsContainerRef.current) {
          const container = tabsContainerRef.current
          const tabElement = currentTabRef

          // Calculate the scroll position to center the tab
          const scrollLeft = tabElement.offsetLeft - container.offsetWidth / 2 + tabElement.offsetWidth / 2

          // Smooth scroll to the position
          container.scrollTo({
            left: Math.max(0, scrollLeft),
            behavior: "smooth",
          })
        }
      }
    }

    updateHighlight()

    // Also update on window resize to handle responsive changes
    window.addEventListener("resize", updateHighlight)
    return () => window.removeEventListener("resize", updateHighlight)
  }, [activeTab])

  // Check if scroll buttons should be shown
  useEffect(() => {
    const checkScrollButtons = () => {
      if (tabsContainerRef.current) {
        const container = tabsContainerRef.current
        setShowScrollButtons({
          left: container.scrollLeft > 0,
          right: container.scrollLeft < container.scrollWidth - container.clientWidth - 5, // 5px buffer
        })
      }
    }

    // Initial check
    checkScrollButtons()

    // Add scroll event listener to update button visibility
    const container = tabsContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScrollButtons)
      return () => container.removeEventListener("scroll", checkScrollButtons)
    }
  }, [])

  // Reset visible skills count when changing tabs
  useEffect(() => {
    setVisibleSkills(8)
  }, [activeTab])

  // Ensure tabs start at the beginning on initial load
  useEffect(() => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollLeft = 0
    }
  }, [])

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Load more skills
  const handleLoadMore = () => {
    setVisibleSkills((prev) => prev + 8)
  }

  // Scroll tabs left or right
  const scrollTabs = (direction: "left" | "right") => {
    if (tabsContainerRef.current) {
      const container = tabsContainerRef.current
      const scrollAmount = container.clientWidth * 0.5 // Scroll by half the container width

      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="skills" className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <SectionHeading title="Skills" subtitle="My technical expertise" />

        <Tabs defaultValue="all" className="mt-12" onValueChange={handleTabChange}>
          <div className="relative flex justify-center mb-8">
            {/* Left scroll button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 md:hidden",
                !showScrollButtons.left && "opacity-0 pointer-events-none",
              )}
              onClick={() => scrollTabs("left")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Tabs container with horizontal scroll */}
            <div
              ref={tabsContainerRef}
              className="overflow-x-auto scrollbar-hide max-w-full px-10 md:px-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <TabsList ref={tabsListRef} className="relative flex-nowrap">
                {/* Tab highlight background that follows the selected tab */}
                <div
                  className="absolute h-[85%] top-[7.5%] bg-primary/10 dark:bg-primary/20 rounded-md transition-all duration-300 ease-out"
                  style={{
                    width: `${highlightStyle.width}px`,
                    left: `${highlightStyle.left}px`,
                  }}
                />
                <TabsTrigger
                  value="all"
                  ref={(el) => (tabRefs.current["all"] = el)}
                  className={cn(
                    "relative z-10 transition-all duration-300 whitespace-nowrap",
                    activeTab === "all" ? "text-primary font-medium" : "",
                  )}
                >
                  All
                </TabsTrigger>
                {skills.categories.map((category) => (
                  <TabsTrigger
                    key={category.name}
                    value={category.name.toLowerCase()}
                    ref={(el) => (tabRefs.current[category.name.toLowerCase()] = el)}
                    className={cn(
                      "relative z-10 transition-all duration-300 whitespace-nowrap",
                      activeTab === category.name.toLowerCase() ? "text-primary font-medium" : "",
                    )}
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Right scroll button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 md:hidden",
                !showScrollButtons.right && "opacity-0 pointer-events-none",
              )}
              onClick={() => scrollTabs("right")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <TabsContent value="all" className="animate-in fade-in-50 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allSkills.slice(0, visibleSkills).map((skill, index) => (
                <div
                  key={`${skill.category}-${skill.name}`}
                  className="animate-in fade-in-50 slide-in-from-bottom-5 duration-500"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                    animation: `fadeSlideIn 0.5s ease-out ${index * 100}ms forwards`,
                  }}
                >
                  <SkillCard skill={skill} getIconByName={getIconByName} category={skill.category} />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {allSkills.length > visibleSkills && (
              <div className="flex justify-center mt-10 animate-pulse-slow">
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  size="lg"
                  className="group transition-all duration-300 hover:bg-primary/5"
                >
                  <span>Load More</span>
                  <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                </Button>
              </div>
            )}
          </TabsContent>

          {skills.categories.map((category) => (
            <TabsContent
              key={category.name}
              value={category.name.toLowerCase()}
              className="animate-in fade-in-50 duration-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.skills.slice(0, visibleSkills).map((skill, index) => (
                  <div
                    key={`${category.name}-${skill.name}`}
                    className="animate-in fade-in-50 slide-in-from-bottom-5 duration-500"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      opacity: 0,
                      animation: `fadeSlideIn 0.5s ease-out ${index * 150}ms forwards`,
                    }}
                  >
                    <SkillCard skill={skill} getIconByName={getIconByName} category={category.name} />
                  </div>
                ))}
              </div>

              {/* Load More Button for category tabs */}
              {category.skills.length > visibleSkills && (
                <div className="flex justify-center mt-10 animate-pulse-slow">
                  <Button
                    onClick={handleLoadMore}
                    variant="outline"
                    size="lg"
                    className="group transition-all duration-300 hover:bg-primary/5"
                  >
                    <span>Load More</span>
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

interface SkillCardProps {
  skill: { name: string; level: number; icon: string }
  getIconByName: (name: string) => JSX.Element
  category: string
}

function SkillCard({ skill, getIconByName, category }: SkillCardProps) {
  const progressRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay before starting the progress bar animation
          setTimeout(() => {
            setIsVisible(true)
          }, 300)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (progressRef.current) {
      observer.observe(progressRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Card
      ref={cardRef}
      className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-[1.02] group"
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
            {getIconByName(skill.icon)}
          </div>
          <div>
            <h3 className="font-medium">{skill.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="transition-all duration-300 group-hover:bg-primary/5">
                {skill.level >= 80 ? "Expert" : skill.level >= 60 ? "Advanced" : "Intermediate"}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            </div>
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-2 overflow-hidden" ref={progressRef}>
          <div
            className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: isVisible ? `${skill.level}%` : "0%",
              transitionDelay: "300ms",
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

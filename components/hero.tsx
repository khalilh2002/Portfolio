"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import personalData from "@/data/personal.json"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const roles = personalData.roles || ["Frontend Developer", "UI/UX Designer", "Problem Solver"]

  useEffect(() => {
    const role = roles[currentIndex % roles.length]
    let charIndex = 0
    let typingInterval: NodeJS.Timeout

    // Typing effect
    const typeText = () => {
      if (charIndex <= role.length) {
        setTypedText(role.substring(0, charIndex))
        charIndex++
      } else {
        clearInterval(typingInterval)

        // Wait before erasing
        setTimeout(() => {
          eraseText()
        }, 2000)
      }
    }

    // Erasing effect
    const eraseText = () => {
      const eraseInterval = setInterval(() => {
        if (charIndex > 0) {
          charIndex--
          setTypedText(role.substring(0, charIndex))
        } else {
          clearInterval(eraseInterval)
          setCurrentIndex((prev) => prev + 1)
        }
      }, 50)
    }

    typingInterval = setInterval(typeText, 100)

    return () => {
      clearInterval(typingInterval)
    }
  }, [currentIndex, roles])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 md:px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 z-0" />
      <div className="z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4">
          {personalData.name || "John Doe"}
        </h1>
        <div className="h-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-medium mb-8">
            I am a <span className="text-primary">{typedText}</span>
            <span className="animate-blink">|</span>
          </h2>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {personalData.shortBio || "Passionate about creating beautiful, functional, and user-friendly applications."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={scrollToAbout}>
            Learn More
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={personalData.resumeUrl || "#"} target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 animate-bounce">
        <Button variant="ghost" size="icon" onClick={scrollToAbout}>
          <ArrowDown className="h-6 w-6" />
          <span className="sr-only">Scroll Down</span>
        </Button>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import personalData from "@/data/personal.json"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Navigation items
  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  // Handle scroll event to change header style and detect active section
  useEffect(() => {
    const handleScroll = () => {
      // Update header style based on scroll position
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Determine active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1))

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // If the top of the element is less than 200px from the top of the viewport
          // or if we're at the bottom of the page and this is the last section
          if (
            rect.top <= 200 ||
            (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && section === sections[0])
          ) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  // Close mobile menu when clicking a nav link
  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4",
          isMobileMenuOpen && "bg-background/80 backdrop-blur-md",
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo/Name */}
            <Link
              href="#home"
              className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
              onClick={handleNavClick}
            >
              {personalData.name || "John Doe"}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant={activeSection === item.href.substring(1) ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className={cn(
                    "text-base transition-all duration-200",
                    activeSection === item.href.substring(1) && "font-medium",
                  )}
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
              <ThemeToggle />
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden gap-2 pr-1">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                className="relative z-50 p-1"
              >
                <div className="relative w-5 h-5">
                  <span
                    className={cn(
                      "absolute block h-0.5 bg-foreground rounded-full transition-all duration-300 w-5",
                      isMobileMenuOpen ? "rotate-45 top-2" : "top-1",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute block h-0.5 bg-foreground rounded-full transition-all duration-300 w-5 top-2",
                      isMobileMenuOpen && "opacity-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute block h-0.5 bg-foreground rounded-full transition-all duration-300 w-5",
                      isMobileMenuOpen ? "-rotate-45 top-2" : "top-3",
                    )}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-md z-40 transition-all duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div
          ref={mobileMenuRef}
          className={cn(
            "flex flex-col h-full justify-center transition-all duration-300 transform",
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <nav className="container mx-auto px-6 py-8">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Button
                  key={item.name}
                  variant={activeSection === item.href.substring(1) ? "default" : "ghost"}
                  size="lg"
                  asChild
                  className={cn(
                    "justify-center text-lg font-medium transition-all",
                    "hover:translate-x-1",
                    activeSection === item.href.substring(1) && "font-bold",
                  )}
                  onClick={handleNavClick}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-20px)",
                  }}
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

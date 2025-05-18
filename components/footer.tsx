import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import personalData from "@/data/personal.json"

export default function Footer() {
  // Default social links if data is not available
  const defaultSocial = {
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    twitter: "https://twitter.com/username",
    instagram: "https://instagram.com/username",
  }

  const social = personalData.social || defaultSocial
  const name = personalData.name || "John Doe"

  return (
    <footer className="border-t py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-muted-foreground mt-1">
              {personalData.footerTagline || "Building digital experiences that make a difference"}
            </p>
          </div>

          <div className="flex gap-4">
            {social.github && (
              <Button size="icon" variant="ghost" asChild>
                <a href={social.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            )}

            {social.linkedin && (
              <Button size="icon" variant="ghost" asChild>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
            )}

            {social.twitter && (
              <Button size="icon" variant="ghost" asChild>
                <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
            )}

            {social.instagram && (
              <Button size="icon" variant="ghost" asChild>
                <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
            )}

            {personalData.email && (
              <Button size="icon" variant="ghost" asChild>
                <a href={`mailto:${personalData.email}`}>
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </p>

          <p className="text-sm text-muted-foreground mt-2 md:mt-0">Designed and built with ❤️</p>
        </div>
      </div>
    </footer>
  )
}

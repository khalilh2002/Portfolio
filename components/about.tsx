import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import personalData from "@/data/personal.json"
import SectionHeading from "@/components/section-heading"

export default function About() {
  return (
    <section id="about" className="py-20 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto">
        <SectionHeading title="About Me" subtitle="Get to know me better" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-primary/20">
              <Image
                src={personalData.profileImage || "/placeholder.svg?height=320&width=320"}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">{personalData.greeting || "Hello, I'm John Doe!"}</h3>

            <div className="space-y-4 text-muted-foreground">
              {personalData.aboutParagraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>) || (
                <>
                  <p>
                    I'm a passionate developer with a strong focus on creating intuitive and performant web
                    applications. With several years of experience in the industry, I've developed a keen eye for detail
                    and a commitment to writing clean, maintainable code.
                  </p>
                  <p>
                    When I'm not coding, you can find me exploring new technologies, contributing to open-source
                    projects, or enjoying outdoor activities to maintain a healthy work-life balance.
                  </p>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {personalData.quickFacts?.map((fact, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-4">
                    <p className="font-medium">{fact.label}</p>
                    <p className="text-muted-foreground text-sm">{fact.value}</p>
                  </CardContent>
                </Card>
              )) || (
                <>
                  <Card className="bg-background">
                    <CardContent className="p-4">
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground text-sm">San Francisco, CA</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background">
                    <CardContent className="p-4">
                      <p className="font-medium">Experience</p>
                      <p className="text-muted-foreground text-sm">5+ Years</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background">
                    <CardContent className="p-4">
                      <p className="font-medium">Availability</p>
                      <p className="text-muted-foreground text-sm">Full-time</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background">
                    <CardContent className="p-4">
                      <p className="font-medium">Languages</p>
                      <p className="text-muted-foreground text-sm">English, Spanish</p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

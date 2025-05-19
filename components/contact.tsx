"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import SectionHeading from "@/components/section-heading"
import personalData from "@/data/personal.json"

export default function Contact() {
  // Default contact info if data is not available
  const defaultContact = {
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    calendlyUrl: "https://calendly.com/johndoe/30min",
  }

  const contact = personalData.contact || defaultContact

  return (
    <section id="contact" className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <SectionHeading title="Contact" subtitle="Get in touch with me" />

        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Contact Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mt-1">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Email</h4>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mt-1">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Phone</h4>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mt-1">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Location</h4>
                      <p className="text-muted-foreground">{contact.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mt-1">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Schedule a Meeting</h4>
                      <Button variant="outline" className="mt-2 gap-2" asChild>
                        <a href={contact.calendlyUrl || "#"} target="_blank" rel="noopener noreferrer">
                          <Calendar className="h-4 w-4" />
                          Book a time
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t">
                <h3 className="text-xl font-bold mb-4">Availability</h3>
                <p className="text-muted-foreground">
                  I'm currently {personalData.availability || "available for freelance work and full-time positions"}.
                  Feel free to reach out if you have a project in mind or job opportunity.
                </p>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                {personalData.social?.linkedin && (
                  <Button asChild>
                    <a href={personalData.social.linkedin} target="_blank" rel="noopener noreferrer" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Connect on LinkedIn
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

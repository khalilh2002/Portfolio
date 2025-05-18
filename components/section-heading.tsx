import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle: string
  alignment?: "left" | "center"
  className?: string
}

export default function SectionHeading({ title, subtitle, alignment = "center", className }: SectionHeadingProps) {
  return (
    <div className={cn("space-y-2", alignment === "center" ? "text-center mx-auto" : "text-left", className)}>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
      <p className="text-muted-foreground md:text-xl max-w-[700px]">{subtitle}</p>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"

const parseSkills = (mdContent) => {
  const skills = []
  const sections = mdContent.split("### ").filter(Boolean)

  sections.forEach((section) => {
    const lines = section.split("\n").filter(Boolean)
    const categoryLine = lines[0].trim()
    const icons = lines[1].trim()

    skills.push({
      category: categoryLine,
      icons: icons,
    })
  })

  return skills
}

const SkillsArray = () => {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    fetch("/content/Skills.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch skills content")
        }
        return response.text()
      })
      .then((mdContent) => {
        setSkills(parseSkills(mdContent))
      })
      .catch((error) => {
        console.error("Error fetching skills:", error)
        setSkills([])
      })
  }, [])

  return skills
}

export default SkillsArray


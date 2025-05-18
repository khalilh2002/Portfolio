import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get width and height from the URL params with defaults
    const width = Number.parseInt(searchParams.get("width") || "400", 10)
    const height = Number.parseInt(searchParams.get("height") || "300", 10)

    // Generate a random pastel color for the background
    const hue = Math.floor(Math.random() * 360)
    const bgColor = `hsl(${hue}, 70%, 90%)`
    const textColor = `hsl(${hue}, 70%, 30%)`

    // Create SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="${bgColor}" />
        <text 
          x="50%" 
          y="50%" 
          font-family="system-ui, sans-serif" 
          font-size="${Math.max(width, height) * 0.05}px" 
          fill="${textColor}" 
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          ${width} × ${height}
        </text>
      </svg>
    `

    // Return the SVG as a response
    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Error generating placeholder:", error)
    return new Response("Error generating placeholder image", { status: 500 })
  }
}

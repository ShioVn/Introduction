"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseover", handleMouseOver)
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: fine) {
          body, a, button, input, select, textarea {
            cursor: none !important;
          }
        }
      `}} />
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[100] flex items-center justify-center hidden sm:flex"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 180 : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.2 }}
      >
        <Star className="text-pink-400 fill-pink-300 drop-shadow-md w-full h-full" />
      </motion.div>
    </>
  )
}

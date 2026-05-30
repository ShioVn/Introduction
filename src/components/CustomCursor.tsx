"use client"
// ═══════════════════════════════════════════════
// CUSTOM CURSOR — Upgraded: pink dot 8px,
// scales to 20px on hover over button/card/a,
// + trailing star icon
// ═══════════════════════════════════════════════
import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  // Smooth trailing with spring — dot is snappier, ring follows slower
  const dotX = useSpring(rawX, { stiffness: 700, damping: 30 })
  const dotY = useSpring(rawY, { stiffness: 700, damping: 30 })
  const ringX = useSpring(rawX, { stiffness: 180, damping: 22 })
  const ringY = useSpring(rawY, { stiffness: 180, damping: 22 })

  useEffect(() => {
    const updatePos = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest("a, button, [data-interactive], .group, [role='button']")
      setIsHovering(!!interactive)
    }

    window.addEventListener("mousemove", updatePos)
    window.addEventListener("mouseover", handleOver)
    return () => {
      window.removeEventListener("mousemove", updatePos)
      window.removeEventListener("mouseover", handleOver)
    }
  }, [rawX, rawY])

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: fine) {
          body, a, button, input, select, textarea {
            cursor: none !important;
          }
        }
      `}} />

      {/* Outer glow ring — bigger, follows slower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden sm:block rounded-full border border-pink-400/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 40 : 28,
          height: isHovering ? 40 : 28,
          opacity: isHovering ? 0.5 : 0.3,
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Inner dot — 8px, pink #ff6b6b, snappy */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden sm:block rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "#ff6b6b",
        }}
        animate={{
          width: isHovering ? 20 : 8,
          height: isHovering ? 20 : 8,
          opacity: isHovering ? 0.55 : 0.9,
          boxShadow: isHovering
            ? "0 0 18px 6px rgba(255,107,107,0.45)"
            : "0 0 6px 2px rgba(255,107,107,0.35)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}

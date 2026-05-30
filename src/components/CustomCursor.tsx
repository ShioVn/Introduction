"use client"
// ═══════════════════════════════════════════════
// CUSTOM CURSOR — Optimized: uses left/top CSS
// via requestAnimationFrame for correct positioning,
// no spring lag on position (only on size)
// ═══════════════════════════════════════════════
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const pos = useRef({ x: -200, y: -200 })
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    // Use RAF to update cursor position — avoids React re-renders per mousemove
    const updateDOM = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`
        dotRef.current.style.top = `${pos.current.y}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${pos.current.x}px`
        ringRef.current.style.top = `${pos.current.y}px`
      }
      rafId.current = requestAnimationFrame(updateDOM)
    }
    rafId.current = requestAnimationFrame(updateDOM)

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest("a, button, [data-interactive], [role='button'], label, select")
      setIsHovering(!!interactive)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseover", onOver, { passive: true })

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      {/* Ring — uses Framer Motion only for size/opacity transitions, position is via CSS */}
      <motion.div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] hidden sm:block rounded-full border border-pink-400/50"
        style={{
          translateX: "-50%",
          translateY: "-50%",
          willChange: "left, top, width, height",
        }}
        animate={{
          width: isHovering ? 38 : 26,
          height: isHovering ? 38 : 26,
          opacity: isHovering ? 0.6 : 0.35,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Dot — #ff6b6b, 8px normally, 20px on hover */}
      <motion.div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] hidden sm:block rounded-full"
        style={{
          backgroundColor: "#ff6b6b",
          translateX: "-50%",
          translateY: "-50%",
          willChange: "left, top, width, height",
        }}
        animate={{
          width: isHovering ? 20 : 8,
          height: isHovering ? 20 : 8,
          opacity: isHovering ? 0.5 : 0.9,
          boxShadow: isHovering
            ? "0 0 16px 5px rgba(255,107,107,0.4)"
            : "0 0 5px 1px rgba(255,107,107,0.3)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
    </>
  )
}

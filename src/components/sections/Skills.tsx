"use client"
// ═══════════════════════════════════════════════
// SKILLS SECTION — Enhanced: hover expand bar +5%,
// dark-mode safe for black-colored skills
// ═══════════════════════════════════════════════
import { useLanguage } from "@/components/language-provider"
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

// Convert a hex color to rgba string with given opacity
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

// Animated counter for skill level text
function LevelCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  const prevInView = useRef(false)
  if (isInView && !prevInView.current) {
    prevInView.current = true
    let current = 0
    const step = target / (1200 / 16)
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        setVal(target)
        clearInterval(timer)
      } else {
        setVal(Math.floor(current))
      }
    }, 16)
  }

  return <span ref={ref}>{val}%</span>
}

export function Skills() {
  const { t } = useLanguage()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 w-full max-w-6xl mx-auto relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-16 text-center"
      >
        <p className="text-sm font-mono text-primary/70 mb-1">{t.skills.subtitle}</p>
        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
          {t.skills.title}
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mb-6" />
        <p className="text-lg text-foreground/70 max-w-2xl">{t.skills.description}</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
        {PORTFOLIO_CONFIG.skills.map((skill, index) => {
          const safeColor = skill.color.startsWith("#") && skill.color.length === 7
            ? skill.color
            : "#c084fc"
          const isBlack = safeColor === "#000000"
          const isHovered = hoveredIdx === index
          // When hovered expand bar by 5% (capped at 100)
          const displayLevel = isHovered ? Math.min(skill.level + 5, 100) : skill.level

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -12, scale: 1.06, rotate: index % 2 === 0 ? 2 : -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06, type: "spring", stiffness: 220 }}
              className="relative bg-white/60 dark:bg-black/40 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-primary/20 flex flex-col items-center gap-4 overflow-hidden group cursor-default"
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Glow on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 ${isBlack ? "bg-black/20 dark:bg-white/20" : ""}`}
                style={isBlack ? undefined : { backgroundColor: hexToRgba(safeColor, 0.25) }}
              />

              {/* Icon circle */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-sm border border-white/50 dark:border-white/10 transition-transform group-hover:scale-110 duration-300 ${isBlack ? "text-black dark:text-white bg-black/5 dark:bg-white/10" : ""}`}
                style={isBlack ? undefined : { backgroundColor: hexToRgba(safeColor, 0.15), color: safeColor }}
              >
                {skill.emoji}
              </div>

              {/* Name */}
              <span className="font-bold text-foreground/90 text-base md:text-lg text-center leading-tight">
                {skill.name}
              </span>

              {/* Progress bar — animates from 0 to level on scroll, expands +5% on hover */}
              <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${displayLevel}%` }}
                  animate={{ width: `${displayLevel}%` }}
                  viewport={{ once: false }}
                  transition={isHovered
                    ? { duration: 0.3, ease: "easeOut" }
                    : { duration: 1.2, delay: 0.4 + index * 0.08, ease: "easeOut" }
                  }
                  className={`h-full rounded-full ${isBlack ? "bg-black dark:bg-white" : ""}`}
                  style={isBlack ? undefined : { backgroundColor: safeColor }}
                />
              </div>
              <span className="text-xs font-bold text-foreground/40">
                <LevelCounter target={skill.level} />
              </span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

"use client"
// ═══════════════════════════════════════════════
// SKILLS SECTION — Optimized: correct useInView counter,
// hover expand bar +5%, dark-mode safe for #000000 skills
// ═══════════════════════════════════════════════
import { useLanguage } from "@/components/language-provider"
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

// Counter that animates from 0 to target when it enters view
function LevelCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const steps = 40
    const duration = 1200
    const stepTime = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      setVal(Math.round((target / steps) * step))
      if (step >= steps) {
        setVal(target)
        clearInterval(timer)
      }
    }, stepTime)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{val}%</span>
}

// Individual skill card — isolated component to prevent all cards re-rendering on hover
function SkillCard({ skill, index }: { skill: typeof PORTFOLIO_CONFIG.skills[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const safeColor = skill.color.startsWith("#") && skill.color.length === 7 ? skill.color : "#c084fc"
  const isBlack = safeColor === "#000000"
  const displayLevel = hovered ? Math.min(skill.level + 5, 100) : skill.level

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.05, rotate: index % 2 === 0 ? 1.5 : -1.5 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.05, type: "spring", stiffness: 200 }}
      className="relative bg-white/60 dark:bg-black/40 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-primary/20 flex flex-col items-center gap-4 overflow-hidden group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-xl -z-10 ${isBlack ? "bg-black/20 dark:bg-white/20" : ""}`}
        style={isBlack ? undefined : { backgroundColor: hexToRgba(safeColor, 0.22) }}
      />

      {/* Icon */}
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

      {/* Progress bar */}
      <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          animate={{ width: `${displayLevel}%` }}
          viewport={{ once: true }}
          transition={{ duration: hovered ? 0.28 : 1.1, delay: hovered ? 0 : 0.3 + index * 0.07, ease: "easeOut" }}
          className={`h-full rounded-full ${isBlack ? "bg-black dark:bg-white" : ""}`}
          style={isBlack ? undefined : { backgroundColor: safeColor }}
        />
      </div>

      <span className="text-xs font-bold text-foreground/40">
        <LevelCounter target={skill.level} />
      </span>
    </motion.div>
  )
}

export function Skills() {
  const { t } = useLanguage()

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
        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">{t.skills.title}</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mb-6" />
        <p className="text-lg text-foreground/70 max-w-2xl">{t.skills.description}</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
        {PORTFOLIO_CONFIG.skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </section>
  )
}

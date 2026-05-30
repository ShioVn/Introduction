"use client"
// ═══════════════════════════════════════════════
// SKILLS SECTION — Fixed: opacity via rgba, no hex+alpha trick
// ═══════════════════════════════════════════════
import { useLanguage } from "@/components/language-provider"
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { motion } from "framer-motion"

// Convert a hex color to rgba string with given opacity
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
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
            : "#c084fc" // fallback purple

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -12, scale: 1.06, rotate: index % 2 === 0 ? 2 : -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06, type: "spring", stiffness: 220 }}
              className="relative bg-white/60 dark:bg-black/40 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-primary/20 flex flex-col items-center gap-4 overflow-hidden group cursor-default"
            >
              {/* Glow on hover — inline style for correct color */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 ${
                  safeColor === "#000000" ? "bg-black/20 dark:bg-white/20" : ""
                }`}
                style={safeColor === "#000000" ? undefined : { backgroundColor: hexToRgba(safeColor, 0.25) }}
              />

              {/* Icon circle */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-sm border border-white/50 dark:border-white/10 transition-transform group-hover:scale-110 duration-300 ${
                  safeColor === "#000000" ? "text-black dark:text-white bg-black/5 dark:bg-white/10" : ""
                }`}
                style={
                  safeColor === "#000000"
                    ? undefined
                    : {
                        backgroundColor: hexToRgba(safeColor, 0.15),
                        color: safeColor,
                      }
                }
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
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4 + index * 0.08, ease: "easeOut" }}
                  className={`h-full rounded-full ${safeColor === "#000000" ? "bg-black dark:bg-white" : ""}`}
                  style={safeColor === "#000000" ? undefined : { backgroundColor: safeColor }}
                />
              </div>
              <span className="text-xs font-bold text-foreground/40">{skill.level}%</span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

"use client"
// ═══════════════════════════════════════════════
// ABOUT SECTION — Scrapbook / personal diary style
// Features: polaroid cards, sticky notes, fun facts,
// floating GIF, traits tags, typing bio
// ═══════════════════════════════════════════════
import { useLanguage } from "@/components/language-provider"
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

// Typing effect hook
function useTyping(text: string, speed = 45) {
  const [displayed, setDisplayed] = useState("")
  useEffect(() => {
    setDisplayed("")
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])
  return displayed
}

// Sticky note card
function StickyNote({ children, rotate, color, delay }: {
  children: React.ReactNode; rotate: number; color: string; delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotate - 5 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: "spring" }}
      className={`${color} p-5 rounded-sm shadow-xl relative cursor-default`}
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <div className="absolute top-1 left-0 right-0 flex justify-center">
        <div className="w-8 h-2 bg-yellow-200/60 rounded-full shadow-inner" />
      </div>
      {children}
    </motion.div>
  )
}

export function About() {
  const { t } = useLanguage()
  const typedBio = useTyping(t.about.description)

  return (
    <section className="py-24 px-6 w-full max-w-6xl mx-auto relative">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <p className="text-sm font-mono text-primary/70 mb-1">{t.about.subtitle}</p>
        <h2 className="text-4xl md:text-5xl font-black text-foreground">{t.about.title}</h2>
        <div className="mt-3 h-1 w-24 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* ── Left: Bio + Traits ── */}
        <div className="flex flex-col gap-8">
          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-white/60 dark:bg-black/30 backdrop-blur-lg rounded-3xl p-8 border border-primary/20 shadow-xl overflow-hidden"
          >
            {/* Deco circle */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-pink-200/40 rounded-full blur-2xl" />
            <p className="relative z-10 text-lg leading-relaxed font-medium text-foreground/85 min-h-[120px]">
              {typedBio}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle"
              />
            </p>
          </motion.div>

          {/* Traits */}
          <div>
            <p className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-3">Traits</p>
            <div className="flex flex-wrap gap-3">
              {t.about.traits.map((trait, i) => (
                <motion.span
                  key={trait}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="px-5 py-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-200 dark:to-purple-200 rounded-full text-sm font-bold border border-primary/20 text-pink-900 dark:text-pink-950 cursor-default shadow-sm"
                >
                  {trait}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Floating GIF */}
          <motion.img
            src={PORTFOLIO_CONFIG.gifs.aboutRead}
            alt="reading anime"
            className="w-32 h-32 object-cover rounded-3xl self-center opacity-90 drop-shadow-xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </div>

        {/* ── Right: Sticky Notes (Fun Facts) ── */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <StickyNote rotate={-3} color="bg-yellow-100 dark:bg-yellow-900/40" delay={0.1}>
            <p className="text-xs font-bold text-yellow-800 dark:text-yellow-300 uppercase tracking-wide mb-3">
              {t.about.funFacts.title}
            </p>
            <ul className="space-y-2">
              {t.about.funFacts.items.slice(0, 2).map((item) => (
                <li key={item} className="text-sm font-medium text-yellow-900 dark:text-yellow-200">{item}</li>
              ))}
            </ul>
          </StickyNote>

          <StickyNote rotate={2} color="bg-pink-100 dark:bg-pink-900/40" delay={0.2}>
            <p className="text-xs font-bold text-pink-800 dark:text-pink-300 uppercase tracking-wide mb-3">Info</p>
            <ul className="space-y-2 text-sm font-medium text-pink-900 dark:text-pink-200">
              <li>📅 {PORTFOLIO_CONFIG.personalInfo.dob}</li>
              <li>🧑 {PORTFOLIO_CONFIG.personalInfo.gender}</li>
              <li>🌏 {PORTFOLIO_CONFIG.personalInfo.nationality}</li>
            </ul>
          </StickyNote>

          <StickyNote rotate={1} color="bg-green-100 dark:bg-green-900/40" delay={0.3}>
            <p className="text-xs font-bold text-green-800 dark:text-green-300 uppercase tracking-wide mb-3">More Facts</p>
            <ul className="space-y-2">
              {t.about.funFacts.items.slice(2).map((item) => (
                <li key={item} className="text-sm font-medium text-green-900 dark:text-green-200">{item}</li>
              ))}
            </ul>
          </StickyNote>

          <StickyNote rotate={-2} color="bg-purple-100 dark:bg-purple-900/40" delay={0.4}>
            <p className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wide mb-3">Contact</p>
            <p className="text-xs font-medium text-purple-900 dark:text-purple-200 break-all">
              ✉️ {PORTFOLIO_CONFIG.personalInfo.email}
            </p>
            <p className="text-xs font-medium text-purple-900 dark:text-purple-200 mt-2">
              📞 {PORTFOLIO_CONFIG.personalInfo.phone}
            </p>
          </StickyNote>
        </div>
      </div>
    </section>
  )
}

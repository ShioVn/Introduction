"use client"
// ═══════════════════════════════════════════════
// HOBBIES SECTION — Enhanced: emoji deco rotate 360°
// on hover, card slide-in with stagger
// ═══════════════════════════════════════════════
import { useLanguage } from "@/components/language-provider"
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { motion } from "framer-motion"
import { HeartPulse, Gamepad2, BookHeart, TerminalSquare } from "lucide-react"
import { useState } from "react"

export function Hobbies() {
  const { t } = useLanguage()
  const [rotateCoffee, setRotateCoffee] = useState(0)
  const [rotateHeadphones, setRotateHeadphones] = useState(0)

  const hobbiesData = [
    {
      id: "gaming",
      icon: Gamepad2,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      border: "border-blue-200 dark:border-blue-800",
      title: t.hobbies.gaming.title,
      desc: t.hobbies.gaming.desc,
    },
    {
      id: "novel",
      icon: BookHeart,
      color: "text-pink-500",
      bg: "bg-pink-100 dark:bg-pink-900/30",
      border: "border-pink-200 dark:border-pink-800",
      title: t.hobbies.novel.title,
      desc: t.hobbies.novel.desc,
    },
    {
      id: "coding",
      icon: TerminalSquare,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/30",
      border: "border-green-200 dark:border-green-800",
      title: t.hobbies.coding.title,
      desc: t.hobbies.coding.desc,
    },
  ]

  return (
    <section className="py-24 px-6 w-full max-w-5xl mx-auto relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 mb-4 bg-orange-100 dark:bg-orange-900/30 px-6 py-2 rounded-full border border-orange-200 dark:border-orange-800">
          <HeartPulse className="w-5 h-5 text-orange-500" />
          <p className="text-sm font-bold tracking-widest text-orange-600 dark:text-orange-400 uppercase">
            {t.hobbies.subtitle}
          </p>
          <HeartPulse className="w-5 h-5 text-orange-500" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
          {t.hobbies.title}
        </h2>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Visual / GIF side */}
        <div className="w-full md:w-1/2 relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative bg-white/40 dark:bg-black/40 p-4 rounded-[3rem] shadow-2xl border border-white/50 backdrop-blur-md"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 dark:from-pink-900/50 dark:via-purple-900/50 dark:to-indigo-900/50 rounded-[3.5rem] blur-xl opacity-50 -z-10" />
            <img
              src={PORTFOLIO_CONFIG.gifs.hobbies}
              alt="Cozy anime room"
              className="w-full h-auto max-w-sm rounded-[2.5rem] object-cover"
            />

            {/* Coffee emoji — rotate 360° on hover */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              onHoverStart={() => setRotateCoffee(prev => prev + 360)}
              className="absolute -top-6 -right-6 w-16 h-16 bg-orange-50 dark:bg-orange-100 rounded-full shadow-lg border border-orange-200 flex items-center justify-center text-2xl cursor-pointer select-none"
              whileHover={{ scale: 1.1 }}
            >
              <motion.span
                animate={{ rotate: rotateCoffee }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="inline-block"
              >
                ☕
              </motion.span>
            </motion.div>

            {/* Headphones emoji — rotate 360° on hover */}
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              onHoverStart={() => setRotateHeadphones(prev => prev + 360)}
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-indigo-50 dark:bg-indigo-100 rounded-2xl shadow-lg border border-indigo-200 flex items-center justify-center text-2xl cursor-pointer select-none"
              whileHover={{ scale: 1.1 }}
            >
              <motion.span
                animate={{ rotate: rotateHeadphones }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="inline-block"
              >
                🎧
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        {/* Info side (Shelves) */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          {hobbiesData.map((hobby, idx) => {
            const Icon = hobby.icon
            return (
              <motion.div
                key={hobby.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02, x: -10 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white/60 dark:bg-black/30 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-primary/20 flex items-center gap-6"
              >
                <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center ${hobby.bg} ${hobby.border} border`}>
                  <Icon className={`w-8 h-8 ${hobby.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{hobby.title}</h3>
                  <p className="text-foreground/70 font-medium text-sm leading-relaxed">
                    {hobby.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

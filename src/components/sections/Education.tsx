"use client"
// ═══════════════════════════════════════════════
// EDUCATION SECTION — Cute timeline 3D style
// ═══════════════════════════════════════════════
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { GraduationCap, BookOpen, Star, Sparkles } from "lucide-react"

export function Education() {
  const { t } = useLanguage()

  return (
    <section className="py-20 px-6 w-full max-w-5xl mx-auto relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-16"
      >
        <p className="text-sm font-mono text-primary/70 mb-1">{t.education.subtitle}</p>
        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
          {t.education.title}
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full" />
      </motion.div>

      <div className="relative border-l-4 border-indigo-200 dark:border-indigo-800/50 ml-6 md:ml-0 md:pl-12 w-full md:w-4/5 mx-auto">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 ml-8 bg-white/70 dark:bg-black/40 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-indigo-100 dark:border-indigo-900/30 relative overflow-hidden group"
        >
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl -z-10 group-hover:bg-purple-300/40 transition-colors duration-500" />
          
          {/* Node icon */}
          <span className="absolute -left-[3.8rem] md:-left-[4.8rem] top-8 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(167,139,250,0.5)] border-4 border-background z-10">
            <GraduationCap className="w-6 h-6 text-white" />
          </span>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <span className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-xl">
                <BookOpen className="w-6 h-6 text-indigo-500" />
              </span>
              {t.education.school}
            </h3>
            <span className="text-sm font-bold text-white bg-gradient-to-r from-indigo-400 to-purple-400 px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
              {t.education.time}
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-bold text-foreground/60">{t.education.city}</span>
          </div>

          <p className="text-foreground/80 text-lg leading-relaxed mb-6">
            {t.education.description}
          </p>

          <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-xl border border-yellow-200 dark:border-yellow-800/50">
            <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400 fill-yellow-500" />
            <span className="text-sm font-bold text-yellow-800 dark:text-yellow-300">
              {t.education.highlight}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"
// ═══════════════════════════════════════════════
// PROJECTS SECTION — Enhanced: hover lift + shadow,
// image scale 1.05x, ripple click effect
// ═══════════════════════════════════════════════
import { useLanguage } from "@/components/language-provider"
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, GitBranch } from "lucide-react"
import { useRef, useState } from "react"

// Ripple effect component
interface Ripple {
  id: number
  x: number
  y: number
}

function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const nextId = useRef(0)

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = nextId.current++
    setRipples(prev => [...prev, { id, x, y }])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700)
  }

  return { ripples, createRipple }
}

export function Projects() {
  const { t, language } = useLanguage()

  return (
    <section className="py-24 px-6 w-full max-w-6xl mx-auto relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-16 text-center"
      >
        <p className="text-sm font-mono text-primary/70 mb-1">{t.projects.subtitle}</p>
        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
          {t.projects.title}
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" />
      </motion.div>

      <div className="flex flex-col gap-16 w-full">
        {PORTFOLIO_CONFIG.projects.map((project, idx) => {
          const isEven = idx % 2 === 0
          return <ProjectCard key={project.id} project={project} idx={idx} isEven={isEven} t={t} language={language} />
        })}
      </div>
    </section>
  )
}

// Separated to its own component so each card has isolated ripple state
function ProjectCard({ project, idx, isEven, t, language }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any; idx: number; isEven: boolean; t: any; language: string
}) {
  const { ripples, createRipple } = useRipple()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: idx * 0.1 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center group`}
    >
      {/* Image side — scale 1.05x on hover, ripple on click */}
      <div
        className="w-full lg:w-1/2 relative rounded-[2rem] overflow-hidden shadow-2xl border border-primary/20 aspect-video lg:aspect-[4/3] bg-secondary/30 cursor-pointer group/img"
        onClick={createRipple}
      >
        {/* Ripples */}
        <AnimatePresence>
          {ripples.map(ripple => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full bg-white/40 pointer-events-none z-20"
              style={{ left: ripple.x, top: ripple.y, translateX: "-50%", translateY: "-50%" }}
              initial={{ width: 0, height: 0, opacity: 0.6 }}
              animate={{ width: 400, height: 400, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>

        <div className="absolute inset-0 bg-primary/10 group-hover/img:bg-transparent transition-colors duration-500 z-10" />
        <motion.img
          src={project.image}
          alt={project.title}
          className={`w-full h-full ${project.imageClass || 'object-cover'}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Content side */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider w-max border border-blue-200 dark:border-blue-800">
          {t.projects.year}: {project.year}
        </div>

        <h3 className="text-3xl md:text-4xl font-black text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-primary/10 relative z-20 lg:-ml-12 lg:mr-0 group-hover:-translate-y-2 transition-transform duration-500">
          <p className="text-foreground/80 leading-relaxed text-lg">
            {language === 'vi' ? project.descriptionVi : project.descriptionEn}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-sm font-bold text-foreground/50 mr-2 self-center">{t.projects.tech}:</span>
          {project.tech.map((tech: string) => (
            <span key={tech} className="px-3 py-1 bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full shadow-sm">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          {project.repo !== '#' && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-primary hover:text-white rounded-full font-bold transition-all shadow-md hover:shadow-lg"
            >
              <GitBranch className="w-5 h-5" />
              {t.projects.viewCode}
            </a>
          )}
          {project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-foreground border border-primary/20 hover:border-primary rounded-full font-bold transition-all shadow-md hover:shadow-lg"
            >
              <ExternalLink className="w-5 h-5" />
              {t.projects.liveSite}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

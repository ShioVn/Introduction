"use client"
// ═══════════════════════════════════════════════
// PROJECTS SECTION — Big detailed cards
// ═══════════════════════════════════════════════
import { useLanguage } from "@/components/language-provider"
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { motion } from "framer-motion"
import { ExternalLink, GitBranch } from "lucide-react"

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
          // Alternative layout for even/odd items
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center group`}
            >
              {/* Image side */}
              <div className="w-full lg:w-1/2 relative rounded-[2rem] overflow-hidden shadow-2xl border border-primary/20 aspect-video lg:aspect-[4/3] bg-secondary/30">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className={`w-full h-full ${project.imageClass || 'object-cover'} group-hover:scale-110 transition-transform duration-700 ease-in-out`}
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
                  {project.tech.map(tech => (
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
        })}
      </div>
    </section>
  )
}

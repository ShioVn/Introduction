"use client"
// ═══════════════════════════════════════════════
// GAMING SECTION — Gaming Hub with characters/gifs
// ═══════════════════════════════════════════════
import { useLanguage } from "@/components/language-provider"
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { motion } from "framer-motion"
import { Gamepad2, Trophy, Swords } from "lucide-react"

export function Gaming() {
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
        <div className="inline-flex items-center gap-2 mb-4 bg-red-100 dark:bg-red-900/30 px-6 py-2 rounded-full border border-red-200 dark:border-red-800">
          <Gamepad2 className="w-5 h-5 text-red-500" />
          <p className="text-sm font-bold tracking-widest text-red-600 dark:text-red-400 uppercase">
            {t.gaming.subtitle}
          </p>
          <Gamepad2 className="w-5 h-5 text-red-500" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
          {t.gaming.title}
        </h2>
        <p className="text-lg text-foreground/70 max-w-2xl">
          {t.gaming.description}
        </p>
      </motion.div>

      <div className="relative">
        {/* Floating anime gif for gaming */}
        <motion.img 
          src={PORTFOLIO_CONFIG.gifs.gaming} 
          alt="Gaming anime"
          className="absolute -top-32 -right-10 md:right-0 w-40 h-40 object-cover rounded-3xl z-10 opacity-90 drop-shadow-2xl pointer-events-none"
          animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        <motion.img 
          src={PORTFOLIO_CONFIG.gifs.valorant} 
          alt="Valorant anime"
          className="absolute -bottom-20 -left-10 md:-left-16 w-36 h-36 object-cover rounded-3xl z-10 opacity-90 drop-shadow-2xl pointer-events-none"
          animate={{ y: [0, 15, 0], x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_CONFIG.games.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.03 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-[2rem] p-6 shadow-lg border border-primary/20 flex flex-col justify-between group h-64 bg-gradient-to-br ${game.gradient}`}
            >
              {/* Background pattern overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              
              {/* Content */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-white/90 p-2 shadow-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                  <img src={game.icon} alt={game.name} className="w-full h-full object-contain drop-shadow-md" />
                </div>
                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-yellow-300" />
                  <span className="text-white text-xs font-bold">{t.gaming.rank}: {game.rank}</span>
                </div>
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-2xl font-black text-white drop-shadow-md mb-1">{game.name}</h3>
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl w-max border border-white/10">
                  <Swords className="w-4 h-4 text-gray-300" />
                  <span className="text-white font-mono font-medium text-sm">
                    {t.gaming.inGameName}: {game.inGameName}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

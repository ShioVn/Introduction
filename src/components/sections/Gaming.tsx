"use client"
// ═══════════════════════════════════════════════
// GAMING SECTION — Enhanced: Rank color badges,
// blink every 3s, hover tooltip with hours
// ═══════════════════════════════════════════════
import { useLanguage } from "@/components/language-provider"
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { motion, AnimatePresence } from "framer-motion"
import { Gamepad2, Trophy, Swords, Clock } from "lucide-react"
import { useState } from "react"

// Rank color mapping
const RANK_STYLES: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  default:        { bg: "bg-gray-500/80",    text: "text-white",       border: "border-gray-400/50",   glow: "rgba(156,163,175,0.6)" },
  bronze:         { bg: "bg-amber-700/90",   text: "text-amber-100",   border: "border-amber-500/50",  glow: "rgba(180,83,9,0.7)" },
  silver:         { bg: "bg-slate-400/90",   text: "text-white",       border: "border-slate-300/50",  glow: "rgba(148,163,184,0.7)" },
  gold:           { bg: "bg-yellow-500/90",  text: "text-yellow-900",  border: "border-yellow-300/50", glow: "rgba(234,179,8,0.7)" },
  platinum:       { bg: "bg-cyan-400/90",    text: "text-cyan-900",    border: "border-cyan-200/50",   glow: "rgba(34,211,238,0.7)" },
  diamond:        { bg: "bg-blue-400/90",    text: "text-white",       border: "border-blue-300/50",   glow: "rgba(96,165,250,0.7)" },
  master:         { bg: "bg-purple-600/90",  text: "text-white",       border: "border-purple-400/50", glow: "rgba(147,51,234,0.7)" },
  grandmaster:    { bg: "bg-red-600/90",     text: "text-white",       border: "border-red-400/50",    glow: "rgba(220,38,38,0.7)" },
  challenger:     { bg: "bg-gradient-to-r from-yellow-300 to-cyan-300", text: "text-gray-900", border: "border-yellow-200/50", glow: "rgba(234,179,8,0.8)" },
  "cao thủ":      { bg: "bg-purple-600/90",  text: "text-white",       border: "border-purple-400/50", glow: "rgba(147,51,234,0.7)" },
  casual:         { bg: "bg-green-500/80",   text: "text-white",       border: "border-green-400/50",  glow: "rgba(34,197,94,0.6)" },
  survival:       { bg: "bg-emerald-600/80", text: "text-white",       border: "border-emerald-400/50",glow: "rgba(5,150,105,0.6)" },
}

function getRankStyle(rank: string) {
  const lower = rank.toLowerCase()
  for (const key of Object.keys(RANK_STYLES)) {
    if (lower.includes(key)) return RANK_STYLES[key]
  }
  return RANK_STYLES.default
}

// Estimated hours per game
const GAME_HOURS: Record<string, string> = {
  valorant: "~300 giờ",
  tft: "~150 giờ",
  lienquan: "~400 giờ",
  roblox: "~80 giờ",
  minecraft: "~200 giờ",
}

export function Gaming() {
  const { t } = useLanguage()
  const [tooltip, setTooltip] = useState<string | null>(null)

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
        {/* Floating anime gifs */}
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
          {PORTFOLIO_CONFIG.games.map((game, idx) => {
            const rankStyle = getRankStyle(game.rank)
            const hours = GAME_HOURS[game.id] ?? "~100 giờ"

            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.03 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative overflow-hidden rounded-[2rem] p-6 shadow-lg border border-primary/20 flex flex-col justify-between group h-64 bg-gradient-to-br ${game.gradient}`}
              >
                {/* Background overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                {/* Rank badge with blink */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-white/90 p-2 shadow-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                    <img src={game.icon} alt={game.name} className="w-full h-full object-contain drop-shadow-md" />
                  </div>

                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 2.5 }}
                    className={`${rankStyle.bg} ${rankStyle.text} border ${rankStyle.border} backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-lg`}
                    style={{ boxShadow: `0 0 12px ${rankStyle.glow}` }}
                  >
                    <Trophy className="w-3 h-3" />
                    <span className="text-xs font-bold">{t.gaming.rank}: {game.rank}</span>
                  </motion.div>
                </div>

                <div className="relative z-10 mt-auto">
                  {/* Game name with tooltip on hover */}
                  <div
                    className="relative inline-block"
                    onMouseEnter={() => setTooltip(game.id)}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <h3 className="text-2xl font-black text-white drop-shadow-md mb-1 cursor-default hover:underline decoration-white/60">
                      {game.name}
                    </h3>
                    <AnimatePresence>
                      {tooltip === game.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-full left-0 mb-2 bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 whitespace-nowrap flex items-center gap-1.5 z-30"
                        >
                          <Clock className="w-3 h-3" />
                          Thành tích: {hours}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl w-max border border-white/10">
                    <Swords className="w-4 h-4 text-gray-300" />
                    <span className="text-white font-mono font-medium text-sm">
                      {t.gaming.inGameName}: {game.inGameName}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

"use client"
// ═══════════════════════════════════════════════
// FOOTER — Cute minimal footer
// ═══════════════════════════════════════════════
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { Heart, Star } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { language } = useLanguage()
  
  // Use a static image URL so it doesn't re-fetch (and thus increment) when changing languages.
  // We use a new ID to reset the count back to 0 as requested.
  const counterUrl = "https://count.getloli.com/get/@shiovn-portfolio-v2?theme=asoul"

  return (
    <footer className="w-full py-10 mt-8 border-t border-primary/20 bg-background/50 backdrop-blur-sm relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center gap-3"
      >
        <div className="flex items-center gap-2 text-sm">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
            >
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            </motion.div>
          ))}
        </div>
        <p className="text-foreground/70 font-bold flex items-center gap-2 text-base">
          Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> by{" "}
          <span className="text-primary font-black">{PORTFOLIO_CONFIG.personalInfo.nickname}</span>
        </p>
        <p className="text-foreground/40 text-sm font-medium">
          &copy; {new Date().getFullYear()} {PORTFOLIO_CONFIG.personalInfo.fullName}. All rights reserved.
        </p>
        
        <div className="mt-4 flex flex-col md:flex-row items-center gap-4 opacity-90 hover:opacity-100 transition-opacity">
          <span className="text-base md:text-lg font-bold text-foreground/80 bg-white/40 dark:bg-black/30 px-5 py-2.5 rounded-full border border-primary/20 shadow-sm backdrop-blur-md">
            {language === "vi" ? "Số người đã ghé qua trạm :" : "Station visitors :"}
          </span>
          <img src={counterUrl} alt="Visitor Count" className="h-12 md:h-16 drop-shadow-md" />
        </div>
      </motion.div>
    </footer>
  )
}

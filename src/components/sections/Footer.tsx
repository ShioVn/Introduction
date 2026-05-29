"use client"
// ═══════════════════════════════════════════════
// FOOTER — Cute minimal footer
// ═══════════════════════════════════════════════
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { Heart, Star } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
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
      </motion.div>
    </footer>
  )
}

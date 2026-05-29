"use client"
// ═══════════════════════════════════════════════
// NAVBAR — Upgraded with nav links + cute language toggle
// ═══════════════════════════════════════════════
import { useLanguage } from "./language-provider"
import { ThemeToggle } from "./ThemeToggle"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#education", label: t.nav.education },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#gaming", label: t.nav.gaming },
    { href: "#hobbies", label: t.nav.hobbies },
    { href: "#social", label: t.nav.social },
    { href: "#contact", label: t.nav.contact },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-3 flex justify-between items-center bg-background/60 backdrop-blur-xl border-b border-primary/20 shadow-sm"
    >
      {/* Logo */}
      <a href="#" className="font-black text-2xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-sm">
        SHIO✨
      </a>

      {/* Desktop Nav Links */}
      <div className="hidden lg:flex items-center gap-1">
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="px-3 py-2 rounded-full text-sm font-bold text-foreground/70 hover:text-foreground hover:bg-primary/10 transition-all"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Language Toggle */}
        <div className="flex bg-secondary/40 rounded-full p-1 border border-primary/20 shadow-inner">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-full text-sm font-black transition-all ${
              language === "en"
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("vi")}
            className={`px-3 py-1 rounded-full text-sm font-black transition-all ${
              language === "vi"
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            VI
          </button>
        </div>

        <ThemeToggle />

        {/* Mobile menu button */}
        <button
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-primary/20 px-6 py-4 flex flex-col gap-2 lg:hidden overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-2 px-4 rounded-xl text-sm font-bold text-foreground/80 hover:bg-primary/10 hover:text-foreground transition-all"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

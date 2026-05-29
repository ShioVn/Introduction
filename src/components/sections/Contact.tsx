"use client"
// ═══════════════════════════════════════════════
// CONTACT SECTION — Form + cute info cards + confetti
// ═══════════════════════════════════════════════
import { useLanguage } from "@/components/language-provider"
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { motion } from "framer-motion"
import { Mail, Phone, MessageSquare } from "lucide-react"
import confetti from "canvas-confetti"

export function Contact() {
  const { t } = useLanguage()

  const fireConfetti = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x, y },
      colors: ["#ffd1dc", "#e6e6fa", "#b2fba5", "#ff9a9e", "#c9b8ff"],
    })
  }

  const contacts = [
    {
      id: "email",
      label: t.contact.email,
      value: PORTFOLIO_CONFIG.personalInfo.email,
      href: `mailto:${PORTFOLIO_CONFIG.personalInfo.email}`,
      icon: Mail,
      color: "text-pink-500",
      bg: "bg-pink-100 dark:bg-pink-900/30",
    },
    {
      id: "phone",
      label: t.contact.phone,
      value: PORTFOLIO_CONFIG.personalInfo.phone,
      href: `tel:${PORTFOLIO_CONFIG.personalInfo.phone}`,
      icon: Phone,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: "discord",
      label: t.contact.discord,
      value: PORTFOLIO_CONFIG.socials.find(s => s.id === "discord")?.url?.replace("https://discord.gg/", "discord.gg/") ?? "discord.gg/...",
      href: PORTFOLIO_CONFIG.socials.find(s => s.id === "discord")?.url ?? "#",
      icon: MessageSquare,
      color: "text-indigo-500",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
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
        <p className="text-sm font-mono text-primary/70 mb-1">{t.contact.subtitle}</p>
        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
          {t.contact.title}
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mb-6" />
        <p className="text-lg text-foreground/70 max-w-xl">{t.contact.description}</p>
      </motion.div>

      {/* Decorative blobs */}
      <div className="absolute -top-20 left-1/4 w-72 h-72 bg-pink-200/20 dark:bg-pink-900/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 right-1/4 w-64 h-64 bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {contacts.map((contact, idx) => {
          const Icon = contact.icon
          return (
            <motion.a
              key={contact.id}
              href={contact.href}
              target={contact.id !== "email" && contact.id !== "phone" ? "_blank" : undefined}
              rel="noopener noreferrer"
              onClick={fireConfetti}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col items-center text-center p-8 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-3xl shadow-lg border border-primary/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${contact.bg} shadow-inner z-10`}>
                <Icon className={`w-8 h-8 ${contact.color}`} />
              </div>
              <p className="font-bold text-foreground/60 text-xs uppercase tracking-widest mb-2 z-10">{contact.label}</p>
              <p className="font-bold text-foreground break-all text-sm z-10">{contact.value}</p>
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}

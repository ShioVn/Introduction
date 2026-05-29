"use client"
// ═══════════════════════════════════════════════
// PAGE.TSX — Main page assembling all sections
// Added: Gaming, Social sections + section IDs
// ═══════════════════════════════════════════════
import { useEffect } from "react"
import Lenis from "lenis"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Education } from "@/components/sections/Education"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { Gaming } from "@/components/sections/Gaming"
import { Hobbies } from "@/components/sections/Hobbies"
import { Social } from "@/components/sections/Social"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { MusicPlayer } from "@/components/MusicPlayer"
import { CustomCursor } from "@/components/CustomCursor"

// Divider between sections for visual separation
function Divider() {
  return (
    <div className="w-full max-w-3xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  )
}

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => { lenis.destroy() }
  }, [])

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      <CustomCursor />
      <Navbar />
      <MusicPlayer />

      <section id="hero"><Hero /></section>
      <Divider />
      <section id="about"><About /></section>
      <Divider />
      <section id="education"><Education /></section>
      <Divider />
      <section id="skills"><Skills /></section>
      <Divider />
      <section id="projects"><Projects /></section>
      <Divider />
      <section id="gaming"><Gaming /></section>
      <Divider />
      <section id="hobbies"><Hobbies /></section>
      <Divider />
      <section id="social"><Social /></section>
      <Divider />
      <section id="contact"><Contact /></section>

      <Footer />
    </main>
  )
}

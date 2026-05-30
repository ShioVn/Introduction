"use client"
// ═══════════════════════════════════════════════
// HERO SECTION — Enhanced: Stagger name, typewriter role,
// glow cursor, counter stats, smooth scroll CTA
// ═══════════════════════════════════════════════
import { useLanguage } from "@/components/language-provider"
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { motion, useMotionValue, useSpring, useInView } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Stars, Sphere, MeshDistortMaterial, Torus } from "@react-three/drei"
import { Suspense, useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

// ─── 3D Background Scene ─────────────────────
const PARTICLE_POSITIONS: [number, number, number][] = [
  [3.2, 2.1, -4], [-4.5, -1.5, -5], [2.8, -2.8, -3.5],
  [-2.1, 3.5, -4.5], [5.1, 0.5, -5], [-5.2, 2.5, -3],
  [1.5, -3.8, -4], [-3.2, -3.1, -5],
]

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffd1dc" />
      <pointLight position={[-10, -5, -5]} intensity={0.5} color="#e6e6fa" />

      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.5}>
        <Sphere args={[1.8, 64, 64]} position={[3.5, 0, -2]}>
          <MeshDistortMaterial color="#ffd1dc" distort={0.4} speed={2} roughness={0.1} metalness={0.3} opacity={0.7} transparent />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.0, 32, 32]} position={[-4, 1.5, -1]}>
          <MeshDistortMaterial color="#b2fba5" distort={0.5} speed={3} roughness={0} metalness={0.5} opacity={0.6} transparent />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={2} floatIntensity={1}>
        <Torus args={[1.2, 0.3, 16, 60]} position={[-3, -2, -1]} rotation={[0.5, 0.5, 0]}>
          <meshStandardMaterial color="#e6e6fa" metalness={0.8} roughness={0.2} />
        </Torus>
      </Float>

      {PARTICLE_POSITIONS.map((pos, i) => (
        <Float key={i} speed={1 + i * 0.3} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[0.15, 16, 16]} position={pos}>
            <meshStandardMaterial color={["#ffd1dc", "#e6e6fa", "#b2fba5", "#fdfbf7"][i % 4]} metalness={0.5} roughness={0.2} />
          </Sphere>
        </Float>
      ))}

      <Stars radius={100} depth={60} count={3000} factor={4} saturation={0.5} fade speed={0.8} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </>
  )
}

// ─── Floating GIF element ─────────────────────
function FloatingGif({ src, alt, className, animProps }: {
  src: string; alt: string; className: string;
  animProps: Record<string, unknown>
}) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`absolute object-cover rounded-[2rem] z-10 pointer-events-none drop-shadow-xl ${className}`}
      {...animProps}
    />
  )
}

// ─── Typewriter hook (loops every `pause` ms) ──
function useTypewriter(text: string, speed = 60, pause = 5000) {
  const [displayed, setDisplayed] = useState("")
  const [phase, setPhase] = useState<"typing" | "waiting" | "erasing">("typing")

  useEffect(() => {
    setDisplayed("")
    setPhase("typing")
  }, [text])

  useEffect(() => {
    if (phase === "typing") {
      if (displayed.length < text.length) {
        const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase("erasing"), pause)
        return () => clearTimeout(t)
      }
    }
    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length - 1)), speed / 2)
        return () => clearTimeout(t)
      } else {
        setPhase("typing")
      }
    }
  }, [displayed, phase, text, speed, pause])

  return { displayed, isTyping: phase === "typing" }
}

// ─── Animated counter ──────────────────────────
function AnimatedCounter({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1500
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

// ─── Stagger container variants ───────────────
const nameContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
}
const nameLetter = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
}

export function Hero() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  // Pink glow cursor tracking
  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)
  const glowX = useSpring(rawX, { stiffness: 120, damping: 18 })
  const glowY = useSpring(rawY, { stiffness: 120, damping: 18 })
  const [showGlow, setShowGlow] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      rawX.set(e.clientX - rect.left)
      rawY.set(e.clientY - rect.top)
    }
    section.addEventListener("mousemove", onMove)
    section.addEventListener("mouseenter", () => setShowGlow(true))
    section.addEventListener("mouseleave", () => setShowGlow(false))
    return () => {
      section.removeEventListener("mousemove", onMove)
    }
  }, [rawX, rawY])

  const { displayed: typedRole, isTyping } = useTypewriter(t.hero.role, 55, 5000)

  const stats = [
    { value: PORTFOLIO_CONFIG.projects.length, label: t.hero.stats.projects },
    { value: PORTFOLIO_CONFIG.skills.length, label: t.hero.stats.skills },
    { value: PORTFOLIO_CONFIG.games.length, label: t.hero.stats.games },
  ]

  const nickname = PORTFOLIO_CONFIG.personalInfo.nickname

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* ── 3D Canvas Background ── */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Pink glow cursor ── */}
      {showGlow && (
        <motion.div
          className="absolute z-[5] pointer-events-none rounded-full"
          style={{
            x: glowX,
            y: glowY,
            translateX: "-50%",
            translateY: "-50%",
            width: 280,
            height: 280,
            background: "radial-gradient(circle, rgba(255,107,107,0.18) 0%, rgba(255,107,107,0.04) 60%, transparent 100%)",
          }}
        />
      )}

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-transparent via-background/20 to-background/80 pointer-events-none" />

      {/* ── Floating GIFs ── */}
      <FloatingGif
        src={PORTFOLIO_CONFIG.gifs.heroChibi}
        alt="chibi"
        className="top-[15%] left-[5%] w-20 h-20 md:w-28 md:h-28 opacity-90"
        animProps={{
          animate: { y: [0, -16, 0], rotate: [-5, 5, -5] },
          transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
        }}
      />
      <FloatingGif
        src={PORTFOLIO_CONFIG.gifs.heroCat}
        alt="cat"
        className="top-[20%] right-[5%] w-24 h-24 md:w-32 md:h-32 opacity-90"
        animProps={{
          animate: { y: [0, 18, 0], x: [0, 5, 0] },
          transition: { repeat: Infinity, duration: 5.5, ease: "easeInOut" }
        }}
      />
      <FloatingGif
        src={PORTFOLIO_CONFIG.gifs.heroStar}
        alt="star"
        className="bottom-[25%] left-[8%] w-16 h-16 opacity-70"
        animProps={{
          animate: { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] },
          transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 mt-20 gap-6 max-w-3xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/30 backdrop-blur-sm border border-primary/50 text-sm font-bold text-foreground/90 shadow-lg"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          {t.hero.badge}
        </motion.div>

        {/* Name — stagger each letter */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-bold text-foreground/70 mb-2"
          >
            {t.hero.greeting}
          </motion.p>

          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tight leading-none drop-shadow-sm flex justify-center"
            variants={nameContainer}
            initial="hidden"
            animate="visible"
            aria-label={nickname}
          >
            {nickname.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={nameLetter}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-pink-400 via-purple-400 to-green-400"
                whileHover={{ y: -12, scale: 1.15, transition: { type: "spring", stiffness: 400 } }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl font-semibold text-foreground/80 mt-2"
          >
            {PORTFOLIO_CONFIG.personalInfo.fullName}
          </motion.p>
        </div>

        {/* Typewriter role */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-base md:text-lg text-foreground/70 max-w-md min-h-[2rem] font-medium"
        >
          {typedRole}
          <motion.span
            animate={{ opacity: isTyping ? [1, 0, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 0.7 }}
            className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle"
          />
        </motion.p>

        {/* Stats with counter animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex gap-6 md:gap-10 mt-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center bg-white/20 dark:bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/30 shadow-inner cursor-default"
              whileHover={{
                scale: 1.1,
                x: [0, -4, 4, -4, 4, 0],
                transition: { x: { duration: 0.4 }, scale: { duration: 0.2 } }
              }}
            >
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                <AnimatedCounter target={stat.value} />
              </span>
              <span className="text-xs font-semibold text-foreground/60 mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator — smooth scroll on click ── */}
      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-foreground/50 cursor-pointer hover:text-foreground/80 transition-colors bg-transparent border-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-xs font-semibold tracking-widest uppercase">{t.hero.scrollDown}</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </section>
  )
}

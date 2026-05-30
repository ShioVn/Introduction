"use client"
// ═══════════════════════════════════════════════
// HERO SECTION — Optimized: removed heavy glow cursor,
// reduced 3D particles, lazy canvas, memoized scene
// ═══════════════════════════════════════════════
import { useLanguage } from "@/components/language-provider"
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { motion, useInView } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Stars, Sphere, MeshDistortMaterial, Torus } from "@react-three/drei"
import { Suspense, useEffect, useRef, useState, memo } from "react"
import { ChevronDown } from "lucide-react"

// ─── Fixed positions — no Math.random in render ──
const PARTICLE_POSITIONS: [number, number, number][] = [
  [3.2, 2.1, -4], [-4.5, -1.5, -5], [2.8, -2.8, -3.5], [-2.1, 3.5, -4.5],
]

// Memoized 3D scene — never re-renders from parent state changes
const Scene3D = memo(function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.0} color="#ffd1dc" />

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.2}>
        <Sphere args={[1.8, 32, 32]} position={[3.5, 0, -2]}>
          <MeshDistortMaterial color="#ffd1dc" distort={0.35} speed={1.5} roughness={0.15} metalness={0.2} opacity={0.7} transparent />
        </Sphere>
      </Float>

      <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.5}>
        <Sphere args={[0.9, 24, 24]} position={[-4, 1.5, -1]}>
          <MeshDistortMaterial color="#b2fba5" distort={0.4} speed={2} roughness={0.1} metalness={0.4} opacity={0.6} transparent />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={0.8}>
        <Torus args={[1.2, 0.3, 12, 40]} position={[-3, -2, -1]} rotation={[0.5, 0.5, 0]}>
          <meshStandardMaterial color="#e6e6fa" metalness={0.7} roughness={0.3} />
        </Torus>
      </Float>

      {/* Reduced to 4 particles (was 8) */}
      {PARTICLE_POSITIONS.map((pos, i) => (
        <Float key={i} speed={1 + i * 0.4} rotationIntensity={0.4} floatIntensity={0.8}>
          <Sphere args={[0.12, 10, 10]} position={pos}>
            <meshStandardMaterial color={["#ffd1dc", "#e6e6fa", "#b2fba5", "#fdfbf7"][i % 4]} metalness={0.4} roughness={0.3} />
          </Sphere>
        </Float>
      ))}

      <Stars radius={80} depth={40} count={1500} factor={3} saturation={0.3} fade speed={0.5} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
    </>
  )
})

// ─── Floating GIF — memoized ──────────────────
const FloatingGif = memo(function FloatingGif({ src, alt, className, animProps }: {
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
})

// ─── Typewriter hook — loops every `pause` ms ──
function useTypewriter(text: string, speed = 60, pause = 5000) {
  const [displayed, setDisplayed] = useState("")
  const [phase, setPhase] = useState<"typing" | "erasing">("typing")

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

// ─── Animated counter — only fires once when in view ──
function AnimatedCounter({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!isInView || started.current) return
    started.current = true
    const duration = 1500
    const steps = 40
    const stepTime = duration / steps
    const increment = target / steps
    let current = 0
    let step = 0
    const timer = setInterval(() => {
      step++
      current = Math.round(increment * step)
      if (step >= steps) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, stepTime)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

// ─── Stagger variants ──────────────────────────
const nameContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
}
const nameLetter = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 240, damping: 22 } },
}

export function Hero() {
  const { t } = useLanguage()
  const { displayed: typedRole, isTyping } = useTypewriter(t.hero.role, 55, 5000)

  const stats = [
    { value: PORTFOLIO_CONFIG.projects.length, label: t.hero.stats.projects },
    { value: PORTFOLIO_CONFIG.skills.length, label: t.hero.stats.skills },
    { value: PORTFOLIO_CONFIG.games.length, label: t.hero.stats.games },
  ]

  const nickname = PORTFOLIO_CONFIG.personalInfo.nickname

  const handleScrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* ── 3D Canvas Background ── */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 55 }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

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
          transition={{ duration: 0.6, delay: 0.2 }}
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
            transition={{ duration: 0.5, delay: 0.4 }}
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
                whileHover={{ y: -10, scale: 1.12, transition: { type: "spring", stiffness: 350, damping: 18 } }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl md:text-2xl font-semibold text-foreground/80 mt-2"
          >
            {PORTFOLIO_CONFIG.personalInfo.fullName}
          </motion.p>
        </div>

        {/* Typewriter role */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
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
          transition={{ duration: 0.7, delay: 1.3 }}
          className="flex gap-6 md:gap-10 mt-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center bg-white/20 dark:bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/30 shadow-inner cursor-default"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                <AnimatedCounter target={stat.value} />
              </span>
              <span className="text-xs font-semibold text-foreground/60 mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-foreground/50 hover:text-foreground/80 transition-colors bg-transparent border-none"
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

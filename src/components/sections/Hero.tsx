"use client"
// ═══════════════════════════════════════════════
// HERO SECTION — Upgraded: Big 3D scene, no CV button,
// floating stats, anime GIFs, glassmorphism card
// ═══════════════════════════════════════════════
import { useLanguage } from "@/components/language-provider"
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Stars, Sphere, MeshDistortMaterial, Torus } from "@react-three/drei"
import { Suspense } from "react"
import { ChevronDown } from "lucide-react"

// ─── 3D Background Scene ─────────────────────
// Fixed positions to avoid hydration mismatch from Math.random()
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

      {/* Main distorted sphere */}
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.5}>
        <Sphere args={[1.8, 64, 64]} position={[3.5, 0, -2]}>
          <MeshDistortMaterial
            color="#ffd1dc"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.3}
            opacity={0.7}
            transparent
          />
        </Sphere>
      </Float>

      {/* Secondary sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.0, 32, 32]} position={[-4, 1.5, -1]}>
          <MeshDistortMaterial
            color="#b2fba5"
            distort={0.5}
            speed={3}
            roughness={0}
            metalness={0.5}
            opacity={0.6}
            transparent
          />
        </Sphere>
      </Float>

      {/* Torus ring */}
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1}>
        <Torus args={[1.2, 0.3, 16, 60]} position={[-3, -2, -1]} rotation={[0.5, 0.5, 0]}>
          <meshStandardMaterial color="#e6e6fa" metalness={0.8} roughness={0.2} />
        </Torus>
      </Float>

      {/* Small floating particles — FIXED positions (no Math.random in render) */}
      {PARTICLE_POSITIONS.map((pos, i) => (
        <Float key={i} speed={1 + i * 0.3} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[0.15, 16, 16]} position={pos}>
            <meshStandardMaterial
              color={["#ffd1dc", "#e6e6fa", "#b2fba5", "#fdfbf7"][i % 4]}
              metalness={0.5}
              roughness={0.2}
            />
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

export function Hero() {
  const { t } = useLanguage()

  const stats = [
    { value: PORTFOLIO_CONFIG.projects.length, label: t.hero.stats.projects },
    { value: PORTFOLIO_CONFIG.skills.length, label: t.hero.stats.skills },
    { value: PORTFOLIO_CONFIG.games.length, label: t.hero.stats.games },
  ]

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* ── 3D Canvas Background ── */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
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
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/30 backdrop-blur-sm border border-primary/50 text-sm font-bold text-foreground/90 shadow-lg"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          {t.hero.badge}
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
        >
          <p className="text-xl md:text-2xl font-bold text-foreground/70 mb-2">{t.hero.greeting}</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-pink-400 via-purple-400 to-green-400 leading-none drop-shadow-sm">
            {PORTFOLIO_CONFIG.personalInfo.nickname}
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-foreground/80 mt-2">
            {PORTFOLIO_CONFIG.personalInfo.fullName}
          </p>
        </motion.div>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg text-foreground/70 max-w-md"
        >
          {t.hero.role}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-6 md:gap-10 mt-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-white/20 dark:bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/30 shadow-inner"
            >
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                {stat.value}+
              </span>
              <span className="text-xs font-semibold text-foreground/60 mt-1">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-foreground/50"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-xs font-semibold tracking-widest uppercase">{t.hero.scrollDown}</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  )
}

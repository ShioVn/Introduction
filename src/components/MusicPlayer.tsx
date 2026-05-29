"use client"
import { useState, useEffect, useRef } from "react"
import { Music, Play, Pause } from "lucide-react"
import { PORTFOLIO_CONFIG } from "@/config/constants"
import { motion } from "framer-motion"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Only initialize audio on client
    const audio = new Audio(PORTFOLIO_CONFIG.music.audioUrl)
    audio.loop = true
    audio.volume = 0.3 // soft background music
    audioRef.current = audio

    const tryPlay = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log("Autoplay blocked, waiting for interaction:", e))
      }
    }

    // Attempt to auto-play immediately
    tryPlay()

    // Browsers often block autoplay. Add a one-time click listener to start music on first interaction
    const handleFirstInteraction = () => {
      tryPlay()
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("keydown", handleFirstInteraction)
    }

    document.addEventListener("click", handleFirstInteraction)
    document.addEventListener("keydown", handleFirstInteraction)
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("keydown", handleFirstInteraction)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e))
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-white/70 dark:bg-black/70 backdrop-blur-md p-2 rounded-full shadow-[0_0_15px_rgba(255,209,220,0.5)] border border-primary/30">
      <button 
        onClick={togglePlay} 
        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/30 hover:bg-primary/60 transition-colors text-foreground"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-1" />}
      </button>
      <motion.div 
        animate={{ rotate: isPlaying ? 360 : 0 }} 
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="mr-2"
      >
        <Music className={`w-5 h-5 ${isPlaying ? "text-pink-400" : "text-gray-400"}`} />
      </motion.div>
    </div>
  )
}

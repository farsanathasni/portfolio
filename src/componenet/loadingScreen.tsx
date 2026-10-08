import { useEffect, useState } from "react"

type LoadingScreenProps = {
  onComplete: () => void
}

function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const exitDelay = window.setTimeout(
      () => setIsExiting(true),
      prefersReducedMotion ? 80 : 1550,
    )
    const completionDelay = window.setTimeout(
      onComplete,
      prefersReducedMotion ? 180 : 1900,
    )

    return () => {
      window.clearTimeout(exitDelay)
      window.clearTimeout(completionDelay)
      document.body.style.overflow = previousOverflow
    }
  }, [onComplete])

  return (
    <div
      aria-label="Loading portfolio"
      role="status"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#070b14] ${
        isExiting ? "loading-exit pointer-events-none" : ""
      }`}
    >
      <div className="w-[min(19rem,75vw)] text-center">
        <p className="loading-wordmark text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Farsana<span className="text-cyan-300">.</span>
        </p>
        <div
          aria-hidden="true"
          className="mt-7 h-px overflow-hidden bg-slate-700/70"
        >
          <div className="loading-line h-full w-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-emerald-300 shadow-[0_0_14px_rgba(34,211,238,0.6)]" />
        </div>
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.28em] text-slate-500">
          Full-stack developer
        </p>
      </div>
    </div>
  )
}

export default LoadingScreen

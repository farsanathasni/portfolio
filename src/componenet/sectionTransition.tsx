import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { getProjectRouteId } from "../data/projects"

type RevealRequest = {
  sectionId: string
  version: number
}

type SectionTransitionContextValue = {
  navigateTo: (href: string, updateHistory?: boolean) => void
  currentPath: string
  isTransitioning: boolean
  transitionTarget: string | null
  revealRequest: RevealRequest | null
}

type SectionTransitionProviderProps = {
  children: ReactNode
}

type TransitionPhase = "idle" | "covering" | "uncovering"

const SectionTransitionContext =
  createContext<SectionTransitionContextValue | null>(null)

function SectionTransitionProvider({
  children,
}: SectionTransitionProviderProps) {
  const [phase, setPhase] = useState<TransitionPhase>("idle")
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [transitionTarget, setTransitionTarget] = useState<string | null>(null)
  const [revealRequest, setRevealRequest] = useState<RevealRequest | null>(null)
  const versionRef = useRef(0)
  const frameRef = useRef<number | null>(null)
  const timeoutRefs = useRef<number[]>([])

  const clearPendingTransition = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
    timeoutRefs.current.forEach((timeout) => window.clearTimeout(timeout))
    timeoutRefs.current = []
  }, [])

  const navigateTo = useCallback(
    (href: string, updateHistory = true) => {
      let destination = new URL(href, window.location.href)
      if (href.startsWith("#") && !document.getElementById(href.slice(1))) {
        if (currentPath === "/") return
        destination = new URL(`/${href}`, window.location.origin)
      }

      const targetPath = destination.pathname || "/"
      const targetHash = destination.hash
      const isProjectRoute = getProjectRouteId(targetPath) !== null
      if (targetPath !== "/" && !isProjectRoute) return
      const sectionId = targetHash.slice(1)
      const revealId = isProjectRoute
        ? getProjectRouteId(targetPath)
        : sectionId || "home"
      if (!revealId) return

      const samePage = targetPath === currentPath
      const sectionTarget = samePage
        ? sectionId
          ? document.getElementById(sectionId)
          : isProjectRoute
            ? document.getElementById(revealId)
            : null
        : null
      const targetExists = isProjectRoute
        ? true
        : samePage
          ? sectionTarget !== null
          : true
      if (!targetExists) return

      clearPendingTransition()
      versionRef.current += 1
      const navigationVersion = versionRef.current

      const destinationUrl = `${targetPath}${targetHash}`
      if (
        updateHistory &&
        `${window.location.pathname}${window.location.hash}` !== destinationUrl
      ) {
        window.history.pushState(null, "", destinationUrl)
      }

      setTransitionTarget(revealId)

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches

      const revealSection = () => {
        if (navigationVersion !== versionRef.current) return
        setRevealRequest({ sectionId: revealId, version: navigationVersion })
        setTransitionTarget(null)
        setPhase("idle")
      }

      if (reducedMotion) {
        const top = Math.max(
          0,
          (sectionTarget?.getBoundingClientRect().top ?? 0) +
            window.scrollY -
            96,
        )
        window.scrollTo(0, top)
        if (!samePage) setCurrentPath(targetPath)
        revealSection()
        return
      }

      setPhase("covering")
      timeoutRefs.current.push(
        window.setTimeout(() => {
          if (navigationVersion !== versionRef.current) return

          if (!samePage) {
            setCurrentPath(targetPath)
            window.scrollTo(0, 0)
            frameRef.current = window.requestAnimationFrame(() => {
              frameRef.current = window.requestAnimationFrame(() => {
                if (navigationVersion !== versionRef.current) return
                const destinationElement = sectionId
                  ? document.getElementById(sectionId)
                  : document.getElementById(revealId)
                if (destinationElement) {
                  const top = Math.max(
                    0,
                    destinationElement.getBoundingClientRect().top +
                      window.scrollY -
                      96,
                  )
                  window.scrollTo(0, top)
                }
                frameRef.current = null
                setPhase("uncovering")
                timeoutRefs.current.push(
                  window.setTimeout(revealSection, 340),
                )
              })
            })
            return
          }

          if (!sectionTarget) return
          const startY = window.scrollY
          const targetY = Math.max(
            0,
            sectionTarget.getBoundingClientRect().top + startY - 96,
          )
          const distance = targetY - startY
          const duration = Math.min(950, Math.max(380, Math.abs(distance) * 0.28))
          const startTime = performance.now()

          const scrollFrame = (now: number) => {
            if (navigationVersion !== versionRef.current) return
            const progress = Math.min((now - startTime) / duration, 1)
            const easedProgress = 1 - Math.pow(1 - progress, 3)
            window.scrollTo(0, startY + distance * easedProgress)

            if (progress < 1) {
              frameRef.current = window.requestAnimationFrame(scrollFrame)
              return
            }

            frameRef.current = null
            setPhase("uncovering")
            timeoutRefs.current.push(
              window.setTimeout(revealSection, 340),
            )
          }

          frameRef.current = window.requestAnimationFrame(scrollFrame)
        }, 320),
      )
    },
    [clearPendingTransition, currentPath],
  )

  useEffect(() => {
    const handlePopState = () => {
      navigateTo(
        `${window.location.pathname}${window.location.hash || (window.location.pathname === "/" ? "#home" : "")}`,
        false,
      )
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [navigateTo])

  useEffect(
    () => () => {
      clearPendingTransition()
    },
    [clearPendingTransition],
  )

  const contextValue = useMemo(
    () => ({
      navigateTo,
      currentPath,
      isTransitioning: phase !== "idle",
      transitionTarget,
      revealRequest,
    }),
    [navigateTo, currentPath, phase, transitionTarget, revealRequest],
  )

  return (
    <SectionTransitionContext.Provider value={contextValue}>
      {children}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[90] bg-[#03060b] transition-opacity duration-300 ease-in-out ${
          phase === "idle" ? "pointer-events-none" : "pointer-events-auto"
        } ${phase === "covering" ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className={`absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-cyan-300 via-cyan-400 to-emerald-300 transition-transform duration-300 ${
            phase === "covering" ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </div>
    </SectionTransitionContext.Provider>
  )
}

export function useSectionTransition() {
  const context = useContext(SectionTransitionContext)
  if (!context) {
    throw new Error(
      "useSectionTransition must be used within SectionTransitionProvider",
    )
  }
  return context
}

export default SectionTransitionProvider

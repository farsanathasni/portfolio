import { useCallback, useEffect, useRef, useState } from "react"
import { useSectionTransition } from "../componenet/sectionTransition"

function prefersReducedMotion() {
  return (
    typeof window === "undefined" ||
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

function useScrollReveal<T extends HTMLElement>(sectionId: string) {
  const { isTransitioning, transitionTarget, revealRequest } =
    useSectionTransition()
  const ref = useRef<T>(null)
  const [isRevealed, setIsRevealed] = useState(prefersReducedMotion)
  const [isContentRevealed, setIsContentRevealed] =
    useState(prefersReducedMotion)
  const [headingRevealVersion, setHeadingRevealVersion] = useState<number | null>(
    null,
  )

  useEffect(() => {
    if (transitionTarget === sectionId && isTransitioning) {
      const reducedMotion = prefersReducedMotion()
      setIsRevealed(reducedMotion)
      setIsContentRevealed(reducedMotion)
      setHeadingRevealVersion(null)
    }
  }, [isTransitioning, sectionId, transitionTarget])

  useEffect(() => {
    if (revealRequest?.sectionId === sectionId) {
      setIsRevealed(true)
      setIsContentRevealed(prefersReducedMotion())
      setHeadingRevealVersion(revealRequest.version)
    }
  }, [revealRequest, sectionId])

  const onHeadingRevealComplete = useCallback(
    (version: number) => {
      if (version !== headingRevealVersion) return
      setIsContentRevealed(true)
    },
    [headingRevealVersion],
  )

  useEffect(() => {
    const element = ref.current
    if (isRevealed || isTransitioning || !element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsRevealed(true)
        setIsContentRevealed(true)
        observer.unobserve(entry.target)
      },
      {
        rootMargin: "0px 0px -48px 0px",
        threshold: 0.08,
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [isRevealed, isTransitioning])

  return {
    ref,
    isRevealed,
    isContentRevealed,
    headingRevealVersion,
    onHeadingRevealComplete,
  }
}

export default useScrollReveal

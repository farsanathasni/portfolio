import { useEffect, useRef } from "react"

type LetterRevealSegment = {
  text: string
  className?: string
}

type LetterRevealProps = {
  segments: LetterRevealSegment[]
  label: string
  revealVersion: number | null
  onComplete: (version: number) => void
}

function LetterReveal({
  segments,
  label,
  revealVersion,
  onComplete,
}: LetterRevealProps) {
  const completedVersion = useRef<number | null>(null)
  const lastCharacterIndex = segments.reduce(
    (total, segment) => total + Array.from(segment.text).length,
    0,
  ) - 1
  let characterIndex = 0

  useEffect(() => {
    if (
      revealVersion === null ||
      completedVersion.current === revealVersion ||
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    completedVersion.current = revealVersion
    onComplete(revealVersion)
  }, [onComplete, revealVersion])

  const completeReveal = () => {
    if (
      revealVersion === null ||
      completedVersion.current === revealVersion
    ) {
      return
    }

    completedVersion.current = revealVersion
    onComplete(revealVersion)
  }

  return (
    <span
      role="text"
      aria-label={label}
      className={`letter-reveal ${revealVersion === null ? "" : "is-playing"}`}
    >
      {segments.map((segment, segmentIndex) => (
        <span key={`${revealVersion ?? "static"}-segment-${segmentIndex}`} className={segment.className}>
          {Array.from(segment.text, (character) => {
            const index = characterIndex
            characterIndex += 1

            return (
              <span
                key={`${revealVersion ?? "static"}-${index}`}
                data-letter
                onAnimationEnd={index === lastCharacterIndex ? completeReveal : undefined}
                style={{
                  animationDelay:
                    revealVersion === null ? undefined : `${index * 22}ms`,
                }}
              >
                {character === " " ? "\u00a0" : character}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

export default LetterReveal

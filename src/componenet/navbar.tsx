import { useEffect, useState } from "react"
import { useSectionTransition } from "./sectionTransition"

const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
]

function Navbar() {
  const { navigateTo } = useSectionTransition()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 12)
    updateScrollState()
    window.addEventListener("scroll", updateScrollState, { passive: true })

    const sections = navigationLinks
      .map(({ href }) => document.querySelector(href))
      .filter((section): section is Element => section !== null)

    if (!("IntersectionObserver" in window)) {
      return () => window.removeEventListener("scroll", updateScrollState)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const currentId = visibleSections[0]?.target.id
        if (currentId) setActiveSection(`#${currentId}`)
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.15, 0.35] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", updateScrollState)
    }
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }
    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [isMenuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Main navigation"
        className={`relative mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-slate-700/70 px-4 py-3 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 sm:px-5 ${
          isScrolled
            ? "bg-[#0b1220]/95 shadow-xl shadow-black/25"
            : "bg-[#0b1220]/70 shadow-lg shadow-black/10"
        }`}
      >
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault()
            navigateTo("#home")
          }}
          className="group shrink-0 text-xl font-bold tracking-tight text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
        >
          Farsana<span className="text-cyan-300 transition-colors group-hover:text-emerald-300">.</span>
        </a>

        <div className="hidden items-center gap-0.5 lg:flex">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault()
                navigateTo(link.href)
              }}
              aria-current={activeSection === link.href ? "location" : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
                activeSection === link.href
                  ? "bg-cyan-300/10 text-cyan-200"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            className="hidden rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2.5 text-sm font-semibold text-cyan-100 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-300/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none sm:inline-flex"
          >
            Resume <span aria-hidden="true" className="ml-1.5">↗</span>
          </a>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 transition-colors hover:border-cyan-300/40 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 lg:hidden"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-5 w-5"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="mobile-menu-enter absolute left-2 right-2 top-[calc(100%+0.65rem)] rounded-2xl border border-slate-700 bg-[#0b1220]/95 p-3 shadow-xl shadow-black/20 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="grid gap-1">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={activeSection === link.href ? "location" : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    setIsMenuOpen(false)
                    navigateTo(link.href)
                  }}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-cyan-300 ${
                    activeSection === link.href
                      ? "bg-cyan-300/10 text-cyan-200"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                onClick={() => setIsMenuOpen(false)}
                className="mt-1 rounded-xl bg-cyan-300 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-200 sm:hidden"
              >
                Download Resume
              </a>
            </nav>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar

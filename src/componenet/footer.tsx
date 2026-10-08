import useScrollReveal from "../hooks/useScrollReveal"
import { useSectionTransition } from "./sectionTransition"

const navigationLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
]

const profileLinks = [
  {
    label: "GitHub",
    href: "https://github.com/farsanathasni",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/farsana-thasni-b17686389/?isSelfProfile=true",
    external: true,
  },
  { label: "Resume", href: "/resume.pdf", external: false },
]

function Footer() {
  const { ref, isRevealed, isContentRevealed } =
    useScrollReveal<HTMLElement>("footer")
  const { navigateTo } = useSectionTransition()

  return (
    <footer
      ref={ref}
      id="footer"
      className={`scroll-reveal border-t border-slate-800 bg-slate-950 px-6 py-10 text-slate-300 sm:px-8 sm:py-12 ${isRevealed ? "is-revealed" : ""} ${isContentRevealed ? "is-content-revealed" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
          <div data-reveal>
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault()
                navigateTo("#home")
              }}
              className="inline-flex items-center text-xl font-bold tracking-tight text-white transition-colors hover:text-blue-300 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              Farsana<span className="text-blue-400">.</span>
            </a>
            <p className="mt-2 text-sm font-medium text-slate-400">
              MERN Stack Developer
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <nav data-reveal aria-label="Footer navigation">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Quick links
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(event) => {
                        event.preventDefault()
                        navigateTo(link.href)
                      }}
                      className="text-sm text-slate-300 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav data-reveal aria-label="Social and professional links">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Find me online
              </h2>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                {profileLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-slate-300 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
                    >
                      {link.label}
                      {link.external && (
                        <span aria-hidden="true" className="ml-1 text-slate-500">
                          ↗
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div data-reveal className="mt-10 border-t border-slate-800 pt-5 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Farsana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
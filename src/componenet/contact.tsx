import useScrollReveal from "../hooks/useScrollReveal"
import LetterReveal from "./letterReveal"

const contactLinks = [
  {
    label: "Email",
    detail: "farsanathasni9846@gmail.com",
    href: "mailto:farsanathasni9846@gmail.com",
    action: "Send an email",
    external: false,
  },
  {
    label: "Mobile",
    detail: "+91 8891749846",
    href: "tel:+918891749846",
    action: "Call mobile",
    external: false,
  },
  {
    label: "GitHub",
    detail: "github.com/farsanathasni",
    href: "https://github.com/farsanathasni",
    action: "View GitHub",
    external: true,
  },
  {
    label: "LinkedIn",
    detail: "Connect professionally",
    href: "https://www.linkedin.com/in/farsana-thasni-b17686389/?isSelfProfile=true",
    action: "View LinkedIn",
    external: true,
  },
]

function Contact() {
  const {
    ref,
    isRevealed,
    isContentRevealed,
    headingRevealVersion,
    onHeadingRevealComplete,
  } = useScrollReveal<HTMLElement>("contact")

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-heading"
className={`scroll-reveal relative overflow-hidden bg-slate-50 px-6 pt-[30px] pb-20 sm:px-8 sm:pt-[30px] sm:pb-24 lg:pt-[40px] lg:pb-28 ${isRevealed ? "is-revealed" : ""} ${isContentRevealed ? "is-content-revealed" : ""}`}    >
      <div className="mx-auto max-w-6xl">
        <div className="contact-spotlight relative isolate overflow-hidden rounded-3xl border shadow-xl shadow-slate-900/5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-36 -z-10 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-20 -z-10 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl"
          />

          <div className="grid gap-10 p-6 sm:p-9 lg:grid-cols-[1fr_0.9fr] lg:gap-14 lg:p-12">
            <div className="flex flex-col items-start justify-center">
              <div data-heading-reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Contact
              </p>
              <h2
                id="contact-heading"
                className="max-w-xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-4xl"
              >
                <LetterReveal
                  label="Let's Build Something Together"
                  segments={[{ text: "Let's Build Something Together" }]}
                  revealVersion={headingRevealVersion}
                  onComplete={onHeadingRevealComplete}
                />
              </h2>
              </div>
              <div data-reveal>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                I&apos;m always interested in learning, building real-world
                applications, and exploring new opportunities. If you&apos;d
                like to connect or discuss a project, feel free to reach out.
              </p>
              <a
                href="/resume.pdf"
                download
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-700/15 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-blue-700/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 motion-reduce:transition-none"
              >
                Download Resume
                <span aria-hidden="true" className="ml-2">
                  ↓
                </span>
              </a>
              </div>
            </div>

            <div className="reveal-stagger grid content-center gap-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  data-reveal
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-blue-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 motion-reduce:transition-none sm:p-5"
                >
                  <span className="min-w-0">
                    <span className="block font-semibold text-slate-900">
                      {link.label}
                    </span>
                    <span className="mt-1 block truncate text-sm text-slate-500">
                      {link.detail}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-blue-700 transition-transform group-hover:translate-x-0.5">
                    {link.action}
                    <span aria-hidden="true" className="ml-1">
                      ↗
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
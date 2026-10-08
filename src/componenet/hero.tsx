import profileImage from "../assets/farsana.jpeg"
import { useSectionTransition } from "./sectionTransition"

type HeroProps = {
  hasEntered: boolean
}

function Hero({ hasEntered }: HeroProps) {
  const { navigateTo } = useSectionTransition()
  const reveal = (animationClass: string) =>
    hasEntered ? `hero-reveal ${animationClass}` : "opacity-0"

  return (
    <section
      id="home"
      className="tech-grid relative isolate flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-white via-white to-slate-50 px-6 pb-16 pt-28 sm:px-8 lg:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="animate-drift absolute -left-40 top-24 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="animate-drift absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="max-w-2xl">
          <p className={`${reveal("hero-reveal-intro")} mb-6 inline-flex items-center gap-2.5 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm shadow-blue-900/5`}>
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-emerald-500"
            />
            Available for opportunities
          </p>

          <p className={`${reveal("hero-reveal-role")} mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700`}>
            MERN Stack Developer
          </p>
          <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            <span className={reveal("hero-reveal-greeting")}>Hi, I’m </span>
            <span className={`${reveal("hero-reveal-name")} hero-name text-blue-700`}>
              Farsana Thasni.
            </span>
          </h1>

          <p className={`${reveal("hero-reveal-description")} mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl`}>
            I build real-world full-stack web applications with thoughtful user
            experiences and reliable, scalable foundations.
          </p>

          <div className={`${reveal("hero-reveal-actions")} mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap`}>
            <a
              href="#projects"
              onClick={(event) => {
                event.preventDefault()
                navigateTo("#projects")
              }}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-700/15 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-blue-700/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 motion-reduce:transition-none"
            >
              View My Projects
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-6 py-3 font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 motion-reduce:transition-none"
            >
              Download Resume
            </a>
          </div>

          <div className={`${reveal("hero-reveal-actions")} mt-8 flex items-center gap-5 text-sm font-medium`}>
            <a
              href="https://github.com/farsanathasni"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-blue-700 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <span aria-hidden="true" className="h-4 w-px bg-slate-300" />
            <a
              href="https://www.linkedin.com/in/farsana-thasni-b17686389/?isSelfProfile=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-blue-700 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className={`${hasEntered ? "hero-image-reveal" : "scale-[0.96] opacity-0"} relative mx-auto w-full max-w-md px-3 py-4 sm:px-6`}>
          <div
            aria-hidden="true"
            className="hero-halo animate-float-slow absolute inset-0 scale-110 rounded-full blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-5 inset-y-2 rotate-6 rounded-[2.5rem] border border-cyan-300/15"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-slate-700/80 bg-slate-900 shadow-2xl shadow-cyan-950/30 transition duration-500 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-cyan-900/30 motion-reduce:transition-none">
            <img
              src={profileImage}
              alt="Farsana Thasni, MERN Stack Developer"
              className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-[1.055] motion-reduce:transition-none"
              fetchPriority="high"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080d17]/35 via-transparent to-cyan-950/10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

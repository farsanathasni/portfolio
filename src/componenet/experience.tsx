import useScrollReveal from "../hooks/useScrollReveal"
import LetterReveal from "./letterReveal"

const responsibilities = [
  "Develop responsive interfaces using React and TypeScript",
  "Build and integrate REST APIs using Node.js and Express.js",
  "Work with MongoDB and Mongoose for database operations",
  "Implement authentication and authorization features",
  "Integrate third-party services and APIs",
  "Debug issues and identify root causes",
  "Work with Git and GitHub for version control",
  "Collaborate on real-world application development",
]

const technologies = [
  "React",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Mongoose",
  "REST APIs",
  "Authentication",
  "Git",
  "GitHub",
]

function Experience() {
  const {
    ref,
    isRevealed,
    isContentRevealed,
    headingRevealVersion,
    onHeadingRevealComplete,
  } = useScrollReveal<HTMLElement>("experience")

  return (
    <section
      ref={ref}
      id="experience"
      aria-labelledby="experience-heading"
className={`scroll-reveal relative overflow-hidden bg-slate-50 px-6 pt-[30px] pb-20 sm:px-8 sm:pt-[30px] sm:pb-24 lg:pt-[30px] lg:pb-28 ${isRevealed ? "is-revealed" : ""} ${isContentRevealed ? "is-content-revealed" : ""}`}    >
      <div className="mx-auto max-w-6xl">
        <div data-heading-reveal className="mb-12 max-w-2xl sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Experience
          </p>
          <h2
            id="experience-heading"
            className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
          >
            <LetterReveal
              label="Learning by building real-world applications."
              segments={[
                { text: "Learning by building" },
                { text: " real-world applications.", className: "block text-slate-500" },
              ]}
              revealVersion={headingRevealVersion}
              onComplete={onHeadingRevealComplete}
            />
          </h2>
        </div>

        <article data-reveal className="relative grid gap-8 rounded-3xl border border-slate-200/80 bg-slate-50/70 p-6 shadow-lg shadow-slate-900/5 sm:p-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12 lg:p-10">
          <div className="absolute bottom-8 left-0 top-8 hidden w-1 rounded-r-full bg-gradient-to-b from-blue-600 to-emerald-400 lg:block" />

          <div data-reveal className="lg:pl-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none"
                />
                Current position
              </span>
            </div>

            <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              MERN Stack Developer Intern
            </h3>
            <p className="mt-2 text-lg font-semibold text-blue-800">
              Bridgeon
            </p>
            <p className="mt-5 max-w-md leading-7 text-slate-600">
              Currently working on full-stack web application development using
              the MERN stack. Contributing to frontend and backend development,
              REST API integration, database operations, authentication, and
              building responsive user interfaces.
            </p>
          </div>

          <div data-reveal>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Responsibilities
              </h4>
              <ul className="reveal-stagger mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {responsibilities.map((responsibility) => (
                  <li
                    key={responsibility}
                    data-reveal
                    className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                    />
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Technologies used
              </h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-800"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Experience
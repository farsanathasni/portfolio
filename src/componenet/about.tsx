import useScrollReveal from "../hooks/useScrollReveal"
import LetterReveal from "./letterReveal"

const focusAreas = [
  {
    number: "01",
    title: "Frontend Development",
    description: "Building responsive, accessible interfaces with React.",
  },
  {
    number: "02",
    title: "Backend Development",
    description: "Creating dependable server-side applications with Node.js and Express.",
  },
  {
    number: "03",
    title: "Database Integration",
    description: "Working with MongoDB to organize and persist application data.",
  },
  {
    number: "04",
    title: "REST API Development",
    description: "Designing practical APIs that connect application layers.",
  },
]

function About() {
  const {
    ref,
    isRevealed,
    isContentRevealed,
    headingRevealVersion,
    onHeadingRevealComplete,
  } = useScrollReveal<HTMLElement>("about")

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
className={`scroll-reveal relative overflow-hidden bg-slate-50 px-6 pt-[30px] pb-20 sm:px-8 sm:pt-[30px] sm:pb-24 lg:pt-[30px] lg:pb-28 ${isRevealed ? "is-revealed" : ""} ${isContentRevealed ? "is-content-revealed" : ""}`}    >
      <div
        aria-hidden="true"
        className="animate-drift pointer-events-none absolute -right-40 top-12 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <div data-heading-reveal className="mb-12 max-w-2xl sm:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            About me
          </p>
          <h2
            id="about-heading"
            className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
          >
            <LetterReveal
              label="Curious by nature. Driven to build."
              segments={[
                { text: "Curious by nature." },
                { text: " Driven to build.", className: "block text-slate-500" },
              ]}
              revealVersion={headingRevealVersion}
              onComplete={onHeadingRevealComplete}
            />
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <div data-reveal className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-8">
              <p className="text-lg leading-8 text-slate-600">
                I’m <span className="font-semibold text-slate-900">Farsana Thasni</span>,
                a MERN Stack Developer currently working as a{" "}
                <span className="font-semibold text-slate-900">
                  MERN Stack Developer Intern at Bridgeon
                </span>
                . I’m interested in building real-world web applications that
                solve practical problems and deliver a thoughtful experience.
              </p>
              <p className="mt-5 leading-7 text-slate-600">
                I’m a quick learner, self-motivated, and dedicated. When
                technical challenges arise, I enjoy understanding their root
                cause and finding practical solutions—a problem-solving mindset
                I bring to every project.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["Quick learner", "Self-motivated", "Dedicated", "Problem solver"].map(
                  (strength) => (
                    <span
                      key={strength}
                      className="rounded-full border border-blue-100 bg-blue-50/70 px-3.5 py-1.5 text-sm font-medium text-blue-800"
                    >
                      {strength}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  What I do
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  Full-stack, end to end
                </h3>
              </div>
              <span
                aria-hidden="true"
                className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 font-mono text-lg font-bold text-blue-700 sm:flex"
              >
                {"</>"}
              </span>
            </div>
            <div className="reveal-stagger grid gap-3 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <article
                  key={area.number}
                  data-reveal
                  className="group rounded-2xl border border-slate-200/80 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 motion-reduce:transition-none"
                >
                  <p className="text-xs font-semibold tracking-[0.16em] text-blue-700">
                    {area.number}
                  </p>
                  <h4 className="mt-3 font-semibold text-slate-900 transition-colors group-hover:text-blue-800">
                    {area.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {area.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
import useScrollReveal from "../hooks/useScrollReveal"
import LetterReveal from "./letterReveal"

const educationItems = [
  {
    qualification: "Diploma in Optometry",
    institution: "Al Rayhan, Kondotty",
    description:
      "Diploma-level study in optometry at Al Rayhan in Kondotty.",
  },
  {
    qualification: "MERN Stack Development",
    institution: "Bridgeon Solutions",
    description:
      "Training in full-stack web development using the MERN stack.",
  },
]

function Education() {
  const {
    ref,
    isRevealed,
    isContentRevealed,
    headingRevealVersion,
    onHeadingRevealComplete,
  } = useScrollReveal<HTMLElement>("education")

  return (
    <section
      ref={ref}
      id="education"
      aria-labelledby="education-heading"
className={`scroll-reveal relative overflow-hidden bg-slate-50 px-6 pt-[30px] pb-20 sm:px-8 sm:pt-[30px] sm:pb-24 lg:pt-[30px] lg:pb-28 ${isRevealed ? "is-revealed" : ""} ${isContentRevealed ? "is-content-revealed" : ""}`}    >
      <div className="mx-auto max-w-6xl">
        <div data-heading-reveal className="mb-12 max-w-2xl sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Education
          </p>
          <h2
            id="education-heading"
            className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
          >
            <LetterReveal
              label="Learning across disciplines."
              segments={[
                { text: "Learning across" },
                { text: " disciplines.", className: "block text-slate-500" },
              ]}
              revealVersion={headingRevealVersion}
              onComplete={onHeadingRevealComplete}
            />
          </h2>
        </div>

        <ol className="reveal-stagger relative grid gap-5 md:grid-cols-2">
          {educationItems.map((item, index) => (
            <li
              key={item.qualification}
              data-reveal
              className="relative rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 motion-reduce:transition-none sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-mono text-sm font-semibold text-blue-700"
                >
                  0{index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    {item.qualification}
                  </h3>
                  <p className="mt-2 font-semibold text-blue-800">
                    {item.institution}
                  </p>
                  <p className="mt-4 leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Education
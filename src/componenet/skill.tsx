import useScrollReveal from "../hooks/useScrollReveal"
import LetterReveal from "./letterReveal"

const skillGroups = [
  {
    name: "Frontend",
    description: "Creating responsive, interactive user experiences.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Query",
    ],
    accent: "bg-blue-600",
  },
  {
    name: "Backend",
    description: "Building application logic and dependable APIs.",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication",
      "Authorization",
    ],
    accent: "bg-emerald-600",
  },
  {
    name: "Database",
    description: "Structuring, querying, and managing application data.",
    skills: ["MongoDB", "Mongoose", "PostgreSQL"],
    accent: "bg-indigo-600",
  },
  {
    name: "Tools & Technologies",
    description: "Tools and services used throughout development.",
    skills: ["Git", "GitHub", "Postman", "Vite", "AWS", "Cloudinary"],
    accent: "bg-slate-700",
  },
  {
    name: "Other",
    description: "Practical skills that support complete product delivery.",
    skills: [
      "Responsive Web Design",
      "API Integration",
      "Payment Integration",
      "Problem Solving",
    ],
    accent: "bg-cyan-700",
  },
]

function Skills() {
  const {
    ref,
    isRevealed,
    isContentRevealed,
    headingRevealVersion,
    onHeadingRevealComplete,
  } = useScrollReveal<HTMLElement>("skills")

  return (
    <section
      ref={ref}
      id="skills"
      aria-labelledby="skills-heading"
className={`scroll-reveal relative overflow-hidden bg-slate-50 px-6 pt-[30px] pb-20 sm:px-8 sm:pt-[30px] sm:pb-24 lg:pt-[70px] lg:pb-28 ${isRevealed ? "is-revealed" : ""} ${isContentRevealed ? "is-content-revealed" : ""}`}    >
      <div className="mx-auto max-w-6xl">
        <div data-heading-reveal className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Skills & technologies
          </p>
          <h2
            id="skills-heading"
            className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
          >
            <LetterReveal
              label="The tools I use to build across the stack."
              segments={[
                { text: "The tools I use to" },
                { text: " build across the stack.", className: "block text-slate-500" },
              ]}
              revealVersion={headingRevealVersion}
              onComplete={onHeadingRevealComplete}
            />
          </h2>
        </div>
        <p data-reveal className="mb-12 mt-5 max-w-xl text-base leading-7 text-slate-600 sm:mb-14 sm:text-lg">
          A selection of technologies and practices I work with to create
          practical, full-stack web applications.
        </p>

        <div className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <article
              key={group.name}
              data-reveal
              className={`rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg hover:shadow-slate-900/5 motion-reduce:transition-none sm:p-6 ${
                index === skillGroups.length - 1
                  ? "sm:col-span-2 lg:col-span-1"
                  : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${group.accent}`}
                />
                <div>
                  <h3 className="font-semibold tracking-tight text-slate-900">
                    {group.name}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {group.description}
                  </p>
                </div>
              </div>

              <ul className="reveal-badges mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    data-reveal="scale"
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-800"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
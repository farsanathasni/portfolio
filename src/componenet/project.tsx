import useScrollReveal from "../hooks/useScrollReveal"
import LetterReveal from "./letterReveal"
import ProjectVisual from "./projectVisual"
import { projects } from "../data/projects"
import { useSectionTransition } from "./sectionTransition"

const overviewProjects = projects.filter((project) => project.route)

function Projects() {
  const {
    ref,
    isRevealed,
    isContentRevealed,
    headingRevealVersion,
    onHeadingRevealComplete,
  } = useScrollReveal<HTMLElement>("projects")
  const { navigateTo } = useSectionTransition()

  return (
    <section
      ref={ref}
      id="projects"
      aria-labelledby="projects-heading"
      className={`scroll-reveal relative overflow-hidden bg-slate-50 px-6 pt-[30px] pb-20 sm:px-8 sm:pt-[30px] sm:pb-24 lg:pt-[30px] lg:pb-28 ${
        isRevealed ? "is-revealed" : ""
      } ${isContentRevealed ? "is-content-revealed" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div data-heading-reveal className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Selected work
            </p>
            <h2
              id="projects-heading"
              className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
            >
              <LetterReveal
                label="Projects built to solve real problems."
                segments={[
                  { text: "Projects built to" },
                  {
                    text: " solve real problems.",
                    className: "block text-slate-500",
                  },
                ]}
                revealVersion={headingRevealVersion}
                onComplete={onHeadingRevealComplete}
              />
            </h2>
          </div>
          <p data-reveal className="max-w-md text-base leading-7 text-slate-600">
            A selection of full-stack applications spanning product experiences,
            APIs, data, and role-based workflows.
          </p>
        </div>

        <div className="reveal-stagger grid items-stretch gap-5 md:grid-cols-2 lg:gap-6">
          {overviewProjects.map((project, index) => {
            const projectRoute = project.route
            if (!projectRoute) return null

            return (
              <article
                key={project.slug}
                data-reveal
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-700/70 bg-white shadow-md shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:shadow-xl hover:shadow-cyan-950/15 motion-reduce:transition-none"
              >
                <div
                  data-reveal="scale"
                  className="px-4 pt-4 sm:px-5 sm:pt-5"
                >
                  <ProjectVisual project={project} compact />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {project.featured && (
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
                          Featured project
                        </p>
                      )}
                      <h3 className="text-lg font-bold tracking-tight text-slate-100 sm:text-xl">
                        {project.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                    {project.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.technologies
                      .slice(0, 5)
                      .map((technology) => (
                        <li
                          key={technology}
                          className="rounded-lg border border-slate-700/80 bg-slate-900/70 px-2.5 py-1.5 text-xs font-medium text-slate-300"
                        >
                          {technology}
                        </li>
                      ))}
                    {project.technologies.length > 5 && (
                      <li className="px-2 py-1.5 text-xs text-slate-500">
                        +{project.technologies.length - 5} more
                      </li>
                    )}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-slate-800 pt-5">
                    <a
                      href={projectRoute}
                      onClick={(event) => {
                        event.preventDefault()
                        navigateTo(projectRoute)
                      }}
                      className="inline-flex min-h-10 items-center justify-center rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold !text-black transition-colors hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                    >
                      View Project
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                    >
                      Live Website <span aria-hidden="true" className="ml-1">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects

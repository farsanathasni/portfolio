import { useSectionTransition } from "../componenet/sectionTransition"
import LetterReveal from "../componenet/letterReveal"
import ProjectVisual from "../componenet/projectVisual"
import { projects, type PortfolioProject } from "../data/projects"
import useScrollReveal from "../hooks/useScrollReveal"

type ProjectOverviewProps = {
  project: PortfolioProject
  sectionId: string
}

function ProjectOverview({ project, sectionId }: ProjectOverviewProps) {
  const {
    ref,
    isRevealed,
    isContentRevealed,
    headingRevealVersion,
    onHeadingRevealComplete,
  } = useScrollReveal<HTMLElement>(sectionId)
  const { navigateTo } = useSectionTransition()
  const relatedProjects = projects.filter((item) => item.slug !== project.slug)

  return (
    <section
      ref={ref}
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className={`scroll-reveal min-h-[75vh] px-6 pb-24 pt-32 sm:px-8 sm:pb-28 lg:pt-36 ${
        isRevealed ? "is-revealed" : ""
      } ${isContentRevealed ? "is-content-revealed" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <a
          href="/#projects"
          onClick={(event) => {
            event.preventDefault()
            navigateTo("/#projects")
          }}
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-cyan-200 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
        >
          <span aria-hidden="true">←</span> Back to Projects
        </a>

        <div data-heading-reveal className="mb-8 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Project overview
          </p>
          <h1
            id={`${sectionId}-heading`}
            className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl"
          >
            <LetterReveal
              label={project.title}
              segments={[{ text: project.title }]}
              revealVersion={headingRevealVersion}
              onComplete={onHeadingRevealComplete}
            />
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            {project.description}
          </p>
        </div>

        <div data-reveal="scale" className="mb-10">
          <ProjectVisual project={project} />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:gap-16">
          <div data-reveal>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              {project.slug === "petlora" ? "Platform capabilities" : "Project highlights"}
            </h2>
            <ul className="reveal-stagger mt-5 grid gap-3 sm:grid-cols-2">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  data-reveal
                  className="flex items-start gap-3 border-b border-slate-800 py-3 text-sm leading-6 text-slate-300"
                >
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                  {highlight}
                </li>
              ))}
            </ul>

            {project.userRoles && (
              <div className="mt-9">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                  User roles
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.userRoles.map((role) => (
                    <li
                      key={role}
                      className="rounded-full border border-slate-700 bg-slate-900/70 px-3.5 py-2 text-sm font-medium text-slate-200"
                    >
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside data-reveal className="h-fit rounded-2xl border border-slate-800 bg-slate-900/55 p-5 sm:p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              Technology stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-lg border border-slate-700/80 bg-slate-950/60 px-3 py-1.5 text-xs font-medium text-slate-300"
                >
                  {technology}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-slate-800 pt-5">
              <p className="text-sm leading-6 text-slate-400">
                {project.slug === "petlora"
                  ? "A full-stack application with role-based modules for Pet Owners, Service Providers, and Admin."
                  : project.highlights.join(", ")}
              </p>
            </div>
          </aside>
        </div>

        {relatedProjects.length > 0 && (
          <div className="mt-16 border-t border-slate-800 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              More selected work
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedProjects
                .filter((item) => item.route)
                .map((item) => (
                  <a
                    key={item.slug}
                    href={item.route}
                    onClick={(event) => {
                      event.preventDefault()
                      if (item.route) navigateTo(item.route)
                    }}
                    className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-cyan-100"
                  >
                    {item.title} <span aria-hidden="true">↗</span>
                  </a>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectOverview

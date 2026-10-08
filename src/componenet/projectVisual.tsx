import type { PortfolioProject } from "../data/projects"

type ProjectVisualProps = {
  project: PortfolioProject
  compact?: boolean
}

function ProjectVisual({ project, compact = false }: ProjectVisualProps) {
  return (
    <div
      role="img"
      aria-label={`${project.title} project preview`}
      className={`project-art project-art-grid relative isolate overflow-hidden rounded-2xl border border-slate-700/70 ${
        compact ? "min-h-44 p-5 sm:min-h-48" : "min-h-56 p-5 sm:min-h-64 sm:p-7"
      }`}
    >
      <div
        aria-hidden="true"
        className="hero-halo absolute -right-16 -top-24 -z-10 h-64 w-64 rounded-full blur-3xl"
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/70">
            Project preview
          </p>
          <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-100 sm:text-xl">
            {project.title}
          </h3>
        </div>
        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] font-medium text-cyan-100">
          {project.featured ? "Featured" : project.technologies[0]}
        </span>
      </div>

      <div className={`mt-5 grid gap-2 ${compact ? "grid-cols-2" : "sm:grid-cols-3"}`}>
        {project.highlights.slice(0, compact ? 4 : 6).map((highlight, index) => (
          <div
            key={highlight}
            className="rounded-xl border border-slate-700/80 bg-slate-950/65 px-3 py-2.5"
          >
            <span className="block font-mono text-[9px] tracking-wider text-slate-500">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-1 block text-xs font-medium leading-5 text-slate-200">
              {highlight}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectVisual

import ProjectOverview from "./ProjectOverview"
import { projects } from "../data/projects"

const project = projects.find((item) => item.slug === "liyana-metals")

function LiyanaMetals() {
  if (!project) throw new Error("Liyana Metals project data is missing.")
  return <ProjectOverview project={project} sectionId="project-liyana-metals" />
}

export default LiyanaMetals

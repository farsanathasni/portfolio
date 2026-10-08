import ProjectOverview from "./ProjectOverview"
import { projects } from "../data/projects"

const project = projects.find((item) => item.slug === "petlora")

function PetLora() {
  if (!project) throw new Error("PetLora project data is missing.")
  return <ProjectOverview project={project} sectionId="project-petlora" />
}

export default PetLora

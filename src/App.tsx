import { useCallback, useState } from "react"
import Hero from "./componenet/hero"
import Navbar from "./componenet/navbar"
import About from "./componenet/about"
import Skills from "./componenet/skill"
import Projects from "./componenet/project"
import Experience from "./componenet/experience"
import Education from "./componenet/education"
import Contact from "./componenet/contact"
import Footer from "./componenet/footer"
import LoadingScreen from "./componenet/loadingScreen"
import SectionTransitionProvider from "./componenet/sectionTransition"
import { useSectionTransition } from "./componenet/sectionTransition"
import PetLora from "./pages/PetLora"
import LiyanaMetals from "./pages/LiyanaMetals"

function PortfolioApp({ isLoading }: { isLoading: boolean }) {
  const { currentPath } = useSectionTransition()
  const isHome = currentPath === "/"

  return (
    <div
      inert={isLoading}
      className={`portfolio-root ${
        isLoading ? "opacity-0" : "portfolio-enter opacity-100"
      } transition-opacity duration-500`}
    >
      <Navbar />
      <main className="min-h-screen">
        <div hidden={!isHome}>
          <Hero hasEntered={!isLoading} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </div>
        {currentPath === "/projects/petlora" && <PetLora />}
        {currentPath === "/projects/liyana-metals" && <LiyanaMetals />}
      </main>
      <Footer />
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const finishLoading = useCallback(() => setIsLoading(false), [])

  return (
    <>
      {isLoading && <LoadingScreen onComplete={finishLoading} />}
      <SectionTransitionProvider>
        <PortfolioApp isLoading={isLoading} />
      </SectionTransitionProvider>
    </>
  )
}

export default App
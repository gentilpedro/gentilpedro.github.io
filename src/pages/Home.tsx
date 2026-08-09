import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Education } from '../sections/Education'
import { Experience } from '../sections/Experience'
import { Hero } from '../sections/Hero'
import { Projects } from '../sections/Projects'
import { Skills } from '../sections/Skills'
import { useLang } from '../hooks/useLang'

export function Home() {
  const lang = useLang()

  return (
    <>
      <Hero lang={lang} />
      <About lang={lang} />
      <Skills lang={lang} />
      <Projects lang={lang} />
      <Experience lang={lang} />
      <Education lang={lang} />
      <Contact lang={lang} />
    </>
  )
}

import Hero       from '../components/sections/Hero';
import About      from '../components/sections/About';
import Services   from '../components/sections/Services';
import WhySolar   from '../components/sections/WhySolar';
import Projects   from '../components/sections/Projects';
import NetMetering from '../components/sections/NetMetering';
import Contact    from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhySolar />
      <Projects />
      <NetMetering />
      <Contact />
    </>
  );
}
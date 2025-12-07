import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Testimonials from '@/components/Testimonials/Testimonials';
import Contact from '@/components/Contact/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Testimonials />
      <Contact />
    </main>
  );
}


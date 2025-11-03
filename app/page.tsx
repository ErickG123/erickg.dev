"use client";

import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { SocialLinks } from "./components/SocialLinks";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main>
        <Hero backgroundImage="https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=1920&q=80" />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Contact />
        <SocialLinks />
      </main>
      <Footer />
    </div>
  );
}

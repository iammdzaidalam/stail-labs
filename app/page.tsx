import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Products } from "@/components/sections/Products";
import { Process } from "@/components/sections/Process";
import { Industries } from "@/components/sections/Industries";
import { Solutions } from "@/components/sections/Solutions";
import { Services } from "@/components/sections/Services";
import { Advantages } from "@/components/sections/Advantages";
import { Studio } from "@/components/sections/Studio";
import { Research } from "@/components/sections/Research";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Careers } from "@/components/sections/Careers";
import { Contact } from "@/components/sections/Contact";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Products />
        <Process />
        <Industries />
        <Solutions />
        <Services />
        <Advantages />
        <Studio />
        <Research />
        <CaseStudy />
        <Careers />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

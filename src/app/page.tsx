import TopNavbar from "./componets/layouts/TopNavbar";
import Footer from "./componets/layouts/Footer";
import Hero from "./componets/Hero";
import Skills from "./componets/Skills";
import Experience from "./componets/Experience";
import Contact from "./componets/Contact";
import Education from "./componets/Education";


export default function Home() {
    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50">
                 <TopNavbar />
            </div>
            <Hero />
            <Education />
            <Skills />
            <Experience />
            <Contact />
            <Footer />
            

        </>
    );
}
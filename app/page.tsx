import Hero from "@/components/sections/Hero";
import HowWeWork from "@/components/sections/HowWeWork";
import Portfolio from "@/components/sections/Portfolio";
import Customization from "@/components/sections/Customization";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
    return (
        <main>
            <Hero />
            <HowWeWork />
            <Portfolio />
            <Customization />
            <Contact />
            <Footer />
        </main>
    );
}

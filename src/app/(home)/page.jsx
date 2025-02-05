import HeroSection from "./_components/HeroSecction";
import FeaturesGrid from "./_components/FeaturedSection";
import PortfolioGrid from "./_components/Project";
import Blog from "./_components/Blog";
import SlidingLogos from "./_components/Clients"
import Contact from "./_components/Contact";

export default function Home(){
    return(
        <>
        <HeroSection/>
        <FeaturesGrid/>
        <SlidingLogos/>
        <PortfolioGrid/>
        <Blog/>
        <Contact/>

        </>
    )
}
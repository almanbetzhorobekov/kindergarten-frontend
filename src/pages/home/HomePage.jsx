import Hero from "./components/Hero";
import Cards from "./components/Cards";
import Header from "../layout/components/Header.jsx";
import Footer from "../layout/components/Footer.jsx";

export default function HomePage() {
  return (
      <>

      <Header />
      <main>
        <Hero />
        <Cards />
      </main>
      <Footer />
      
      </>
  );
}
import Nav from "../components/Nav.jsx";
import Hero from "../components/Hero.jsx";
import { CatalogBrandSections } from "../components/BrandSections.jsx";
import Services from "../components/Services.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

export default function Products() {
  return (
    <>
      <Nav />
      <main>
        <Hero variant="product" />
        <CatalogBrandSections />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
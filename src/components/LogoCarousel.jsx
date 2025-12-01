const localLogoFiles = [
  "/havells-logo.png",
  "/kent.png",
  "/download.jpg",
  "/6AEE25F50725BD7-FABER_Logo_P3435C-scaled.jpg",
  "/main_logo.jpg",
  "/OIP.webp",
];

const formatAltText = (fileName) =>
  fileName.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const shuffleArray = (array) => array.map((item) => ({ item, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ item }) => item);

export default function LogoCarousel() {
  const logos = shuffleArray(localLogoFiles).map((src) => ({ src, alt: formatAltText(src) }));
  return (
    <section className="logo-carousel" aria-label="Filtration partners">
      <div className="section-heading">
        <p className="eyebrow">Trusted Collaborators</p>
        <h2>Logos from your download gallery.</h2>
        <p>Auto-sliding showcase powered by your imported logo files.</p>
      </div>
      <div className="logo-marquee">
        <div className="logo-track" id="logo-track" role="list">
          {logos.map((logo, i) => (
            <figure className="logo-entry" role="listitem" key={`l-${i}`}>
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </figure>
          ))}
          {logos.map((logo, i) => (
            <figure className="logo-entry" role="listitem" aria-hidden="true" key={`ldup-${i}`}>
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

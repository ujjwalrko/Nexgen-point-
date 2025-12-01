export default function AMC() {
  return (
    <section className="services amc-section">
      <div className="section-heading">
        <p className="eyebrow">AMC</p>
        <h2>Annual Maintenance Contracts</h2>
        <p className="price-notice">Price varies by machine and filter</p>
      </div>
      <div className="amc-grid">
        <article className="amc-card">
          <h3>Service Only</h3>
          <p>Scheduled health checks and tune-ups for your purifier.</p>
          <ul>
            <li>Periodic inspection</li>
            <li>Cleaning and optimization</li>
            <li>Performance report</li>
          </ul>
          <a href="#contact" className="btn primary">Request AMC</a>
        </article>
        <article className="amc-card">
          <h3>All Protect</h3>
          <p>End-to-end protection including service and parts.</p>
          <ul>
            <li>Everything in Service Only</li>
            <li>Filter set coverage</li>
            <li>Priority support</li>
          </ul>
          <a href="#contact" className="btn primary">Request AMC</a>
        </article>
      </div>
    </section>
  );
}

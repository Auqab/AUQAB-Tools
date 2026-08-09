import SEO from "../components/SEO";

function About() {
  return (
    <>
      <SEO
        title="About AUQAB Tools - Free Online Utilities"
        description="AUQAB Tools provides free, fast and secure web tools for everyday digital tasks. No registration required."
      />

      <section className="tool-page">
        <div className="password-card about-card-page">
          <div className="about-header">
            <h1>About AUQAB Tools</h1>
            <p>
              AUQAB Tools is a free online platform that provides simple,
              fast and useful digital utilities for everyday tasks.
              All tools run directly in your browser — no account needed.
            </p>
          </div>

          <div className="about-cards">
            <div className="about-card">
              <h2>🎯 Our Mission</h2>
              <p>
                Make digital tasks easier by providing free, accessible tools
                that anyone can use instantly without registration.
              </p>
            </div>

            <div className="about-card">
              <h2>⚡ Why AUQAB?</h2>
              <p>
                We focus on speed, simplicity and user experience.
                Our tools are designed to be lightweight and responsive
                on all devices.
              </p>
            </div>

            <div className="about-card">
              <h2>🔒 Privacy First</h2>
              <p>
                We respect your privacy. Most tools process data locally
                in your browser — your files and information never leave
                your device.
              </p>
            </div>

            <div className="about-card">
              <h2>🆓 Always Free</h2>
              <p>
                All AUQAB Tools are available for free. No hidden costs,
                no subscriptions — just useful utilities for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

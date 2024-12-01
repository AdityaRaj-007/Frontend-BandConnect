import React from "react";

const Main: React.FC = () => {
  return (
    <main className="overlay">
      <section className="hero">
        <div className="hero-content">
          <h1>
            BAND<span className="highlight">CONNECT</span>
          </h1>
          <p>
            Join a community of musicians. Connect, find bands, and explore
            venues.
          </p>
          <a href="#" className="cta-btn">
            Sign Up for Free
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-box">
          <h2>Find Musicians</h2>
          <p>Search for talented musicians by genre, location, or skill.</p>
          <a href="#" className="feature-btn">
            Get Started
          </a>
        </div>
        <div className="feature-box">
          <h2>Find Bands</h2>
          <p>Looking for a band to join? Browse through profiles.</p>
          <a href="#" className="feature-btn">
            Sign Up
          </a>
        </div>
        <div className="feature-box">
          <h2>Find Venues</h2>
          <p>Find venues looking for performers and book your gigs.</p>
          <a href="#" className="feature-btn">
            Learn More
          </a>
        </div>
      </section>
    </main>
  );
};

export default Main;

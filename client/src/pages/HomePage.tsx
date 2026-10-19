
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="liibaan-home">
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            MADE WITH CARE · SERVED WITH HEART
          </span>

          <h1>
            A little warmth.
            <br />
            <span>A lot of flavor.</span>
          </h1>

          <p className="hero-description">
            Discover delicious food, thoughtfully prepared and
            made to bring people together.
          </p>

          <div className="hero-actions">
            <Link to="/foods" className="button button-primary">
              Explore the menu <span aria-hidden="true">↗</span>
            </Link>
            <a href="#our-philosophy" className="text-link">
              Discover our story
            </a>
          </div>

          <div className="hero-note">
            <span className="note-mark">✳</span>
            <p>Good food. Good company. A place to belong.</p>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-frame">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"
              alt="A freshly prepared meal with colorful ingredients"
            />
          </div>

          <div className="image-caption">
            <span className="caption-dot" />
            <span>FRESHLY PREPARED, ALWAYS</span>
          </div>

          <div className="hero-stamp" aria-hidden="true">
            <span>MADE</span>
            <span>WITH</span>
            <span>HEART</span>
            <span className="stamp-star">✳</span>
          </div>
        </div>
      </section>

      <section className="welcome-strip" aria-label="Our values">
        <div>
          <span className="value-number">01</span>
          <span>Fresh ingredients</span>
        </div>
        <span className="strip-divider" aria-hidden="true" />
        <div>
          <span className="value-number">02</span>
          <span>Flavor in every bite</span>
        </div>
        <span className="strip-divider" aria-hidden="true" />
        <div>
          <span className="value-number">03</span>
          <span>Made for sharing</span>
        </div>
      </section>

      <section
        className="philosophy-section"
        id="our-philosophy"
      >
        <div className="philosophy-label">
          <span className="eyebrow-line" />
          THE LIIBAAN FEELING
        </div>

        <div className="philosophy-content">
          <h2>
            Every meal deserves
            <br />
            <span>a little more heart.</span>
          </h2>

          <div className="philosophy-description">
            <p>
              We believe a good meal is about more than what is
              on the plate. It is about the moments, the people,
              and the memories made around the table.
            </p>

            <Link to="/foods" className="text-link text-link-dark">
              Find your next favorite <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

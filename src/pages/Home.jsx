import { listings } from '../mock-data';
import './Home.css';

function Home() {
  const featured = listings.slice(0, 3);

  return (
    <div>
      <section className="hero">
        <h1>Find home, without the run-around.</h1>
        <p>
          No more paying deposits to landlords who ghost you. Every listing
          is verified, and your rent stays held in escrow until you've
          actually moved in.
        </p>
        <button>Browse houses</button>
      </section>

      <section className="how-it-works">
        <h2>How it works</h2>
        <div className="how-it-works-grid">
          <div>
            <h3>1. Browse verified listings</h3>
            <p>Every property is checked before it goes live.</p>
          </div>
          <div>
            <h3>2. Pay into escrow via M-Pesa</h3>
            <p>Your rent is held safely, not handed straight to the landlord.</p>
          </div>
          <div>
            <h3>3. Move in, funds release</h3>
            <p>Only once you confirm move-in does payment reach the landlord.</p>
          </div>
        </div>
      </section>

      <section className="featured">
        <h2>Recently listed</h2>
        <div className="featured-grid">
          {featured.map((listing) => (
            <div className="featured-card" key={listing.id}>
              <h4>{listing.title}</h4>
              <p>{listing.location.area}, {listing.location.city}</p>
              <p>KES {listing.rentAmount.toLocaleString()}/mo</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

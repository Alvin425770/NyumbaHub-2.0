import { listings } from '../mock-data';

function Home() {
  return (
    <div>
      <h1>NyumbaHub</h1>
      <p>Find home, without the run-around.</p>

      <h2>Recently listed</h2>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            {listing.title} — {listing.location.area}, {listing.location.city} — KES {listing.rentAmount.toLocaleString()}/mo
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
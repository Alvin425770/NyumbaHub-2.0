import { useParams, Link } from 'react-router-dom';
import { listings } from '../mock-data';

function ListingDetail() {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div>
        <p>Listing not found.</p>
        <Link to="/listings">Back to listings</Link>
      </div>
    );
  }

  return (
    <div className="listing-detail">
      <Link to="/listings">← Back to listings</Link>
      <h1>{listing.title}</h1>
      <div className="listing-detail__images">
        {listing.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${listing.title} ${i + 1}`}
            className="listing-detail__image"
          />
        ))}
      </div>
      <p className="listing-detail__price">
        KES {listing.rentAmount.toLocaleString()} / month
      </p>
      <p>{listing.location.area}, {listing.location.city}</p>
      <p>{listing.bedrooms} bed · {listing.bathrooms} bath</p>
      <p>{listing.description}</p>
      <button>Request to Book</button>
    </div>
  );
}

export default ListingDetail;
import { useParams, Link } from 'react-router-dom';
import { listings } from '../mock-data';
import './ListingDetail.css';

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
      <p className="listing-detail__price">
        KES {listing.rentAmount.toLocaleString()} / month
      </p>
      <p>{listing.location.area}, {listing.location.city}</p>
      <p>{listing.bedrooms} bed · {listing.bathrooms} bath</p>
      <button>Request to Book</button>
    </div>
  );
}

export default ListingDetail;
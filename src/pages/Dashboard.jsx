import { useAuth } from "../context/AuthContext.jsx";
import { listings } from "../mock-data";
import "../styles/auth.css";

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;

  if (user.role === "landlord") {
    return (
      <div className="dashboard">
        <h2>Landlord Dashboard</h2>
        <button className="add-btn">+ Add Listing</button>
        <h3>My Listings</h3>
        {listings.length === 0 ? (
          <p>No listings yet</p>
        ) : (
          listings.map((l) => (
            <div key={l.id}>
              {l.title} — {l.location.area}, {l.location.city} — KES {l.rentAmount.toLocaleString()}
            </div>
          ))
        )}
      </div>
    );
  }

  const bookings = []; // TODO: connect once Mike's bookings array exists in mock-data.js

  return (
    <div className="dashboard">
      <h2>My Dashboard</h2>
      <h3>Saved Listings</h3>
      <p>No saved listings yet</p>
      <h3>My Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((b) => <div key={b.id}>{b.status}</div>)
      )}
    </div>
  );
}
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Listings from './pages/Listings';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BookingDetail from './pages/BookingDetail';
import ListingDetail from './pages/ListingDetail';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking/:id" element={<BookingDetail />} />
      </Routes>
    </>
  );
}

export default App;
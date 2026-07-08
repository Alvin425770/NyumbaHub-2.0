import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      {' | '}
      <Link to="/listings">Browse Houses</Link>
      {' | '}
      <Link to="/login">Sign In</Link>
      {' | '}
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}

export default Navbar;
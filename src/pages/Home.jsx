import React from 'react';

// Sample static data mimicking house hunting listings across Nairobi
const FEATURED_HOUSES = [
  {
    id: 1,
    title: "Modern 2-Bedroom Apartment",
    location: "Kilimani, Nairobi",
    price: "Ksh 65,000 / month",
    beds: 2,
    baths: 2,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80",
    tag: "Escrow Protected"
  },
  {
    id: 2,
    title: "Luxury Studio Suite",
    location: "Westlands, Nairobi",
    price: "Ksh 45,000 / month",
    beds: 1,
    baths: 1,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80",
    tag: "Trending"
  },
  {
    id: 3,
    title: "Spacious 3-Bedroom Townhouse",
    location: "Lavington, Nairobi",
    price: "Ksh 120,000 / month",
    beds: 3,
    baths: 3.5,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    tag: "Verified"
  },
  {
    id: 4,
    title: "Cozy 1-Bedroom Apartment",
    location: "Ngong Road, Nairobi",
    price: "Ksh 30,000 / month",
    beds: 1,
    baths: 1,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=80",
    tag: "Budget Friendly"
  }
];

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 min-h-screen font-sans">
      
      {/* Hero / Introduction Headline */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Explore Available Listings on NyumbaHub
        </h1>
        <p className="mt-2 text-gray-600 text-sm md:text-base max-w-xl">
          Secure, verified properties ready for physical tours. Book your house-hunting schedule instantly using M-Pesa Escrow.
        </p>
      </div>

      {/* Responsive Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURED_HOUSES.map((house) => (
          <div 
            key={house.id} 
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition duration-200 group flex flex-col justify-between"
          >
            {/* Image Container with Absolute Badges */}
            <div className="relative overflow-hidden aspect-[4/3]">
              <img 
                src={house.imageUrl} 
                alt={house.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <span className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white font-medium text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                {house.tag}
              </span>
            </div>

            {/* Property Text Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xl font-bold text-gray-900 tracking-tight mb-1">
                  {house.price}
                </div>
                <h2 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition">
                  {house.title}
                </h2>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  📍 {house.location}
                </p>
              </div>

              {/* Utility specs row & Action CTA */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">🛏️ {house.beds} Beds</span>
                  <span className="flex items-center gap-1">🛁 {house.baths} Baths</span>
                </div>
                
                <button 
                  onClick={() => alert(`Redirecting to payment setup for ${house.title}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl text-xs transition shadow-sm text-center block"
                >
                  Book Viewing Tour
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;
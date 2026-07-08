import React, { useState } from 'react';

function BookingDetail() {
  // 1. Local State for tracking the simulated payment and escrow process
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('unpaid'); // unpaid, prompting, paid
  const [escrowStatus, setEscrowStatus] = useState('Awaiting Payment'); // Awaiting Payment, Held in Escrow, Released, Refunded
  const [loading, setLoading] = useState(false);

  // Mock pricing and property details
  const bookingFee = 1000; 
  const escrowHoldingDays = 3;
  const propertyImageUrl = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80"; // Modern Apartment Image

  // 2. Simulated STK Push Trigger
  const handleMpesaPayment = (e) => {
    e.preventDefault();
    if (!phoneNumber) return alert("Please enter a valid Safaricom number");

    setLoading(true);
    setPaymentStatus('prompting');
    
    // Simulate the time it takes for a user to enter their PIN on their phone
    setTimeout(() => {
      setLoading(false);
      setPaymentStatus('paid');
      setEscrowStatus('Held in Escrow');
    }, 5000); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen font-sans">
      
      {/* Header Section */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Booking & Payment</h1>
        <p className="text-gray-500 text-sm">Mike's page — Secure your house hunting schedule via M-Pesa Escrow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: Property Summary & Payment Processing */}
        <div className="space-y-6">
          
          {/* Property Image & Visual Card */}
          <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            <img 
              src={propertyImageUrl} 
              alt="House Hunting Target" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Viewing Target</span>
              <h3 className="text-lg font-bold text-gray-800 mt-0.5">Modern 2-Bedroom Apartment</h3>
              <p className="text-gray-500 text-xs">📍 Kilimani, Nairobi</p>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Summary of Fees</h2>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>House Viewing Commitment Fee</span>
              <span>Ksh {bookingFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
              <span>NyumbaHub Escrow Protection</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="border-t pt-3 flex justify-between items-center font-bold text-gray-950">
              <span>Total to Pay</span>
              <span>Ksh {bookingFee.toLocaleString()}</span>
            </div>
          </div>

          {/* M-Pesa Form Logic */}
          {paymentStatus === 'unpaid' && (
            <form onSubmit={handleMpesaPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Safaricom M-Pesa Number</span>
                  <span className="text-green-600 font-bold text-[10px] tracking-normal bg-green-50 px-2 py-0.5 rounded">STK PUSH READY</span>
                </label>
                <input 
                  type="tel" 
                  placeholder="e.g., 0712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg text-sm transition shadow-sm flex justify-center items-center gap-2"
              >
                <span>💸 Pay Ksh {bookingFee.toLocaleString()} via M-Pesa</span>
              </button>
            </form>
          )}

          {paymentStatus === 'prompting' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-center space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
              <h3 className="font-semibold text-yellow-800">STK Push Sent!</h3>
              <p className="text-xs text-yellow-700">
                Please check your handset for the M-Pesa PIN prompt to authorize the transaction of 
                <strong> Ksh {bookingFee.toLocaleString()}</strong> to NyumbaHub Escrow.
              </p>
            </div>
          )}

          {paymentStatus === 'paid' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center space-y-2">
              <div className="text-2xl">✅</div>
              <h3 className="font-semibold text-green-800">Payment Verified Successfully</h3>
              <p className="text-xs text-green-700 font-mono">Receipt: TGR{Math.floor(Math.random() * 899999 + 100000)}Y7X</p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Escrow Status Tracking */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Escrow Shield Status</h2>
              <span className={`text-xs px-2.5 py-1 rounded-md font-bold tracking-wide border ${
                escrowStatus === 'Held in Escrow' 
                  ? 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse' 
                  : escrowStatus === 'Released'
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-gray-100 text-gray-600 border-gray-200'
              }`}>
                {escrowStatus}
              </span>
            </div>

            {/* Escrow Informational Alert Box */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-xs text-gray-600 space-y-2 mb-6">
              <p className="font-semibold text-gray-800">🛡️ How NyumbaHub Escrow Protects You:</p>
              <p>Your viewing commitment fee is securely held by us. The agent/landlord will only receive funds after you verify the house listing matches reality during your viewing schedule.</p>
            </div>

            {/* Simple Visual Step-by-Step State Mapping */}
            <div className="space-y-4 relative before:absolute before:bottom-2 before:top-2 before:left-3 before:w-0.5 before:bg-gray-200">
              <div className="flex gap-3 text-sm items-start relative">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 ${paymentStatus === 'paid' || paymentStatus === 'prompting' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
                <div>
                  <p className="font-medium text-gray-800">Client deposit authorized</p>
                  <p className="text-xs text-gray-400">Funds safely loaded via M-Pesa STK.</p>
                </div>
              </div>

              <div className="flex gap-3 text-sm items-start relative">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 ${escrowStatus === 'Held in Escrow' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
                <div>
                  <p className="font-medium text-gray-800">Funds locked in Escrow Vault</p>
                  <p className="text-xs text-gray-400">Locked safely up to {escrowHoldingDays} days waiting for physical house tour completion.</p>
                </div>
              </div>

              <div className="flex gap-3 text-sm items-start relative">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold z-10">3</div>
                <div>
                  <p className="font-medium text-gray-400">Release to Agent / Caretaker</p>
                  <p className="text-xs text-gray-400">Triggers automatically post-viewing, or if you sign off on the dashboard application.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fallback protection link for compliance */}
          <div className="pt-4 border-t border-gray-200 mt-6 text-[11px] text-gray-400 text-center">
            Need a reversal? File an Escrow Dispute within {escrowHoldingDays} days if the listing is fraudulent.
          </div>
        </div>

      </div>
    </div>
  );
}

// Named export down here matching your starting blueprint structure
export default BookingDetail;
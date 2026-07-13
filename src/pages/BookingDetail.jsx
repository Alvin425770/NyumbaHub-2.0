import { useState } from 'react';
import './BookingDetail.css';

function BookingDetail() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('unpaid'); // unpaid, prompting, paid
  const [escrowStatus, setEscrowStatus] = useState('Awaiting Payment');
  const [loading, setLoading] = useState(false);

  const bookingFee = 1000;
  const escrowHoldingDays = 3;

  const handleMpesaPayment = (e) => {
    e.preventDefault();
    if (!phoneNumber) return alert('Please enter a valid Safaricom number');

    setLoading(true);
    setPaymentStatus('prompting');

    setTimeout(() => {
      setLoading(false);
      setPaymentStatus('paid');
      setEscrowStatus('Held in Escrow');
    }, 5000);
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>Booking &amp; Payment</h1>
        <p>Secure your house viewing via M-Pesa escrow.</p>
      </div>

      <div className="booking-grid">
        {/* LEFT COLUMN */}
        <div className="booking-left">
          <div className="booking-property-card">
            <div className="booking-property-image"></div>
            <div className="booking-property-body">
              <span className="booking-eyebrow">Viewing Target</span>
              <h3>Modern 2-Bedroom Apartment</h3>
              <p>Kilimani, Nairobi</p>
            </div>
          </div>

          <div className="booking-summary">
            <h2>Summary of Fees</h2>
            <div className="booking-summary-row">
              <span>House Viewing Commitment Fee</span>
              <span>KES {bookingFee.toLocaleString()}</span>
            </div>
            <div className="booking-summary-row">
              <span>NyumbaHub Escrow Protection</span>
              <span className="booking-free">FREE</span>
            </div>
            <div className="booking-summary-total">
              <span>Total to Pay</span>
              <span>KES {bookingFee.toLocaleString()}</span>
            </div>
          </div>

          {paymentStatus === 'unpaid' && (
            <form onSubmit={handleMpesaPayment} className="booking-form">
              <label>
                Safaricom M-Pesa Number
                <input
                  type="tel"
                  placeholder="e.g. 0712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Pay KES {bookingFee.toLocaleString()} via M-Pesa</button>
            </form>
          )}

          {paymentStatus === 'prompting' && (
            <div className="booking-status booking-status--prompting">
              <div className="booking-spinner"></div>
              <h3>STK Push Sent</h3>
              <p>
                Check your phone for the M-Pesa PIN prompt to authorize
                KES {bookingFee.toLocaleString()} to NyumbaHub Escrow.
              </p>
            </div>
          )}

          {paymentStatus === 'paid' && (
            <div className="booking-status booking-status--paid">
              <h3>Payment Verified</h3>
              <p className="booking-receipt">
                Receipt: TGR{Math.floor(Math.random() * 899999 + 100000)}Y7X
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="booking-escrow">
          <div className="booking-escrow-head">
            <h2>Escrow Status</h2>
            <span className={`booking-badge booking-badge--${escrowStatus === 'Held in Escrow' ? 'held' : escrowStatus === 'Released' ? 'released' : 'pending'}`}>
              {escrowStatus}
            </span>
          </div>

          <div className="booking-escrow-note">
            <p className="booking-escrow-note-title">How NyumbaHub Escrow Protects You</p>
            <p>
              Your viewing commitment fee is held securely. The landlord only
              receives funds after you confirm the listing matches reality
              during your viewing.
            </p>
          </div>

          <div className="booking-steps">
            <div className="booking-step">
              <span className={`booking-step-num ${paymentStatus !== 'unpaid' ? 'is-done' : ''}`}>1</span>
              <div>
                <p className="booking-step-title">Client deposit authorized</p>
                <p className="booking-step-sub">Funds loaded via M-Pesa STK.</p>
              </div>
            </div>

            <div className="booking-step">
              <span className={`booking-step-num ${escrowStatus === 'Held in Escrow' ? 'is-done' : ''}`}>2</span>
              <div>
                <p className="booking-step-title">Funds locked in escrow</p>
                <p className="booking-step-sub">Held up to {escrowHoldingDays} days pending viewing.</p>
              </div>
            </div>

            <div className="booking-step">
              <span className="booking-step-num">3</span>
              <div>
                <p className="booking-step-title booking-step-title--muted">Release to landlord</p>
                <p className="booking-step-sub">Triggers after viewing confirmation.</p>
              </div>
            </div>
          </div>

          <div className="booking-dispute-note">
            Need a reversal? File a dispute within {escrowHoldingDays} days if the listing is fraudulent.
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetail;
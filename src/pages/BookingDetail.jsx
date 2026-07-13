import React, { useState } from 'react';

// Sample service data with unique images and realistic Kenyan service pricing
const SERVICES = [
  {
    id: 'consult',
    name: '1-on-1 Strategic Business Consultation',
    duration: '60 mins',
    price: 7500, // KSh 7,500
    description: 'Deep dive into your business model, operational scaling bottlenecks, and digital growth strategy.',
    image: 'https://img.magnific.com/free-vector/appointment-booking-banner-design_23-2148647220.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    id: 'audit',
    name: 'Comprehensive Tech & Systems Audit',
    duration: '120 mins',
    price: 18500, // KSh 18,500
    description: 'Evaluation of your software architecture, database vulnerabilities, and interface engineering infrastructure.',
    image: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSNnry2tB_awNU35v5ZW48lxqE1bKuxgAH_SLQyMkDCJWTUyJ-DSucpXJs9oCuNAeEcAP1Tt99XzMzAxF0'
  }
];

export default function BookingDetails() {
  // State management
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  
  // Forms & Payment Methods
  const [paymentMethod, setPaymentMethod] = useState('mpesa'); // 'mpesa', 'airtel', 'bank'
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [airtelPhone, setAirtelPhone] = useState('');
  const [bankData, setBankData] = useState({ cardNumber: '', expiry: '', cvc: '' });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errors, setErrors] = useState({});

  // Form handlers
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleBankChange = (e) => {
    setBankData({ ...bankData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!bookingDate) newErrors.date = 'Please pick a date';
    if (!bookingTime) newErrors.time = 'Please pick a time slot';
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Contact phone number is required';

    // Payment-specific validation
    if (paymentMethod === 'mpesa') {
      if (!mpesaPhone.trim() || mpesaPhone.length < 10) newErrors.mpesaPhone = 'Valid M-Pesa phone number required';
    } else if (paymentMethod === 'airtel') {
      if (!airtelPhone.trim() || airtelPhone.length < 10) newErrors.airtelPhone = 'Valid Airtel Money phone number required';
    } else if (paymentMethod === 'bank') {
      if (!bankData.cardNumber.trim() || bankData.cardNumber.length < 16) newErrors.cardNumber = 'Valid card number is required';
      if (!bankData.expiry.trim()) newErrors.expiry = 'Required';
      if (!bankData.cvc.trim() || bankData.cvc.length < 3) newErrors.cvc = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate STK Push or gateway trigger delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 2200);
  };

  // 16% Kenyan VAT Calculation
  const vatRate = 0.16; 
  const vatAmount = selectedService.price * vatRate;
  const totalCost = selectedService.price + vatAmount;

  const formatCurrency = (amount) => {
    return 'KSh ' + amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Render Confirmation Screen
  if (isConfirmed) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm text-center font-sans">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Processing!</h2>
        
        {paymentMethod !== 'bank' ? (
          <p className="text-gray-600 mb-6">
            We have initiated an STK Push to your mobile phone. Please enter your PIN on your handset to complete the payment of <span className="font-semibold text-gray-800">{formatCurrency(totalCost)}</span>.
          </p>
        ) : (
          <p className="text-gray-600 mb-6">Payment successful! A confirmation email has been sent to <span className="font-semibold text-gray-800">{formData.email}</span>.</p>
        )}
        
        <div className="bg-gray-50 rounded-xl p-6 text-left border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2">Summary Details</h3>
          <p className="text-sm text-gray-600 mb-1"><strong className="text-gray-800">Service:</strong> {selectedService.name}</p>
          <p className="text-sm text-gray-600 mb-1"><strong className="text-gray-800">Scheduled:</strong> {bookingDate} at {bookingTime}</p>
          <p className="text-sm text-gray-600 mb-1"><strong className="text-gray-800">Payment Via:</strong> {paymentMethod.toUpperCase()}</p>
          <p className="text-sm text-gray-600"><strong className="text-gray-800">Total Amount:</strong> {formatCurrency(totalCost)}</p>
        </div>

        <button 
          onClick={() => { setIsConfirmed(false); setBookingDate(''); setBookingTime(''); }}
          className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Return to Booking Page
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-8 px-4 font-sans text-gray-900">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input Forms */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Select Service */}
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-xs">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-gray-900 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">1</span>
              Select a Service
            </h2>
            <div className="space-y-4">
              {SERVICES.map((service) => (
                <label 
                  key={service.id}
                  className={`block p-4 border rounded-xl cursor-pointer transition relative ${selectedService.id === service.id ? 'border-gray-900 bg-gray-50/50 ring-1 ring-gray-900' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <input 
                    type="radio" name="service" className="sr-only" 
                    checked={selectedService.id === service.id} onChange={() => setSelectedService(service)}
                  />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img src={service.image} alt={service.name} className="w-full sm:w-24 h-20 object-cover rounded-lg bg-gray-100" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <span className="font-bold text-gray-900 ml-2">{formatCurrency(service.price)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{service.duration} • Remote Meeting</p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{service.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Step 2: Date & Time Picker */}
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-xs">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-gray-900 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">2</span>
              Select Date & Time
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Available Date</label>
                <input 
                  type="date" value={bookingDate} min={new Date().toISOString().split('T')[0]} 
                  onChange={(e) => { setBookingDate(e.target.value); if(errors.date) setErrors({...errors, date: ''}); }}
                  className={`w-full p-2.5 border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-gray-950 ${errors.date ? 'border-red-500 bg-red-50/30' : 'border-gray-300'}`}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Time Slot <span className="text-xs font-normal text-gray-400">(EAT)</span></label>
                <select 
                  value={bookingTime} onChange={(e) => { setBookingTime(e.target.value); if(errors.time) setErrors({...errors, time: ''}); }}
                  className={`w-full p-2.5 border rounded-lg bg-white focus:outline-hidden focus:ring-1 focus:ring-gray-950 ${errors.time ? 'border-red-500 bg-red-50/30' : 'border-gray-300'}`}
                >
                  <option value="">-- Choose a Slot --</option>
                  <option value="09:05 AM">09:05 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:15 PM">02:15 PM</option>
                  <option value="04:45 PM">04:45 PM</option>
                </select>
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>
            </div>
          </div>

          {/* Step 3: Customer Information */}
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-xs">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-gray-900 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">3</span>
              Your Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Jane Nyambura"
                  className={`w-full p-2.5 border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-gray-950 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="jane@domain.co.ke"
                    className={`w-full p-2.5 border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-gray-950 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Phone</label>
                  <input 
                    type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="0712345678"
                    className={`w-full p-2.5 border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-gray-950 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Special Consultation Notes</label>
                <textarea 
                  name="notes" value={formData.notes} onChange={handleFormChange} rows="3" placeholder="Briefly describe what you'd like to get out of this session..."
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-gray-950"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Step 4: Multi-Payment Options Selection */}
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-xs">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-gray-900 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">4</span>
              Select Payment Method
            </h2>
            
            {/* Payment Mode Selector Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                type="button" onClick={() => setPaymentMethod('mpesa')}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center transition font-semibold text-xs ${paymentMethod === 'mpesa' ? 'border-green-600 bg-green-50/40 text-green-700 ring-1 ring-green-600' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
              >
                <span className="text-lg mb-1">🟢</span> M-Pesa
              </button>
              <button
                type="button" onClick={() => setPaymentMethod('airtel')}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center transition font-semibold text-xs ${paymentMethod === 'airtel' ? 'border-red-600 bg-red-50/40 text-red-700 ring-1 ring-red-600' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
              >
                <span className="text-lg mb-1">🔴</span> Airtel Money
              </button>
              <button
                type="button" onClick={() => setPaymentMethod('bank')}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center transition font-semibold text-xs ${paymentMethod === 'bank' ? 'border-blue-600 bg-blue-50/40 text-blue-700 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
              >
                <span className="text-lg mb-1">💳</span> Card / Bank
              </button>
            </div>

            {/* DYNAMIC FORMS BASED ON SELECTED PAYMENT METHOD */}
            {paymentMethod === 'mpesa' && (
              <div className="p-4 bg-green-50/30 border border-green-100 rounded-xl space-y-3 animate-fadeIn">
                <label className="block text-sm font-semibold text-green-900">M-Pesa Mobile Number (for STK Push)</label>
                <input 
                  type="tel" placeholder="07XXXXXXXX or 01XXXXXXXX" maxLength="10" value={mpesaPhone}
                  onChange={(e) => { setMpesaPhone(e.target.value); if(errors.mpesaPhone) setErrors({...errors, mpesaPhone: ''}); }}
                  className={`w-full p-2.5 bg-white border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-green-600 ${errors.mpesaPhone ? 'border-red-500' : 'border-green-200'}`}
                />
                {errors.mpesaPhone && <p className="text-red-500 text-xs mt-1">{errors.mpesaPhone}</p>}
                <p className="text-xs text-gray-500">Ensure the line is active; you will receive a secure pop-up prompt requiring your M-Pesa PIN.</p>
              </div>
            )}

            {paymentMethod === 'airtel' && (
              <div className="p-4 bg-red-50/30 border border-red-100 rounded-xl space-y-3 animate-fadeIn">
                <label className="block text-sm font-semibold text-red-900">Airtel Money Phone Number</label>
                <input 
                  type="tel" placeholder="073XXXXXXX or 010XXXXXXX" maxLength="10" value={airtelPhone}
                  onChange={(e) => { setAirtelPhone(e.target.value); if(errors.airtelPhone) setErrors({...errors, airtelPhone: ''}); }}
                  className={`w-full p-2.5 bg-white border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-red-600 ${errors.airtelPhone ? 'border-red-500' : 'border-red-200'}`}
                />
                {errors.airtelPhone && <p className="text-red-500 text-xs mt-1">{errors.airtelPhone}</p>}
                <p className="text-xs text-gray-500">Ensure you have sufficient balance before generating the interactive prompt signature request.</p>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="space-y-4 border-t pt-4 border-gray-100 animate-fadeIn">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Credit / Debit Card Number</label>
                  <input 
                    type="text" name="cardNumber" maxLength="16" value={bankData.cardNumber} onChange={handleBankChange} placeholder="4111 2222 3333 4444"
                    className={`w-full p-2.5 border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-600 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Expiry Date</label>
                    <input 
                      type="text" name="expiry" placeholder="MM/YY" maxLength="5" value={bankData.expiry} onChange={handleBankChange}
                      className={`w-full p-2.5 border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-600 ${errors.expiry ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">CVC</label>
                    <input 
                      type="password" name="cvc" placeholder="123" maxLength="4" value={bankData.cvc} onChange={handleBankChange}
                      className={`w-full p-2.5 border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-600 ${errors.cvc ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Sticky Booking Summary Panel */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6">
            <h2 className="text-lg font-bold border-b pb-3 text-gray-900">Booking Summary</h2>
            
            {/* Selected Item Description layout view */}
            <div className="flex gap-3 items-start bg-white p-3 rounded-xl border border-gray-100">
              <img src={selectedService.image} alt={selectedService.name} className="w-20 h-16 object-cover rounded-lg bg-gray-50" />
              <div>
                <h3 className="font-semibold text-sm text-gray-900 leading-snug">{selectedService.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{selectedService.duration}</p>
              </div>
            </div>

            {/* Selected Booking metadata info */}
            <div className="space-y-2 text-sm text-gray-600 bg-white p-4 rounded-xl border border-gray-100">
              <div className="flex justify-between">
                <span>Date Selected:</span>
                <span className="font-medium text-gray-900">{bookingDate || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span>Allocated Time:</span>
                <span className="font-medium text-gray-900">{bookingTime || 'Not selected'}</span>
              </div>
            </div>

            {/* Calculations Breakdown Block */}
            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(selectedService.price)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>VAT (16%)</span>
                <span>{formatCurrency(vatAmount)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-dashed">
                <span>Total Due</span>
                <span>{formatCurrency(totalCost)}</span>
              </div>
            </div>

            {/* Consumer Protection / Policy text details */}
            <div className="text-xs text-gray-500 space-y-1 bg-yellow-50/50 p-3 rounded-lg border border-yellow-100/60">
              <p className="font-medium text-yellow-800">🔒 Dynamic Secure Gateway Protection</p>
              <p>Reschedule or cancel freely up to 24 hours prior. Refunds take 1-3 business hours back into your mobile wallet choice.</p>
            </div>

            {/* Primary Submit trigger button styling */}
            <button
              type="submit" disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800 active:scale-[0.99]'}`}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-ping inline-block w-2 h-2 rounded-full bg-white mr-1"></span>
                  Initiating Setup...
                </>
              ) : (
                `Complete Booking • ${formatCurrency(totalCost)}`
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}

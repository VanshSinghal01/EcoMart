import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './PaymentComponent.css';
import { FaCreditCard, FaCcPaypal,  FaPaypal, FaGooglePay, FaCashRegister } from 'react-icons/fa';

const PaymentComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    paytmNumber: '',
    phonePeNumber: '',
    cod: false,
  });

  const handlePaymentChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert("payment successfull");
  };

  return (
    <div className="payment-container">
      <div className="payment-content">
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <div className="cart-items-list">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div className="cart-item-summary" key={index}>
                  <img src={item.product} alt={item.product_name} />
                  <div className="cart-item-info">
                    <p className="cart-product-name">{item.product_name}</p>
                    <p className="cart-price">Price: ₹{item.current_price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <div className="total-amount-banner">
            <span>Total Amount: ₹{totalPrice}</span>
          </div>
        </div>
        <div className="payment-methods-section">
          <h2>Select Payment Method</h2>
          <form onSubmit={handlePaymentSubmit}>
            <div className="payment-methods">
              <label className={`payment-option ${selectedPaymentMethod === 'debitCard' ? 'active' : ''}`}>
                <input
                  type="radio"
                  value="debitCard"
                  checked={selectedPaymentMethod === 'debitCard'}
                  onChange={handlePaymentChange}
                />
                <FaCreditCard className="payment-icon" /> Debit Card
              </label>
              <label className={`payment-option ${selectedPaymentMethod === 'creditCard' ? 'active' : ''}`}>
                <input
                  type="radio"
                  value="creditCard"
                  checked={selectedPaymentMethod === 'creditCard'}
                  onChange={handlePaymentChange}
                />
                <FaCreditCard className="payment-icon" /> Credit Card
              </label>
              <label className={`payment-option ${selectedPaymentMethod === 'upi' ? 'active' : ''}`}>
                <input
                  type="radio"
                  value="upi"
                  checked={selectedPaymentMethod === 'upi'}
                  onChange={handlePaymentChange}
                />
                <FaGooglePay className="payment-icon" /> UPI
              </label>
              <label className={`payment-option ${selectedPaymentMethod === 'paytm' ? 'active' : ''}`}>
                <input
                  type="radio"
                  value="paytm"
                  checked={selectedPaymentMethod === 'paytm'}
                  onChange={handlePaymentChange}
                />
                <FaPaypal className="payment-icon" /> Paytm
              </label>
              <label className={`payment-option ${selectedPaymentMethod === 'phonePe' ? 'active' : ''}`}>
                <input
                  type="radio"
                  value="phonePe"
                  checked={selectedPaymentMethod === 'phonePe'}
                  onChange={handlePaymentChange}
                />
                <FaCcPaypal className="payment-icon" /> PhonePe
              </label>
              <label className={`payment-option ${selectedPaymentMethod === 'cod' ? 'active' : ''}`}>
                <input
                  type="radio"
                  value="cod"
                  checked={selectedPaymentMethod === 'cod'}
                  onChange={handlePaymentChange}
                />
                <FaCashRegister className="payment-icon" /> Cash on Delivery
              </label>
            </div>

            {/* Render payment fields based on selected method */}
            {(selectedPaymentMethod === 'debitCard' || selectedPaymentMethod === 'creditCard') && (
              <div className="card-details">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="cardName"
                  placeholder="Card Holder's Name"
                  value={paymentDetails.cardName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="Expiry Date (MM/YY)"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            {selectedPaymentMethod === 'upi' && (
              <input
                type="text"
                name="upiId"
                placeholder="Enter UPI ID"
                value={paymentDetails.upiId}
                onChange={handleInputChange}
                required
              />
            )}

            {selectedPaymentMethod === 'paytm' && (
              <input
                type="text"
                name="paytmNumber"
                placeholder="Enter Paytm Number"
                value={paymentDetails.paytmNumber}
                onChange={handleInputChange}
                required
              />
            )}

            {selectedPaymentMethod === 'phonePe' && (
              <input
                type="text"
                name="phonePeNumber"
                placeholder="Enter PhonePe Number"
                value={paymentDetails.phonePeNumber}
                onChange={handleInputChange}
                required
              />
            )}

            {selectedPaymentMethod === 'cod' && (
              <p>Cash on Delivery selected. You will pay upon receiving the product.</p>
            )}

            <button type="submit" className="payment-submit-button">
              Proceed to Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;

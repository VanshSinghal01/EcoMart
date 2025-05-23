import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './CartComponent.css';
import { FaUser, FaEllipsisV, FaShoppingCart, FaStoreAlt } from 'react-icons/fa';
import logo from "./llogo.png";
import user from "./user.jpg";
import Cart from "./cart.jpg";
import Sellr from "./sellere.jpg";
const CartComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialCartItems = location.state?.cartItems || [];
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [totalPrice, setTotalPrice] = useState(0);

  // Recalculate the total price every time cartItems changes
  useEffect(() => {
    const calculateTotal = () => {
      const total = cartItems.reduce((acc, item) => acc + item.current_price, 0);
      setTotalPrice(total);
    };
    calculateTotal();
  }, [cartItems]);

  // Remove item from the cart
  const handleRemoveItem = (indexToRemove) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCartItems);
  };

  // Handle Buy Now and navigate to PaymentComponent
  const handleBuyNow = () => {
    navigate('/PaymentComponent', { state: { cartItems, totalPrice } }); // Navigate to PaymentComponent with cart data
  };

  return (
    <div>
       <header className="header">
        <div className="logo">
          <img src={logo} alt="Flipkart Logo" />
        </div>
        <div className="search-container">
          
          <input
            type="text"
            className="search-input"
            placeholder="Search for items"
            
          />
          <button type="submit" className="search-button">🔍</button>
        </div>

        <div className="header-icons">
          <div className="icon">
            <FaUser />
            <img src={user} alt="User Icon" />
            <span>Account</span>
          </div>
          <div className="icon" >
            <FaShoppingCart />
            <img src={Cart} alt="Cart Icon" />
            <span>Cart</span>
          </div>
          <div className="icon">
            <FaStoreAlt />
            <img src={Sellr} alt="Seller Icon" />
            <span>Become a Seller</span>
          </div>
          <div className="icon">
            <FaEllipsisV />
          </div>
        </div>
      </header>
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cartItems.length > 0 ? (
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="cart-image">
                  <img src={item.product} alt={item.product_name} />
                </div>
                <div className="cart-details">
                  <p className="cart-product-name">{item.product_name}</p>
                  <p className="cart-price">Price: ₹{item.current_price}</p>
                  <p className="cart-mrp">MRP: ₹{item.mrp}</p>
                  <p className="cart-discount">{item.discount}% off</p>
                </div>
                <div className="cart-actions">
                  <button className="remove-button" onClick={() => handleRemoveItem(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="total-amount">
              <span>Total: ₹{totalPrice}</span>
            </div>
            <button className="buy-now-button" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartComponent;

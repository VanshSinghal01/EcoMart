import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaUser, FaShoppingCart, FaStoreAlt, FaEllipsisV } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from "./llogo.png";
import user from "./user.jpg";
import Cart from "./cart.jpg";
import Sellr from "./sellere.jpg";
// import menu from "./menu.jpg";
import Group from './Group-33704.webp';
import pharmacy from './pharmacy-WEB.avif';
import Petcare from './Pet-Care_WEB.avif';
import Babycare from './babycare-WEB.avif';
import slice1 from "./image/paan-corner_web.avif";
import slice2 from "./image/Slice-2_10.avif";
import slice3 from "./image/Slice-3_9.avif";
import slice4 from "./image/Slice-4_9.avif";
import slice5 from "./image/Slice-5_4.avif";
import slice6 from "./image/Slice-6_5.avif";
import slice7 from "./image/Slice-7_3.avif";
import slice8 from "./image/Slice-8_4.avif";
import slice9 from "./image/Slice-9_3.avif";
import slice10 from "./image/Slice-10.avif";
import slice11 from "./image/Slice-11.avif";
import slice12 from "./image/Slice-12.avif";
import slice13 from "./image/Slice-13.avif";
import slice14 from "./image/Slice-14.avif";
import slice15 from "./image/Slice-15.avif";
import slice16 from "./image/Slice-16.avif";
import slice17 from "./image/Slice-17.avif";
import slice18 from "./image/Slice-18.avif";
import slice19 from "./image/Slice-19.avif";
import slice20 from "./image/Slice-20.avif";

import './loginpopup.css'; // Ensure you style the popup correctly in your CSS
import "./dashboard.css"
import "./sidebar.css"
const categories = [
    "Fruits", "Vegetables", "Dairy", "Bakery", "Snacks", "Beverages",
    "Staples", "Personal Care", "Home Care", "Meat", "Seafood", "Baby Care"
];

function Dashboard() {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [cartarr, setCartArr] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State for popup
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // Step 1 for mobile input, Step 2 for OTP
    const [Email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setStep(1);
    };

    const handleContinue = () => {
        if (step === 1 && Email) {
            setStep(2); // Go to OTP step
            setEmail("");
            setOtp("");
        }
    };
    const cartdata = () => {
        navigate('/Cartcomponent', { state: { cartItems: cartarr } });
    };

    const dropdownRef = useRef(null);


    const task = (category) => {
        setSelectedCategory(category); // Set the selected category
        // Handle category logic here (e.g., filtering data by category)
    };

    const handleSearch = (e) => {
        const search = e.target.value;
        setSearchQuery(search);
        // Handle search logic here
    };

    const togglePopup = () => {
        setShowPopup(!showPopup); // Toggle popup visibility
    };
    const submit = () => {
        alert('login Succesfully')
        setShowPopup(false)
        setStep(1);
        setEmail("")
        setOtp("")

    }
    const goToWatchlist = () => {
        console.log("Navigating to Watchlist...");
        // You can add navigation logic here
    };

    const backPopup = () => {
        setStep(1);
        setEmail("")
        setOtp("")
    }
    useEffect(() => {
        fetch('http://localhost:3000/get')
            .then(response => response.json())
            .then(data => setData(data))
    }, [])
    const cart = (item) => {
        setCartArr([...cartarr, item]);
        setCount(count + 1);
        console.log(cartarr);
    };

     const toggleList = () => {
    setIsOpen(!isOpen);
  };

    const handleCategoryClick = (category) => {
        alert(`You selected: ${category}`);
        setIsOpen(false);
    };

    return (
        <div>
            <header className="header">
                <div className="logo">
                    <img src={logo} alt="Flipkart Logo" />
                </div>
                <div className="hamburger-menu" onClick={toggleSidebar}>
                    <FaBars />
                </div>

                {/* Sidebar */}
                {isSidebarOpen && (
                    <div className="sidebar">
                        <div className="mobile-category-wrapper">
                            <div className="mobile-category-toggle" onClick={toggleList}>
                                All Categories ▾
                            </div>

                            {isOpen && (
                                <div className="mobile-category-list">
                                    {categories.map((item, index) => (
                                        <div key={index} className="mobile-category-item">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <ul>
                            <li onClick={goToWatchlist}>Watchlist</li>
                            <li onClick={cartdata}>Add to Cart</li>
                            <li onClick={togglePopup}>Account</li>
                            <li>Become a Seller</li>
                        </ul>
                    </div>
                )}



                <div className="search-container">
                    <select
                        className="category-dropdown"
                        onChange={(e) => task(e.target.value)}
                        value={selectedCategory}
                    >
                        <option value="all">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for items"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button type="submit" className="search-button">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                <div className="header-icons">
                    <div className="icon" onClick={togglePopup}>
                        <FaUser />
                        <img src={user} alt="User Icon" />
                        <span>Account</span>
                    </div>
                    <div className="icon2" onClick={cartdata}>
                        {/* <FaShoppingCart /> */}
                        <img src={Cart} alt="Cart Icon" />
                        <p>
                            <sup>{count}</sup>
                        </p>
                        <span>Cart</span>
                    </div>
                    <div className="icon1">
                        {/* <FaStoreAlt /> */}
                        <img src={Sellr} alt="Seller Icon" />
                        <span>Become a Seller</span>
                    </div>
                    <div className="icon">
                        <FaEllipsisV />
                    </div>
                </div>
            </header>

            <div className='banner'>
                <img src={Group} alt="Banner" />
            </div>
            <div className='shortbanner'>
                <div className='shortbanner-1'>
                    <img src={pharmacy} alt="pharmacy" />
                </div>
                <div className='shortbanner-1'>
                    <img src={Petcare} alt="Petcare" />
                </div>
                <div className='shortbanner-1'>
                    <img src={Babycare} alt="Babycare" />
                </div>
            </div>


            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <button className="close-button" onClick={closePopup}>
                            &times;
                        </button>
                        <button className="close-button-1" onClick={backPopup}>
                            &larr;
                        </button>
                        <div className="popup-content">
                            <img src={logo} alt="Logo" className="popup-logo" />
                            <h2>India's last minute app</h2>
                            <p>Log in or Sign up</p>
                            {step === 1 && (
                                <div className="input-container">
                                    <input
                                        type="text"
                                        placeholder="Enter Email Address"
                                        className="input"
                                        value={Email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button
                                        className="continue-button"
                                        onClick={handleContinue}
                                        disabled={!Email}
                                    >
                                        Continue
                                    </button>
                                </div>
                            )}
                            {step === 2 && (
                                <div className="input-container">
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        className="input"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <button className="continue-button" onClick={submit}>
                                        Submit
                                    </button>
                                </div>
                            )}
                            <p className="terms">
                                By continuing, you agree to our{" "}
                                <a href="#">Terms of service</a> & <a href="#">Privacy policy</a>.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className='catlog'>
                <div className="catlog-grid">
                    {[slice1, slice2, slice3, slice4, slice5, slice6, slice7, slice8, slice9, slice10,].map((src, index) => (
                        <div key={index} className="catlog-item">
                            <img src={src} className="catlog-image" />
                        </div>
                    ))}
                </div>
                <div className="catlog-grid">
                    {[slice11, slice12, slice13, slice14, slice15, slice16, slice17, slice18, slice19, slice20].map((src, index) => (
                        <div key={index} className="catlog-item">
                            <img src={src} className="catlog-image" />
                        </div>
                    ))}
                </div>
            </div>
            <section>
                <div className='product-container'>
                    {data && data.map((item, index) => (
                        <div className='product-card' key={index}>
                            <div className='product-image'>
                                <img src={item.product} alt={item.product_name} onClick={() => viewDetail(item.id, item.mainid)} />
                            </div>
                            <p className='product-name' onClick={() => viewDetail(item.id, item.mainid)}>{item.product_name}</p>
                            <div className='pricing' onClick={() => viewDetail(item.id, item.mainid)}>
                                <p className='current-price'>₹{item.current_price}</p>
                                <p className='mrp'>₹{item.mrp}</p>
                                <p className='discount'>{item.discount}% off</p>
                            </div>
                            <div className='mrp-discount'>
                                <div className='rating'>
                                    {/* {/* <FaStar className='star-icon' />  */}
                                    <span>{item.rateing}</span>
                                </div>
                                <button onClick={() => cart(item)}>Add To Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
import React, { useState, useEffect } from 'react';
import './Cart.css';

const CartPage = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    address: '',
    phone: '',
    paymentType: '',
  });
  const [showInvoice, setShowInvoice] = useState(false);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.customId !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);

  const handleBuyNow = () => {
    setShowModal(true);
  };

  const handleDeliveryDetailsChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmitOrder = () => {
    setShowModal(false);
    setShowInvoice(true);
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.customId} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                  <button onClick={() => handleRemoveFromCart(item.customId)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total Products: {totalQuantity}</h3> {/* Display total number of selected products */}
            <h3>Total: ₹{total}</h3>
            <button onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Delivery Details</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitOrder(); }}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={deliveryDetails.name}
                  onChange={handleDeliveryDetailsChange}
                  required
                />
              </div>
              <div>
                <label>Address:</label>
                <textarea
                  name="address"
                  value={deliveryDetails.address}
                  onChange={handleDeliveryDetailsChange}
                  required
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={deliveryDetails.phone}
                  onChange={handleDeliveryDetailsChange}
                  required
                />
              </div>
              <div>
                <label>Payment Type:</label>
                <select
                  name="paymentType"
                  value={deliveryDetails.paymentType}
                  onChange={handleDeliveryDetailsChange}
                  required
                >
                  <option value="">Select Payment Type</option>
                  <option value="COD">Cash on Delivery</option>
                  <option value="Online">Online Payment</option>
                </select>
              </div>
              <div className="modal-buttons">
                <button type="submit">Submit Order</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}


      {showInvoice && (
        <div className="invoice">
          <h2>Invoice</h2>
          <div>
            <h3>Delivery Details</h3>
            <p><strong>Name:</strong> {deliveryDetails.name}</p>
            <p><strong>Address:</strong> {deliveryDetails.address}</p>
            <p><strong>Phone:</strong> {deliveryDetails.phone}</p>
            <p><strong>Payment Type:</strong> {deliveryDetails.paymentType}</p>
          </div>
          <div>
            <h3>Order Summary</h3>
            <ul>
              {cart.map((item) => (
                <li key={item.customId}>
                  {item.name} - Quantity: {item.quantity} - ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
            <h3>Total: ₹{total}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

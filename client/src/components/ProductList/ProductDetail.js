import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Identicon from "identicon.js";
import './productdetail.css';
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ handleBuyItem, account }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false); // State to manage collapsible description
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [relatedItems, setRelatedItems] = useState([]);
  const navigate = useNavigate();

  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  const shorten = (address) => {
    return `${address.slice(0, 24)}...${address.slice(-10)}`;
  };
  const handleCardClick = (id) => {
    navigate(`/productDetail/${id}`); // Điều hướng tới trang chi tiết sản phẩm
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`https://backend-8ifh.onrender.com/api/items/${id}`);
        setItem(response.data);
        
        // Gọi API để lấy sản phẩm tương tự
        const relatedResponse = await axios.get(`https://backend-8ifh.onrender.com/api/items?category=${response.data.category}`);
        setRelatedItems(relatedResponse.data.filter(relItem => relItem._id !== id)); // Lọc sản phẩm hiện tại ra khỏi danh sách
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'Error fetching item details');
        setLoading(false);
      }
    };
    fetchItemDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  // Hàm hiển thị ngôi sao
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'filled-star' : 'empty-star'}>
          ★
        </span>
      );
    }
    return stars;
  };
  const toggleDescription = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  // Toggle visibility for Details
  const toggleDetails = () => {
    setDetailsExpanded(!detailsExpanded);
  };

  return (
    <div className='producy-detail'>
    <div className="product-detail-container">
      <div className="product-detail-left">
        <div className="product-detail-img">
          {item?.image && (
            <img src={`https://backend-8ifh.onrender.com/${item.image}`} alt={item.name} />
          )}
        </div>
  
        <div className="product-detail-description">
          <h3>
            Description
            <button className="toggle-details" onClick={toggleDescription}>
              {descriptionExpanded ? '▲' : '▼'}
            </button>
          </h3>
          {descriptionExpanded && (
            <div className="description-content">
              <p>{item.description}</p>
            </div>
          )}
        </div>
  
        <div className="product-detail-extra-info">
          <h3>
            Detail
            <button className="toggle-details" onClick={toggleDetails}>
              {detailsExpanded ? '▲' : '▼'}
            </button>
          </h3>
          {detailsExpanded && (
            <div className="details-content">
              <p><strong>Item Address:</strong> {item.itemAddress}</p>
              <p><strong>To Address:</strong> {item.toAddress}</p>
              <p><strong>Transaction Hash:</strong> {shorten(item.hash)}</p>
              <p><strong>From Address:</strong> {item.fromAddress}</p>
              <p><strong>Buyer:</strong> {item.buyer}</p>
              
            </div>
          )}
        </div>
      </div>
  
      <div className="product-detail-right">
        <h2>{item.name}</h2>
        <div className="address-info">
          {item.fromAddress && (
            <div className="from-address">
              <img
                className="profile-img"
                width="50"
                height="50"
                src={`data:image/png;base64,${new Identicon(item.fromAddress, 40).toString()}`}
                alt="profile"
              />
              <div className="info">
                <p style={{ margin: 0 }}>From:</p>
                <span className="ml-2">{shortenAddress(item.fromAddress)}</span>
              </div>
            </div>
          )}
          <div className="divider" />
          {item.buyer && (
            <div className="buyer-info">
              <img
                className="profile-img"
                width="50"
                height="50"
                src={`data:image/png;base64,${new Identicon(item.buyer, 40).toString()}`}
                alt="profile"
              />
              <div className="info">
                <p style={{ margin: 0 }}>Buyer:</p>
                <span className="ml-2">{shortenAddress(item.buyer) || 'Not yet purchased'}</span>
              </div>
            </div>
          )}
        </div>
  
        <div className="created-at">
          <i className="ri-timer-fill">Created At :</i>
          <div className="created-at-header">
            <h5>Day</h5>
            <h5>Month</h5>
            <h5>Year</h5>
          </div>
          <div className="created-at-values">
            <p>{new Date(item.createdAt).getDate()}</p>
            <p>{new Date(item.createdAt).getMonth() + 1}</p>
            <p>{new Date(item.createdAt).getFullYear()}</p>
          </div>
        </div>
  
        <div className="cost-container">
          <span className="cost-label">C o s t </span>
          <div className="cost-box">
            {item.cost} Wei
            <div className="eth-value">{(item.cost / 1e18).toFixed(18)} ETH</div>
          </div>
        </div>
  
        <div className="product-ratings">
          {item.rating ? (
            <>
              {renderStars(item.rating)}
            </>
          ) : (
            <p>No ratings yet.</p>
          )}
        </div>
  
        {item.status === "Create" && (
          <button
            className="create-button"
            onClick={() => handleBuyItem(item._id, item.cost)}
          >
            Buy Now
          </button>
        )}
      </div>
  
      
      </div>
      <div className="related-products">
        <h3>Other products</h3>
        <div className="product-cardss">
          {relatedItems.length > 0 ? (
            relatedItems.map((relatedItem) => (
              <div className="product-cardes" key={relatedItem._id} onClick={() => handleCardClick(relatedItem._id)}>
                <div className="products-img">
                  {relatedItem.image && (
                    <img src={`https://backend-8ifh.onrender.com/${relatedItem.image}`} alt={relatedItem.name} />
                  )}
                </div>
                <div className="products-info">
                  <h6>{relatedItem.name}</h6>
                  <p>Cost: {relatedItem.cost} Wei</p>
                </div>
              </div>
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    </div>
    
  );
  
};

export default ProductDetail;

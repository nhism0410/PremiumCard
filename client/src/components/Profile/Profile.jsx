import React, { useState, useEffect } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import Identicon from "identicon.js";

// Hàm tạo tên ngẫu nhiên với ba số bất kỳ
const getRandomUserName = () => {
  const randomNumbers = Math.floor(100 + Math.random() * 900); // Tạo số ngẫu nhiên từ 100 đến 999
  return `User${randomNumbers}`; // Trả về chuỗi "User" kèm theo ba số
};

const Profile = ({ account, items, handleBuyItem, handleDeliverItem, handleRatingChange, submitRating }) => {
  const [showPurchased, setShowPurchased] = useState(true);
  const [randomName, setRandomName] = useState(""); // Khởi tạo trạng thái cho tên ngẫu nhiên
  const navigate = useNavigate();

  // Cập nhật tên ngẫu nhiên khi component được render
  useEffect(() => {
    setRandomName(getRandomUserName());
  }, []);

  // Lọc sản phẩm đã mua và đã tạo
  const purchasedItems = items.filter(item => item.buyer && item.buyer.toLowerCase() === account.toLowerCase());
  const createdItems = items.filter(item => item.fromAddress && item.fromAddress.toLowerCase() === account.toLowerCase());

  // Hàm render rating stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "filled-star" : "empty-star"}>
          &#9733;
        </span>
      );
    }
    return <div className="stars">{stars}</div>;
  };

  // Điều hướng tới chi tiết sản phẩm
  const handleCardClick = (id) => {
    navigate(`/productDetail/${id}`);
  };

  return (
    <div className="profile">
      <div className="profile-header">
        {/* Profile image */}
        <div className="profile-image">
          <img
            className="ml-2 cursor-pointer"
            width="40"
            height="40"
            src={`data:image/png;base64,${new Identicon(account, 40).toString()}`}
            alt="profile"
          />
        </div>

        {/* Profile info */}
        <div className="profile-info">
          <div className="profile-name">
            <h2>{randomName} <span className="verified"></span></h2>
            <p>{account} <span className="copy-icon">📋</span></p>
          </div>
        </div>
      </div>

      {/* Nút chuyển đổi giữa sản phẩm đã mua và đã tạo */}
      <div className="profile-buttons">
        <button onClick={() => setShowPurchased(true)} className={showPurchased ? "active" : ""}>
          Purchased product
        </button>
        <button onClick={() => setShowPurchased(false)} className={!showPurchased ? "active" : ""}>
          Created product
        </button>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="product-list">
        {showPurchased ? (
          <div>
            <h3>Sản phẩm đã mua</h3>
            {purchasedItems.length > 0 ? (
              <div className="product-cards">
                {purchasedItems.map(item => (
                  <div className="product-card" key={item._id}>
                    <div className="product-img" onClick={() => handleCardClick(item._id)}>
                      {item.image && (
                        <img src={`http://localhost:5000/${item.image}`} alt={item.name} />
                      )}
                    </div>
                    <div className="product-info">
                      <h3>{item.name}</h3>
                      <p>Cost: {item.cost} Wei</p>
                    </div>
                    {/* Các nút hành động */}
                    <div className="product-actions">
                      {item.status === "Create" && (
                        <button className="create-button" onClick={() => handleBuyItem(item._id, item.cost)}>
                          Buy Now
                        </button>
                      )}
                      {item.status === "Purchased" && (
                        <button className="delivery-button" onClick={() => handleDeliverItem(item._id)}>
                          Delivery
                        </button>
                      )}
                      {item.status === "Delivered" && (
                        <>
                          {item.buyer && account && item.buyer.toLowerCase() === account.toLowerCase() ? (
                            item.isRated ? (
                              <div className="product-rating">{renderStars(item.rating)}</div>
                            ) : (
                              <div className="product-rating">
                                <div className="rating">
                                  {[5, 4, 3, 2, 1].map(star => (
                                    <React.Fragment key={star}>
                                      <input
                                        type="radio"
                                        id={`star${star}-${item._id}`}
                                        name={`rating-${item._id}`}
                                        value={star}
                                        onChange={(e) => handleRatingChange(item._id, e)}
                                      />
                                      <label htmlFor={`star${star}-${item._id}`}>&#9733;</label>
                                    </React.Fragment>
                                  ))}
                                </div>
                                <button className="rating-button" onClick={() => submitRating(item._id)}>
                                  Gửi Đánh giá
                                </button>
                              </div>
                            )
                          ) : (
                            <div className="product-rating">{renderStars(item.rating)}</div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Không có sản phẩm nào đã mua.</p>
            )}
          </div>
        ) : (
          <div>
            <h3>Sản phẩm đã tạo</h3>
            {createdItems.length > 0 ? (
              <div className="product-cards">
                {createdItems.map(item => (
                  <div className="product-card" key={item._id}>
                    <div className="product-img" onClick={() => handleCardClick(item._id)}>
                      {item.image && (
                        <img src={`http://localhost:5000/${item.image}`} alt={item.name} />
                      )}
                    </div>
                    <div className="product-info">
                      <h3>{item.name}</h3>
                      <p>Cost: {item.cost} Wei</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Không có sản phẩm nào đã tạo.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

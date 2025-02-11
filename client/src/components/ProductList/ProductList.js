import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "../ProductList/productlist.css";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router-dom";
import categories from "../assets/categories.json";

const ProductList = ({ handleBuyItem, handleDeliverItem, handleSubmitRating, account }) => {
  const [items, setItems] = useState([]); // State to hold the fetched items
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [rating, setRating] = useState({});
  const navigate = useNavigate();

  // Fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://backend-8ifh.onrender.com/api/items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/productDetail/${id}`); // Điều hướng tới trang chi tiết sản phẩm
  };

  // Lọc sản phẩm theo danh mục đã chọn và truy vấn tìm kiếm
  const filteredItems = items
    .filter((item) => (selectedCategory === "All" ? true : item.category === selectedCategory))
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cost.toString().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleRatingChange = (itemId, e) => {
    setRating({ ...rating, [itemId]: e.target.value });
  };

  const submitRating = (itemId) => {
    const itemRating = rating[itemId];
    if (itemRating) {
      handleSubmitRating(itemId, itemRating);
    } else {
      alert("Vui lòng nhập đánh giá trước khi gửi.");
    }
  };

  // Hàm để hiển thị sao dựa trên đánh giá
  const renderStars = (ratingValue) => {
    if (ratingValue === 0) {
      return <span> Chưa có đánh giá nào</span>;
    }

    return (
      <div className="star-display">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= ratingValue ? "filled-star" : "empty-star"}>
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="hero__section">
      <div className="product-list-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <FaSearch className="search-icon" />
          {searchQuery && <FaTimes className="clear-icon" onClick={clearSearch} />}
        </div>
        <h2>Existing Items</h2>
        {/* Bộ lọc danh mục với các nút */}
        <div className="filter-container">
          <button
            className={`category-button ${selectedCategory === "All" ? "active" : ""}`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.name ? "active" : ""}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="product-cards">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div className="product-card" key={item._id}>
                <div className="product-img" onClick={() => handleCardClick(item._id)}>
                  {item.image && (
                    <img
                      src={`https://backend-8ifh.onrender.com/${item.image}`}
                      alt={item.name}
                    />
                  )}
                </div>

                <div className="product-info">
                  <h3>{item.name}</h3>
                  <p>Cost: {item.cost} Wei</p>
                </div>
                <div className="product-actions">
                  {item.status === "Create" && (
                    <button
                      className="create-button"
                      onClick={() => handleBuyItem(item._id, item.cost)}
                    >
                      Buy Now
                    </button>
                  )}

                  {item.status === "Purchased" && (
                    <button
                      className="delivery-button"
                      onClick={() => handleDeliverItem(item._id)}
                    >
                      Delivery
                    </button>
                  )}
                  {item.status === "Delivered" && (
                    <>
                      {item.buyer && account && item.buyer.toLowerCase() === account.toLowerCase() ? (
                        <>
                          {item.isRated ? (
                            <div className="product-rating">
                              {renderStars(item.rating !== null ? item.rating : 0)}
                            </div>
                          ) : (
                            <div className="product-rating">
                              <div className="rating">
                                {[5, 4, 3, 2, 1].map((star) => (
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
                          )}
                        </>
                      ) : (
                        <div className="product-rating">
                          {renderStars(item.rating !== null ? item.rating : 0)}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No items found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;

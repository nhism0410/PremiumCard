import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Gojo from "../images/Gojogif.gif";
import Zoro from "../images/zorogif.gif";
import Shisui from "../images/shisui.gif";
import Sanemi from "../images/sanemii.gif";
import "../Homepage/homepage.css";
import "../ProductList/ProductList";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import "../ProductList/productlist.css";
import categories from "../assets/categories.json";

const HomePage = ({ items, handleBuyItem, handleDeliverItem, handleSubmitRating, account }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [rating, setRating] = useState({});
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const handleCardClick = (id) => {
    navigate(`/productDetail/${id}`); // Điều hướng tới trang chi tiết sản phẩm
  };

  // Filter items by selected category
  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

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

  // Function to render stars based on rating
  const renderStars = (ratingValue) => {
    if (ratingValue === 0) {
      return <span>Chưa có đánh giá nào</span>;
    }

    return (
      <div className="star-display">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= ratingValue ? "filled-star" : "empty-star"}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="hero__section">
     <Container>
  <Row className="hero__section">
    <Col lg="6" md="6">
      <div className="hero__content">
        <h2>
          Discover Models Marketplace{" "}
          <span>Remarkable MARKET </span>
        </h2>
        <p>
          Step into a world where every market item tells a unique story,
          crafted with passion and ready for your exploration. Our
          marketplace offers extraordinary finds, each with its own charm
          and history. Begin your extraordinary journey today and
          experience the magic of discovering one-of-a-kind treasures.
        </p>
        <div className="hero__btns d-flex align-items-center gap-4">
          <button
            className="explore__btn d-flex align-items-center gap-2"
            onClick={() => navigate("/ProductList")}
          >
            <i className="ri-rocket-line"></i>
            Explore
          </button>
          <button
            className="create__btn d-flex align-items-center gap-2"
            onClick={() => navigate("/addProduct")}
          >
            <i className="ri-ball-pen-line"></i>
            Create
          </button>
        </div>
      </div>
    </Col>

    <Col lg="6" md="6" className="box-container">
  <div className="box box-1">
    <img src={Gojo} width="250px" height="auto" alt="Description of Gojo" />
  </div>
  <div className="box box-2">
    <img src={Zoro} width="250px" height="auto" alt="Description of Zoro" />
  </div>
  <div className="box box-3">
    <img src={Sanemi} width="270px" height="auto" alt="Description of Sanemi" />
  </div>
  <div className="box box-4">
    <img src={Shisui} width="250px" height="auto" alt="Description of Shisui" />
  </div>
 
</Col>

  </Row>
</Container>


      <div className="product-list-container">
        <h2>Existing Items</h2>

        {/* Category Filter with Buttons */}
        <div className="filter-container">
          <button
            className={`category-button ${selectedCategory === "All" ? "active" : ""}`} // Sửa cú pháp ở đây
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.name ? "active" : ""}`} // Sửa cú pháp ở đây
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="product-cards">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                className="product-card"
                key={item._id}
              // Thêm onClick để điều hướng
              >
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
                  {/* <p>Status: {item.status}</p> */}
                  {/* <p className="shortened-address">
                    Item Address: {shortenAddress(item.itemAddress)}
                  </p> */}
                </div>
                <div className="product-actions">
                  {item.status === "Create" && (
                    <button
                      className="create-button"
                      onClick={() => handleBuyItem(item._id, item.cost)}
                    >
                      Buy Now
                      {/* <span className="basket-icon"><i className="ri-shopping-basket-2-fill"></i></span> */}
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

export default HomePage;

import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes và Route
import SiteNavbar from "../SiteNavbar/SiteNavbar";
import ProductForm from "../ProductForm/ProductForm";
import ProductList from "../ProductList/ProductList";
import Homepage from "../Homepage/HomePage"; // Đảm bảo rằng đường dẫn này là chính xác
import Footer from "../Footer/Footer";
import ProductDetail from "../ProductList/ProductDetail"; // Đảm bảo rằng đường dẫn này là chính xác
import Profile from "../Profile/Profile"; // Import component Profile

const Main = ({
  items,
  onSubmit,
  onInputChange,
  handleBuyItem,
  handleDeliverItem,
  handleSubmitRating,
  account,
  relatedItems,
}) => {
  return (
    <div>
      {/* Header */}
      <SiteNavbar account={account} />

      {/* Body */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Homepage items={items} handleBuyItem={handleBuyItem} handleDeliverItem={handleDeliverItem} />} /> {/* Trang chủ */}
          <Route path="/addProduct" element={<ProductForm onSubmit={onSubmit} onInputChange={onInputChange} />} /> {/* Thêm sản phẩm */}
          <Route path="/productList" element={<ProductList items={items} handleBuyItem={handleBuyItem} handleDeliverItem={handleDeliverItem} handleSubmitRating={handleSubmitRating} account={account} />} /> {/* Danh sách sản phẩm */}
          <Route path="/productDetail/:id" element={<ProductDetail items={items} handleBuyItem={handleBuyItem} account={account} relatedItems={relatedItems} />} />
          <Route path="/profile" element={<Profile account={account} items={items}  />} /> {/* Trang cá nhân */}
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default Main;

import React, { useState, useEffect } from 'react';
import categories from "../assets/categories.json";
import "../ProductForm/productform.css";
import logo from "../images/logo.png";

const ProductForm = ({ onSubmit, onInputChange }) => {
  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    console.log('Categories:', categories);
    setCategoryList(categories);
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Hiển thị ảnh preview
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Hiển thị ảnh preview
    }
  };

  const handleFormSubmit = () => {
    if (category && image) {
      onSubmit(category, image); // Gọi hàm onSubmit với category và image
    } else {
      alert("Please select both category and image."); // Thông báo nếu thiếu thông tin
    }
  };

  return (
    <div className="product-form-page">
      <div className="formbg padding-horizontal--48 padding-top--48 padding-bottom--24">
        <div className="left-section">
          {!imagePreview ? (
            <div
              className={`upload-box ${dragActive ? 'active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="upload-content">
                <img src={logo} alt="upload" className="upload-icon" />
                <p>No file chosen, yet!</p>
                <label className="upload-label">
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                  Choose Files
                </label>
              </div>
            </div>
          ) : (
            <div className="image-preview-full">
              <img src={imagePreview} alt="Preview" className="preview-image-full" />
            </div>
          )}
        </div>
        <div className="right-section">
          <h2 className="padding-bottom--24">ADD PRODUCT</h2>
          <div className="field padding-bottom--24">
            <label htmlFor="cost">Wei:</label>
            <input
              type="text"
              name="cost"
              onChange={onInputChange}
              className="input-field"
            />
          </div>
          <div className="field padding-bottom--24">
            <label htmlFor="itemName">Item Name:</label>
            <input
              type="text"
              name="itemName"
              onChange={onInputChange}
              className="input-field"
            />
          </div>
          <div className="field padding-bottom--24">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              value={category}
              onChange={handleCategoryChange}
              className="input-fields"
            >
              <option value="">Select a category</option>
              {categoryList.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="field padding-bottom--24">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              onChange={onInputChange}
              className="input-field"
            />
          </div>
          <button
            type="button"
            onClick={handleFormSubmit}
            className="button-create"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;

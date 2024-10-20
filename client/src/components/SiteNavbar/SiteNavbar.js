import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Identicon from "identicon.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../SiteNavbar/navbar.css";
import logo from "../images/logo.png"; // Điều chỉnh đường dẫn nếu cần
import { Link, NavLink } from "react-router-dom"; // Import Link và NavLink

const SiteNavbar = ({ account }) => {
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Navbar.Brand>
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: "120px" }} />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/" className="nav-link" activeClassName="active">
            <i className="ri-home-heart-fill"></i>Home
          </NavLink>
          <NavLink to="/addProduct" className="nav-link" activeClassName="active">
            <i className="ri-function-add-fill"></i>
            Add Product
          </NavLink>
          <NavLink to="/productList" className="nav-link" activeClassName="active">
          <i class="ri-file-list-2-fill"></i>
            Product List
          </NavLink>
          <NavLink to="/profile" className="nav-link" activeClassName="active">
          <i class="ri-profile-fill"></i>
            Profile
          </NavLink>
        </Nav>
      </Navbar.Collapse>
      <Nav.Item className="d-flex align-items-center ml-2">
        {account && (
          <>
              <img
                className="ml-2 cursor-pointer" // Thêm class cursor-pointer để hiển thị con trỏ chuột khi hover
                width="40"
                height="40"
                src={`data:image/png;base64,${new Identicon(account, 40).toString()}`}
                alt="profile"
              />
            <span className="ml-2">{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
          </>
        )}
      </Nav.Item>
    </Navbar>
  );
};

export default SiteNavbar;

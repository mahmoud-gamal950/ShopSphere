import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";
import { CiHeart } from "react-icons/ci";
import { TiShoppingCart } from "react-icons/ti";
import "./header.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import SearchBox from "./searchBox";
export default function TopHeader() {
  const { cartItems, favorites } = useContext(CartContext);

  return (
    <div className="top_header">
      <div className="container">
        <Link className="logo" to="/">
          {" "}
          <img src={Logo} alt="Logo" />{" "}
        </Link>

        <SearchBox />

        <div className="header_icon">
          <div className="icons">
            <Link to="/favorites">
              <CiHeart />
              <span className="count">{favorites.length}</span>
            </Link>
          </div>

          <div className="icons">
            <Link to="/cart">
              <TiShoppingCart />
              <span className="count">{cartItems.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

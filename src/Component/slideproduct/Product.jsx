import { useContext } from "react";
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { FaCartArrowDown, FaRegHeart, FaShare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Product({ item }) {
        
  const { cartItems, addToCart , addToFavorites , favorites , removeFromFavorites} = useContext(CartContext);

  const navigate = useNavigate();


  /*Favorites */
  const isInFav = favorites.some((i) => i.id === item.id);

  const handleaddToFav = ()=>{
    if(isInFav){
        removeFromFavorites(item.id)
    toast.success(`${item.error} Removed To Favorites`)

    }
    else{
      addToFavorites(item)
    toast.success(`${item.title} added To Favorites`)

    }
    
  }


  const isInCart = cartItems.some((i) => i.id === item.id);

  const handleAddToCart = () => {
    addToCart(item);
    toast.success(
      <div className="toast-Wrapper">
        <img src={item.images[0]} alt="" className="toast-img" />
        <div className="toast-contet">
          <strong>{item.title}</strong>
          added to Cart
          <div>
            <button  className="btn" onClick={() => navigate("/Cart")}>
              View Cart
            </button>
          </div>
        </div>
      </div>,
      { duration: 3500 },
    );
  };

  return (
    <div className={`product ${isInCart ? "in-cart" : ""}`}>
      <Link to={`/products/${item.id}`}>
        <span className="status_cart">
          <FaCheck /> in cart
        </span>

        <div className="img_product">
          <img src={item.thumbnail} alt={item.title} />
        </div>

        <p className="name_product">{item.title}</p>

        <div className="stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStarHalfStroke />
        </div>

        <p className="price_product">
          <span>$ {item.price}</span>
        </p>
      </Link>

      <div className="icons">
        <span className="btn_addtocart" onClick={handleAddToCart}>
          <FaCartArrowDown />
        </span>

        <span className= {`${isInFav ? "In-Fav" : ""}`} onClick={handleaddToFav}>
          <FaRegHeart />
        </span>

        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
}

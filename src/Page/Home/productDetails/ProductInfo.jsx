import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaShare } from "react-icons/fa";
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import toast from "react-hot-toast";
import { CartContext } from "../../../Component/context/CartContext";

export default function ProductInfo({ product }) {
  const { cartItems , addToCart , addToFavorites , favorites , removeFromFavorites} = useContext(CartContext);
  const navigate = useNavigate();
  const isInCart = cartItems.some(i=>i.id === product.id );


  const fullStars = Math.floor(product.rating || 0);
  const hasHalfStar =
    (product.rating || 0) - fullStars >= 0.5;

  // Add To Cart
  const handleAddToCart = () => {
    addToCart(product);

    toast.success(
      <div className="toast-Wrapper">
        <img
          src={product.images?.[0] || null}
          alt={product.title}
          className="toast-img"
        />

        <div className="toast-contet">
          <strong>{product.title}</strong>
          <p>Added to Cart</p>

          <div>
            <button
              className= "btn"
              onClick={() => navigate("/Cart")}
            >
              View Cart
            </button>
          </div>
        </div>
      </div>,
      { duration: 3500 }
    );
  };

  // Share Product
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      toast.success("Link copied!");
    } catch {
      toast.error("Could not copy link");
    }
  };


    /*Favorites */
  const isInFav = favorites.some((i) => i.id === product.id);

  const handleaddToFav = ()=>{
    if(isInFav){
        removeFromFavorites(product.id)
    toast.success(`${product.error} Removed To Favorites`)

    }
    else{
      addToFavorites(product)
    toast.success(`${product.title} added To Favorites`)

    }
    
  }


  return (
    <div className="details_item">
      <h1 className="name">{product.title}</h1>

      <div className="stars">
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar key={index} />
        ))}

        {hasHalfStar && <FaRegStarHalfStroke />}

        <span>({product.rating})</span>
      </div>

      <p className="price">${product.price}</p>

      <h5>
        Availability: <span>{product.availabilityStatus}</span>
      </h5>

      <h5>
        Brand: <span>{product.brand || "N/A"}</span>
      </h5>

      <p className="desc">{product.description}</p>

      <h5 className="stock">
        <span>
          Hurry Up! Only {product.stock} Products Left In Stock.
        </span>
      </h5>

      <button className={`btn ${isInCart ? 'in-cart' : ''}`} onClick={handleAddToCart}>
        {isInCart ? "item in cart" : "Add to cart"} <TiShoppingCart />
      </button>

      <div className="icons">
        <span className= {`${isInFav ? "In-Fav" : ""}`} onClick={handleaddToFav} title="Add to wishlist">
          <FaRegHeart />
        </span>

        <span title="Share product" onClick={handleShare}>
          <FaShare />
        </span>
      </div>
    </div>
  );
}
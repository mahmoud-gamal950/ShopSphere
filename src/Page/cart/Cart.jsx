import { useContext } from "react";
import { CartContext } from "../../Component/context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import "./Cart.css";
import PageTranistion from "../../Component/PageTranistion";

export default function Cart() {
  const { cartItems , increaseQuantity , decreaseQuantity , removeFromCart} = useContext(CartContext);
  console.log(cartItems);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <PageTranistion>
      <div className="checkout">
      <div className="ordersummary">
        <h1>Order Summary</h1>

        <div className="items">
          {cartItems.length === 0 ? (
            <p>Your Cart Is Empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div className="item_cart" key={index}>
                <div className="image_name">
                    <div className="image_item">
                  <img src={item.images[0]} alt="" />

                    </div>
                  <div className="content">
                    <h4>{item.title}</h4>
                    <p className="price_item">${item.price}</p>
                    <div className="quantity_control">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="delete_item">
                  <FaTrashAlt />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="button_summary">
          <div className="shop_table">
            <p>Total:</p>
            <span className="total_checkout">${total.toFixed(2)}</span>
          </div>

          <div className="butto_div">
            <button type="submit">Place Order</button>
          </div>
        </div>
      </div>
    </div>
    </PageTranistion>
  );
}

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {

 /*Favorites*/


const [favorites, setFavorirtes] = useState(() => {
const savedFav = localStorage.getItem("favoritesItems");
return savedFav ? JSON.parse(savedFav) : [];
});

  const addToFavorites = (item) =>{
    setFavorirtes((prev) =>{
      if(prev.some((i) => i.id === item.id)) return prev;
      return[...prev , item]
    })
  }

  useEffect(() =>{
    localStorage.setItem("favoritesItems" , JSON.stringify(favorites))
  } ,[favorites])


  const removeFromFavorites = (id) =>{
    setFavorirtes((prev) => prev.filter((i) => i.id !== id))
  }


  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("Invalid cartItems:", error);

      localStorage.removeItem("cartItems");

      return [];
    }
  });

  // increaseQuantity
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };
  // decreaseQuantity
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  // removeFromCart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id != id));
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        addToFavorites,
        favorites,
        removeFromFavorites
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

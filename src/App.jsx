import { Route, Routes } from "react-router-dom";

import ButtonHeader from "./Component/header/ButtonHeader";
import TopHeader from "./Component/header/TopHeader";

import Home from "./Page/Home/Home";
import ProductDetails from "./Page/Home/productDetails/productDetails.jsx";
import Cart from "./Page/cart/Cart.jsx";

import { Toaster } from "react-hot-toast";
import ScrollTop from "./Component/ScrollTop.jsx";
import { AnimatePresence } from "framer-motion";
import CategoryPage from './Page/CategoryPage/categorypage';
import SearchResults from './Page/searchResults';
import Favorites from './Page/favorites/Favorites';

function App() {
  return (
    <>
      <ScrollTop />

      <header>
        <TopHeader />
        <ButtonHeader />
      </header>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#e9e9e9",
            borderRadius: "5px",
            padding: "14px",
          },
        }}
      />
      <AnimatePresence mod="wait">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
      </AnimatePresence>
      
    </>
  );
}

export default App;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./productDetails.css";

import ProductDetailsLoading from "./ProductDetailsLoading";
import SlideProduct from "../../../Component/slideproduct/slideproduct";
import SlideProductLoading from "../../../Component/slideproduct/SlideProductLoading";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [relateproducts, setRelateProducts] = useState([]);
  const [loadingrelateproducts, setLoadingRelateProducts] =
    useState(true);

  // Fetch Product
  useEffect(() => {
    let ignore = false;

    const fetchProduct = async () => {
      setLoading(true);
      setProduct(null);
      setRelateProducts([]);
      setLoadingRelateProducts(true);

      try {
        const res = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data = await res.json();

        if (!ignore) {
          setProduct(data);
        }
      } catch (error) {
        if (!ignore) {
          console.error(error);
          setProduct(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      ignore = true;
    };
  }, [id]);

  // Fetch Related Products
  useEffect(() => {
    if (!product?.category) return;

    let ignore = false;

    const fetchRelatedProducts = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${product.category}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch related products");
        }

        const data = await res.json();

        if (!ignore) {
          const related = data.products.filter(
            (item) => item.id !== product.id
          );

          setRelateProducts(related);
        }
      } catch (error) {
        if (!ignore) {
          console.error(error);
          setRelateProducts([]);
        }
      } finally {
        if (!ignore) {
          setLoadingRelateProducts(false);
        }
      }
    };

    fetchRelatedProducts();

    return () => {
      ignore = true;
    };
  }, [product]);

  // Loading
  if (loading) {
    return <ProductDetailsLoading />;
  }

  // Product Not Found
  if (!product) {
    return <p>Product Not Found</p>;
  }

  return (
    <div>
      {/* Product Details */}
      <div className="item_details">
        <div className="container">
          <ProductImages key={product.id} product={product} />

          <ProductInfo key={product.id} product={product} />
        </div>
      </div>

      {/* Related Products */}
      {loadingrelateproducts ? (
        <SlideProductLoading />
      ) : (
        <SlideProduct
          data={relateproducts}
          title={product.category.replaceAll("-", " ")}
        />
      )}
    </div>
  );
}
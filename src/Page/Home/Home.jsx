import { useEffect, useState } from "react";
import HeroSlider from "../../Component/HeroSlider";
import SlideProduct from "../../Component/slideproduct/slideproduct";
import "./Home.css";
import SlideProductLoading from "../../Component/slideproduct/SlideProductLoading";
import PageTranistion from "../../Component/PageTranistion";
import { useParams } from "react-router-dom";

const cotegories = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sunglasses",
  "sports-accessories",
];

export default function Home() {

  const {id}=useParams();

  const [products, setProducts] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await Promise.all(
          cotegories.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}`,
            );
            const data = await res.json();
            return { [category]: data.products };
          }),
        );
        const productsData = Object.assign({}, ...result);
        setProducts(productsData);
      } catch (error) {
        console.error("Error Fetching", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  console.log(products);



  return (
    <PageTranistion key={id}>
      <div>
      <HeroSlider />

      {loading ? (
  cotegories.map((category) => (
    <SlideProductLoading key={category} />
  ))
) : (
  cotegories.map((category) => (
    <SlideProduct
      key={category}
      data={products[category]}
      title={category.replace("-", " ")}
    />
  ))
)}
    </div>
    </PageTranistion>
  );
}

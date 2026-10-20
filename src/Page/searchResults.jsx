import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTranistion from "./../Component/PageTranistion";
import SlideProductLoading from './../Component/slideproduct/SlideProductLoading';
import Product from './../Component/slideproduct/Product';

export default function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(useLocation().search).get("query");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );
        const data = await res.json();
        setResults(data.products || []);
      } catch (error) {
        console.error("Search Error :", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <PageTranistion key={query}>
      <div className="category_products">
        {loading ? (
          <SlideProductLoading key={query} />
        ) : results.length > 0 ? (
          <div className="container">
            <div className="top_slide">
              <h2>
                Results For : {query}
              </h2>
            </div>
            <div className="products">
              {results.map((item, index) => (
                <Product item={item} key={index} />
              ))}
            </div>
          </div>
        ) : (
         <div className="container"><p>No Results Found</p></div> 
        )}
      </div>
    </PageTranistion>
  );
}
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function searchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
    setSuggestion([]);
  };

  useEffect(() => {
    const fetchsuggestion = async () => {
      if (!searchTerm.trim()) {
        setSuggestion([]);
        return;
      }

      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}`
        );
        const data = await res.json();
        setSuggestion((data.products || []).slice(0, 5));
      } catch (error) {
        console.error("Search Error :", error);
        setSuggestion([]);
      }
    };

    const debonuce = setTimeout(() => {
      fetchsuggestion();
    }, 300);

    return () => clearTimeout(debonuce);
  }, [searchTerm]);

  useEffect(() => {
    setSuggestion([]);
  }, [location]);

  return (
    <div className="searchBox_container">
      <form onSubmit={handlesubmit} className="search_box">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search For Products"
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      {suggestion.length > 0 && (
        <ul className="suggestion">
          {suggestion.map((item) => (
            <li key={item.id}>
              <Link to={`/products/${item.id}`}>
                <img src={item.images[0]} alt="" />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
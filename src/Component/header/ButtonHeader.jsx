import { useEffect, useState } from "react";
import { IoMdMenu, IoMdArrowDropdown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";

const NavLinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Accessories", link: "/accessories" },
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
];

export default function ButtonHeader() {
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  const closeCategories = () => {
    setIsCategoryOpen(false);
  };

  return (
    <div>
      <div className="button_header">
        <div className="container">
          <nav className="nav">
            <div className="category_nav">
              <div
                className="category_button"
                onClick={() => setIsCategoryOpen((prev) => !prev)}
              >
                <IoMdMenu />
                <p>Browse Category</p>
                <IoMdArrowDropdown />
              </div>

              <div
                className={`category_nav_list ${
                  isCategoryOpen ? "active" : ""
                }`}
              >
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    onClick={closeCategories}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="nav_links">
              {NavLinks.map((item) => (
                <li
                  key={item.link}
                  className={
                    location.pathname === item.link ? "active" : ""
                  }
                >
                  <Link to={item.link} onClick={closeCategories}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </div>
          </nav>

          <div className="sign_register_icon">
            <Link to="/" onClick={closeCategories}>
              <PiSignInBold />
            </Link>
            <Link to="/" onClick={closeCategories}>
              <FaUserPlus />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
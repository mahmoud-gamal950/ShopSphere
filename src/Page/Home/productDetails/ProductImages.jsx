import { useEffect, useState } from "react";

export default function ProductImages({ product }) {
  const [selectedImg, setSelectedImg] = useState(
    product?.images?.[0] || null
  );

  useEffect(() => {
    setSelectedImg(product?.images?.[0] || null);
  }, [product]);

  return (
    <div className="imgs_item">
      <div className="big_img">
        {selectedImg && (
          <img
            src={selectedImg}
            alt={product?.title || "Product image"}
            id="big_img"
          />
        )}
      </div>

      <div className="sm_img">
        {product?.images?.map((img, index) => (
          <div key={index}>
            <img
              className={`img_div_sm ${
                selectedImg === img ? "active" : ""
              }`}
              src={img}
              alt={`${product.title} ${index + 1}`}
              onClick={() => setSelectedImg(img)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
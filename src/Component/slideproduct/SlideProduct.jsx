
import Product from "./Product";
import "./SlideProduct.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";

export default function slideproduct({ data, title }) {
  console.log(data);

  return (
    <div className="slide_Product slide">
      <div className="container">
        <div className="top_slide">
          <h2>{title}</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel,
            illum.
          </p>
        </div>

        <Swiper
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={5}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >

          {data.map((item)=>{
            return(
          <SwiperSlide> <Product item = {item}/>  </SwiperSlide>
            )
          })}

        </Swiper>
      </div>
    </div>
  );
}

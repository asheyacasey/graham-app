import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import { ChevLeft, ChevRight } from "../../../public/assets/assets/svg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";
import { productsDAta } from "../../mock";
const Highlits = () => {
  const isMd = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const slickRef = useRef();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMd ? 3 : 1,
    slidesToScroll: 1,
  };
  const nextSlide = () => {
    slickRef?.current?.slickNext();
  };
  const prevSlide = () => {
    slickRef?.current?.slickPrev();
  };
  return (
    <div className="p-4 rounded-lg bg-[#FFC10E] w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-[32px] font-semibold">Highlight</h1>
        <div className="flex items-center space-x-4">
          <div
            onClick={prevSlide}
            className="bg-white w-[36px] h-[36px] flex items-center justify-center rounded-full cursor-pointer"
          >
            <ChevLeft />
          </div>
          <div
            onClick={nextSlide}
            className="bg-white w-[36px] h-[36px] flex items-center justify-center rounded-full cursor-pointer"
          >
            <ChevRight />
          </div>
        </div>
      </div>
      <Slider ref={slickRef} arrows={false} {...settings} className="mt-4">
        {productsDAta.map((el, index) => (
          <ProductCard
            key={index}
            liked={el.liked}
            image={el.img}
            sale={null}
            ShowLike={true}
            isStars={false}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Highlits;

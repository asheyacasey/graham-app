/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronCircleLeft, FaChevronCircleRight, FaChevronCircleUp, FaChevronCircleDown } from 'react-icons/fa'
import { cn } from "@/utils/styles";
interface ProductImagesProps {
  images?: string[]
}
const ProductImages = ({ images }: ProductImagesProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State variable for the selected image index
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };
  const slickRef: any = useRef();
  const settings: Settings = {
    dots: false,
    infinite: images!.length > 3,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false
  };
  const nextSlide = () => {
    slickRef?.current?.slickNext();
  };
  const prevSlide = () => {
    slickRef?.current?.slickPrev();
  };
  const handleLeft = () => {
    if (selectedImageIndex !== 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };
  const handleRight = () => {
    if (selectedImageIndex < images!.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };
  return (
    <div className="flex justify-between h-full md:gap-5 gap-1">
      <div className="flex flex-col flex-[0.3] gap-5 relative">
        <div className={cn("md:h-[500px] overflow-hidden", {
          'h-[400px]': images!.length < 4
        })}>
          <Slider ref={slickRef} {...settings} className="w-full h-full  vertical-slider overflow-hidden ">
            {images!.map((dta, index) => (
              <div
                onClick={() => handleImageClick(index)}
                key={index}
                className="bg-white p-2 cursor-pointer md:h-[150px] h-[150px] overflow-hidden">
                <img
                  className="object-contain w-full h-full"
                  src={dta}
                  alt="product"
                />
              </div>
            ))}
          </Slider>
        </div>
        {
          images!.length > 3 && (
            <div className="flex gap-2 items-center justify-center">
              <FaChevronCircleDown onClick={() => prevSlide()} size={24} className="text-brand_yellow-500 bg-white rounded-full cursor-pointer" />
              <FaChevronCircleUp onClick={() => nextSlide()} size={24} className="text-brand_yellow-500 bg-white rounded-full cursor-pointer" />
            </div>
          )
        }
      </div>
      <div className="bg-white relative flex-[0.7] w-full md:h-[480px] h-[400px] rounded-md flex justify-center items-center">
        {
          images!.length > 1
            ?
            <i
              className="absolute left-5 cursor-pointer"
              onClick={() => handleLeft()}
            >
              <FaChevronCircleLeft size={24} className="text-brand_yellow-500 bg-white rounded-full" />
            </i>
            :
            null
        }
        <img
          width={96}
          height={96}
          className="object-center h-96 w-96 object-contain"
          src={images![selectedImageIndex]}
          alt="selected-product"
        />
        {
          images!.length > 1 ?
            <i
              className="absolute right-5 cursor-pointer"
              onClick={() => handleRight()}
            >
              <FaChevronCircleRight size={24} className="text-brand_yellow-500 bg-white rounded-full" />
            </i>
            :
            null
        }
      </div>
    </div>
  );
};

ProductImages.defaultValue = {
  images: []
}

export default ProductImages;

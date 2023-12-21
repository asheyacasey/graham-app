import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { ChevLeft, ChevRight } from "../../../public/assets/assets/svg";
import { IAdd } from '@/types'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";
import { get_highlight_adds_api } from "@/services/add.services";
import LoadingScreen from "../LoadingScreen";
import { cn } from "@/utils/styles";
const Highlits = () => {
  const [loading, setloading] = useState(true)
  const [highlightAdds, sethighlightAdds] = useState<IAdd[]>([])
  const isMd = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const slickRef = useRef() as any;

  const settings = {
    dots: false,
    infinite: false,
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
  const GetHighlightAdds = useCallback(async () => {
    try {
      setloading(true)
      const { data } = await get_highlight_adds_api()
      sethighlightAdds(data.products)
    } catch (error) {
    } finally {
      setloading(false)
    }
  }, [])
  useEffect(() => {
    GetHighlightAdds()
  }, [GetHighlightAdds])
  const HighlightAdds = useMemo(() => {
    if (!isMd) {
      return highlightAdds;
    }
    if (highlightAdds.length >= 3) {
      return highlightAdds
    }
    let Adds = [] as IAdd[]
    if (highlightAdds.length < 3) {
      Adds = [...highlightAdds]
      const addTempAdds = 3 - highlightAdds.length
      Array(addTempAdds).fill("").forEach(() => {
        // @ts-ignore
        Adds.push("")
      })
    }
    return Adds
  }, [highlightAdds, isMd])
  // if (loading) {
  //   return <LoadingScreen className="h-[300px]" />
  // }
  return (
    <div className={cn("p-4 rounded-lg bg-[#FFC10E] w-full", {
      'hidden': highlightAdds.length === 0
    })}>
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
        {HighlightAdds.map((el, index) => (
          el ?
            <ProductCard
              key={index}
              // @ts-ignore
              liked={el.liked}
              add={el}
            />
            :
            <div key={index} />
        ))}
      </Slider>
    </div>
  );
};

export default Highlits;

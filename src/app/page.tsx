"use client";
import React, { useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import SideBarListings from "../ui/components/SideBarListings";
// const ProductCard = dynamic(() => import("../ui/components/ProductCard"), {
//   ssr: false,
// });

const Highlits = dynamic(() => import("../ui/components/Highlits"), {
  ssr: false,
});
import Common from "@/templates/Common";
import { getAddWithFiltersThunk, addSliceInitialState } from "@/redux/slices/add";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ProductsFooter from "@/ui/components/ProductsFooter";
import ProductListings from "@/layout/home/ProductListings";

const Landing = () => {
  const dispatch = useAppDispatch()
  const addState = useAppSelector((s) => s.add)

  const GetInitialAdds = useCallback(() => {
    dispatch(getAddWithFiltersThunk({ ...addSliceInitialState.filteration }))
  }, [dispatch])
  useEffect(() => {
    GetInitialAdds()
  }, [GetInitialAdds])
  return (
    <Common>
      <div className={`bg-[#F6F7FB] relative`}>
        <div className="flex p-3 md:px-[30px] md:py-[15px] gap-x-6">
          <div
            className="
        hidden lg:flex lg:flex-[0.3] 
        "
          >
            <SideBarListings />
          </div>
          <div
            className="
        flex-1   lg:flex-[0.7]
        overflow-hidden
        "
          >
            <Highlits />
            <ProductListings />
            <ProductsFooter />
          </div>
        </div>
      </div>
    </Common>
  );
};

export default Landing;

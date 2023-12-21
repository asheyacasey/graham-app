"use client";
import CategoryFilter from "@/layout/category/CategoryFilter";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import ProductsFooter from "@/ui/components/ProductsFooter";
import BreadCrumbs from "@/ui/BreadCrumbs";
import { URLS } from "@/utils/URLS";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addSliceInitialState, getAddWithFiltersThunk } from "@/redux/slices/add";
import Common from "@/templates/Common";
import ProductListings from "@/layout/home/ProductListings";

const Category = () => {
  const dispatch = useAppDispatch()
  const param = useSearchParams();
  const categoryName = param.get("cat");

  const GetCategoryAdds = useCallback(() => {
    if (!categoryName) {
      return;
    }
    dispatch(getAddWithFiltersThunk({ ...addSliceInitialState.filteration, category: categoryName }))
  }, [categoryName, dispatch])
  useEffect(() => {
    GetCategoryAdds()
  }, [GetCategoryAdds])
  return (
    <Common>
      <div className={`bg-[#F6F7FB] relative`}>
        <div className=" flex flex-col lg:flex-row p-3 md:px-[30px] md:py-[15px] gap-x-6">
          <div className=" flex  lg:flex-[0.25] ">
            <CategoryFilter options={[]} placeholder="All Categories" />
          </div>
          <div className="flex-1 lg:flex-[0.75] overflow-hidden">
            <BreadCrumbs
              fontSize={20}
              data={[
                { title: "Home", route: URLS.HOME },
                { title: categoryName ?? '' },
              ]}
            />
            <ProductListings />
            <ProductsFooter />
          </div>
        </div>
      </div>
    </Common>
  );
};

export default Category;

"use client";
import DarkDropdown from "@/ui/components/DarkDropdown";
import { useParams, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Calender, Location, Share } from "../../../../public/assets/assets/svg";
import HeartBadge from "@/ui/components/HeartBadge";
import DateSelectCard from "@/ui/components/DateSelectCard";
import SellerDescription from "@/ui/components/SellerDescription";
import { SUGGESTED, productsDAta } from "@/mock";
import ProductCard from "@/ui/components/ProductCard";
import ProductImages from "@/ui/components/ProductImages";
import BreadCrumbs from "@/ui/BreadCrumbs";
import Common from "@/templates/Common";
import { getSingleAddApi, getSingleAddForDescriptionPageApi } from "@/services/add.services";
import { IAdd } from "@/types";
import LoadingScreen from "@/ui/LoadingScreen";
import { URLS } from "@/utils/URLS";
import moment from 'moment'
import { useAppSelector } from "@/redux/hooks";
import { likeProductApi, unLikeProductApi } from "@/services/likedProduct.services";
import useCopy from "@/hooks/useCopy";
const Product = () => {
  const { handleCopy } = useCopy()
  const authState = useAppSelector((s) => s.auth)
  const [loading, setloading] = useState(true)
  const [productLiked, setproductLiked] = useState(false)
  const [totalCreatedProduct, settotalCreatedProduct] = useState(0)
  const [add, setadd] = useState<IAdd | null>(null)
  const [suggestedProducts, setsuggestedProducts] = useState<IAdd[]>([])
  const params = useParams()
  const GetProduct = useCallback(async () => {
    if (!params?.pid) {
      return;
    }
    try {
      const { data } = await getSingleAddForDescriptionPageApi(params.pid as string)
      setadd(data.add)
      setproductLiked(data.liked)
      settotalCreatedProduct(data.totalCreatedProducts)
      setsuggestedProducts(data.suggestedProducts)
    } catch (error) {
    } finally {
      setloading(false)
    }
  }, [params.pid])
  useEffect(() => {
    GetProduct()
  }, [GetProduct])
  if (loading) {
    return <LoadingScreen className="min-h-screen" />
  }
  const handleLike = async () => {
    if (!add?._id) {
      return
    }
    setproductLiked(true)
    try {
      await likeProductApi({ add_id: add?._id })
    } catch (error: any) {

    }
  }
  const handleDislike = async () => {
    if (!add?._id) {
      return
    }
    setproductLiked(false)
    try {
      await unLikeProductApi({ add_id: add?._id })
    } catch (error) {

    }
  }
  const addURL =
    `${window.location.origin}${URLS.PRODUCT(params.pid as string)}` as string;
  const handleCopyURL = () => {
    handleCopy(addURL)
  }
  return (
    <Common>
      <div className={`bg-[#F6F7FB] relative`}>
        <div className="lg:w-8/12 flex flex-col gap-y-2 lg:gap-y-0 px-2 lg:flex-row md:px-[30px] md:pt-4 gap-x-6 items-center">
          <div className="w-full lg:w-4/12">
            <DarkDropdown placeholder="All Categories" />
          </div>
          <BreadCrumbs data={[{ title: "Home", route: URLS.HOME }, { title: add?.category ?? '', route: `${URLS.CATEGORY}?cat=${add?.category}` }, { title: add?.add_title ?? '' }]} />
        </div>
        <div className="flex justify-between p-3 md:px-[30px] md:py-[15px] md:mt-8 mt-5 gap-3">
          <div>
            <h2 className="pb-3 font-Roboto font-medium text-lg">{add?.add_title}</h2>
            <div className="flex items-center gap-5">
              <div className="flex gap-3 items-center">
                <Calender />
                <span className="text-brand_gray-200 text-xs font-normal">
                  {moment(add?.createdAt).format('DD MMM YYYY')}
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <Location />
                <span className="text-brand_gray-200 text-xs font-normal">
                  {add?.location.street_no_1}, {add?.location.city}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Share onClick={handleCopyURL} className='cursor-pointer' />
            {
              authState.isLoggedIn ?
                <HeartBadge onClick={productLiked ? handleDislike : handleLike} liked={productLiked} />
                :
                null
            }
          </div>
        </div>
        <div className=" flex flex-col lg:flex-row p-3 md:px-[30px] md:py-[15px] gap-6">
          <div className="lg:flex-[0.7]">
            <ProductImages images={add?.images ?? []} />
          </div>
          <div className="flex-1 lg:flex-[0.3]">
            {
              add &&
              <DateSelectCard add={add} />
            }
          </div>
        </div>
        <div className="flex px-4 md:px-[30px]">
          <SellerDescription add={add!} totalProducts={totalCreatedProduct} />
        </div>
        <div className="flex flex-col px-[30px] py-10 ">
          <h3 className="font-medium text-xl font-Roboto">Related Products</h3>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-[10px] mt-[32px]">
            {suggestedProducts.map((el, index) => (
              <ProductCard
                key={index}
                // @ts-ignore
                liked={el.liked}
                add={el}
              />
            ))}
          </div>
        </div>
      </div>
    </Common>
  );
};

export default Product;

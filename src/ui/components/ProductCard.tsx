import React, { useMemo, useState } from "react";
import { Location, Star } from "../../../public/assets/assets/svg";
import HeartBadge from "./HeartBadge";
import Image from "next/image";
import { URLS } from "@/utils/URLS";
import { useRouter } from "next/navigation";
import { IAdd } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import { likeProductApi, unLikeProductApi } from "@/services/likedProduct.services";
import { SubscriptionNameEnum } from "@/utils/enums";

interface CardProps {
  liked: boolean;
  className?: string;
  add?: IAdd
}
const ProductCard = ({
  className = "",
  liked = true,
  add
}: CardProps) => {
  const [isLiked, setisLiked] = useState(liked)
  const authState = useAppSelector((s) => s.auth)
  const router = useRouter();
  const starArray = Array.from({ length: 5 });
  const handleLike = async () => {
    if (!add?._id) {
      return
    }
    setisLiked(true)
    try {
      await likeProductApi({ add_id: add?._id })
    } catch (error: any) {

    }
  }
  const handleDislike = async () => {
    if (!add?._id) {
      return
    }
    setisLiked(false)
    try {
      await unLikeProductApi({ add_id: add?._id })
    } catch (error) {

    }
  }
  const isFeaturedProduct = useMemo(() => {
    const isPushUpPlan = add?.plan.name === SubscriptionNameEnum.PUSH_UP_PLAN
    if (isPushUpPlan) {
      return true;
    }
    return false
  }, [add?.plan.name])
  if (!add) {
    return <div />
  }
  return (
    <div
      className={`py-[20px] px-4 bg-white w-full h-max rounded-lg cursor-pointer relative ${className}`}
    >
      {authState.isLoggedIn && (
        <HeartBadge onClick={isLiked ? handleDislike : handleLike} liked={isLiked} className="absolute z-10 right-2 top-2" />
      )}
      {
        isFeaturedProduct ?
          <h1
            className="absolute z-10 left-0 top-5 p-2 text-center bg-brand_yellow-400 rounded-r-[4px] text-white font-Roboto text-xs font-bold uppercase">
            FEATURED
          </h1>
          :
          null
      }
      <div onClick={() => {
        if (add?._id) {
          router.push(URLS.PRODUCT(add?._id));
        }
      }}>
        <div className="px-[43px] h-[150px] relative rounded-lg overflow-hidden">
          <Image
            fill
            src={add?.images[0] ?? ''}
            className="object-contain rounded-lg overflow-hidden"
            alt="productCard"
          />
        </div>
        <div className="mt-6">
          <h1 className="text-[#959EAD] font-Roboto text-xs line-clamp-1">{add?.category}</h1>
          <div className="flex items-center justify-between mt-[5px]">
            <h1 className="text-base font-medium font-Roboto line-clamp-1 mr-3">{add?.add_title}</h1>
            <h1 className="text-base font-medium font-Roboto capitalize whitespace-nowrap">${add?.prices.rent_price}/{add?.prices.rented_as}</h1>
          </div>
          <div className="flex py-4 justify-between items-center w-full">
            <div className=" flex items-center space-x-[8px]">
              <Location />
              <h1 className="text-[#959EAD] text-xs font-Roboto max-w-full line-clamp-1">
                {`${add?.location.street_no_1}, ${add?.location.city}`}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

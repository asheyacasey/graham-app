import React from "react";
import { Location } from "../../../public/assets/assets/svg";
import Input from "@/ui/form/Input";
import Button from "@/ui/form/Button";
import { useRouter } from "next/navigation";
import { URLS } from "@/utils/URLS";
import { useAppSelector } from "@/redux/hooks";
import { formatCurrency } from "@/utils/formatCurrency";
import { addPercentageToPrice } from "@/utils/addPercentageToPrice";
import { calculateTotalPriceThunk, calculateTotalServicesFeePriceThunk, calculateTotalTaxesPriceThunk, getSingleItemTimeDifference, getTotalFinalAmountThunk } from "@/redux/slices/cart";

const CartPriceDescription = () => {
  const cartState = useAppSelector((s) => s.cart)
  const router = useRouter();
  const navigateToCheckoutPage = () => {
    router.push(URLS.CHECKOUT);
  };
  const getTotalTaxPercentages = () => {
    return cartState.cartItems.reduce((prevValue, item) => {
      return prevValue + item.add.prices.taxes
    }, 0)
  }
  const getTotalServiceFeeFPercentages = () => {
    return cartState.cartItems.reduce((prevValue, item) => {
      return prevValue + item.add.prices.service_fee
    }, 0)
  }
  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg py-4 px-5">
        <div className="h-10 border border-brand_blue-500 rounded-10px  py-2 px-4 flex items-center gap-3">
          <Location />
          <h1 className="text-sm font-Poppins font-semibold text-brand_gray-200">
            Deliver To
          </h1>
          <h1 className="text-sm font-Poppins font-semibold">Home</h1>
        </div>
        <h1 className="text-brand_gray-200 text-sm font-Montserrat font-medium mt-2.5">
          2rd FLOOR, Older Town, Melsugen, Schwalm-Eder, northern Hesse, 34212 -
          Germany
        </h1>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="flex-[0.7]">
          <Input
            className="border-none rounded-lg"
            placeholder="Enter coupon code here"
          />
        </div>
        <Button className="bg-brand_yellow-500 border-none flex-[0.3]">
          coupon
        </Button>
      </div>
      <div className="bg-white rounded-lg  mt-6">
        <div className="border-b-2 border-b-brand_gray-200 border-opacity-50 pb-2 px-5 py-4 ">
          <h1 className="font-Roboto text-base font-medium">Price Details</h1>
        </div>
        <div className="px-5 py-4 space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="text-brand_gray-200 text-sm font-Roboto font-medium">
              Price ( {cartState.cartItems.length} Products )
            </h1>
            <h1 className="text-black text-sm font-Roboto font-medium">{formatCurrency(calculateTotalPriceThunk(cartState))}</h1>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-brand_gray-200 text-sm font-Roboto font-medium">
              Tax ({getTotalTaxPercentages()}%)
            </h1>
            <h1 className="text-black text-sm font-Roboto font-medium">{formatCurrency(calculateTotalTaxesPriceThunk(cartState))}</h1>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-brand_gray-200 text-sm font-Roboto font-medium">
              Service Fee ({getTotalServiceFeeFPercentages()}%)
            </h1>
            <h1 className="text-black text-sm font-Roboto font-medium">{formatCurrency(calculateTotalServicesFeePriceThunk(cartState))}</h1>
          </div>
          <div className="h-[2px] bg-brand_gray-200 bg-opacity-50" />
          <div className="flex items-center justify-between">
            <h1 className="text-brand_gray-200 text-sm font-Roboto font-medium">
              Total Amount
            </h1>
            <h1 className="text-black text-sm font-Roboto font-medium">{formatCurrency(getTotalFinalAmountThunk(cartState))}</h1>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Button
          onClick={navigateToCheckoutPage}
          className="bg-brand_yellow-500 border-none text-base font-semibold font-Montserrat py-3"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPriceDescription;

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CartItem, getSingleCartItemTotalPriceWithTaxAndFeeThunk, getTotalFinalAmountThunk } from "@/redux/slices/cart";
import { URLS } from "@/utils/URLS";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CartSummary = () => {
  const cartState = useAppSelector((s) => s.cart)
  const router = useRouter()
  return (
    <div className="w-full mb-8 !overflow-hidden col-span-7">
      <h1 className="font-Montserrat text-2xl font-semibold break-words">
        Cart Summary <span className="text-brand_yellow-500 cursor-pointer" onClick={() => {
          router.push(URLS.CART)
        }}>(Edit)</span>
      </h1>
      <div className=" overflow-x-auto mt-6 w-full">
        <table
          className="w-full"
          style={{
            borderStyle: "hidden",
          }}
        >
          <thead>
            <tr className="text-base font-semibold text-left text-white bg-brand_yellow-500 whitespace-nowrap">
              <th className="px-4 py-3 rounded-l-10px">Product</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3 rounded-r-10px">Price</th>
            </tr>
          </thead>
          <tbody className="space-y-6">
            <tr className="h-[34px]" />
            {
              cartState.cartItems.map((el, index) => (
                <TableRow key={index} item={el} />
              ))
            }
            <TotalPriceRow />
          </tbody>
        </table>
      </div>
    </div>
  );
};
interface RowProps {
  item: CartItem
}
const TotalPriceRow = () => {
  const cartState = useAppSelector((s) => s.cart)
  return (
    <tr className="first:rounded-t-lg bg-white border-b-[2px]  border-b-brand_gray-200 border-opacity-50">
      <th className="px-4 py-3" colSpan={3}>
        <div className="flex items-center gap-3 justify-end">
          <h1 className="text-brand_gray-200 text-18px font-semibold">
            Sub Total :
          </h1>
          <h1 className="text-18px font-semibold">{formatCurrency(getTotalFinalAmountThunk(cartState))}</h1>
        </div>
      </th>
    </tr>
  );
};


const TableRow = ({ item }: RowProps) => {
  return (
    <>
      <tr className="first:rounded-t-lg bg-white border-b-[2px]  border-b-brand_gray-200 border-opacity-50">
        <th className="px-4 py-3">
          <ProductSection item={item} />
        </th>
        <th className="px-4 py-3">
          <Quantity item={item} />
        </th>
        <th className="px-4 py-3">
          <Price item={item} />
        </th>
      </tr>
    </>
  );
};
export default CartSummary;

export const ProductSection = ({ item }: RowProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-[75px] h-[75px] relative">
        <Image
          src={item.add.images[0]}
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-sm font-semibold font-Montserrat leading-[22px]">
          {item.add.add_title}
        </h1>
        <h1 className="text-xs font-Roboto text-brand_gray-200">
          Seller <span className="text-black font-medium">{item.add.created_by?.username}</span>
        </h1>
      </div>
    </div>
  );
};

const Quantity = ({ item }: RowProps) => {
  return (
    <div className="flex items-center justify-center ">
      <h1 className="font-Roboto text-sm font-semibold text-center">{item.quantity}</h1>
    </div>
  );
};

const Price = ({ item }: RowProps) => {
  const cartState = useAppSelector((s) => s.cart)
  return (
    <div className="flex items-center justify-center ">
      <h1 className="font-Roboto text-sm font-semibold text-center whitespace-nowrap">
        {formatCurrency(getSingleCartItemTotalPriceWithTaxAndFeeThunk(cartState, item.add._id))}
      </h1>
    </div>
  );
};

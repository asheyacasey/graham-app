import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import add from "@/redux/slices/add";
import { CartItem, getSingleCartItemTotalPriceWithTaxAndFeeThunk, getSingleItemTimeDifference, removeCartItemAction, updateCartItemAction, } from "@/redux/slices/cart";
import { DeleteIcon, MinusIcon, PlusIcon } from "@/ui/Icon";
import HeartBadge from "@/ui/components/HeartBadge";
import { euroSign } from "@/utils/constants";
import { formatCurrency } from "@/utils/formatCurrency";
import moment from "moment";
import Image from "next/image";
import React from "react";

const CartListingTable = () => {
  const cartState = useAppSelector((s) => s.cart)
  return (
    <div className="w-full mb-8 overflow-hidden col-span-7">
      <div className="w-full overflow-x-auto">
        <table
          className="w-full"
          style={{
            borderStyle: "hidden",
          }}
        >
          <thead>
            <tr className="text-base font-semibold text-left text-white bg-brand_yellow-500 whitespace-nowrap">
              <th className="px-4 py-3 rounded-l-10px">Product</th>
              <th className="px-4 py-3">Rent</th>
              <th className="px-4 py-3">Lease Period</th>
              <th className="px-4 py-3">Total Rent</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3 rounded-r-10px">Actions</th>
            </tr>
          </thead>
          <tbody className="space-y-6">
            {
              cartState.cartItems.map((el, index) => (
                <TableRow item={el} key={index} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartListingTable;

interface TableRowProps {
  item: CartItem
}
const TableRow = ({ item }: TableRowProps) => {
  return (
    <>
      <tr className="w-full h-[25px]" />
      <tr className="text-gray-700 bg-white">
        <td className="px-4 py-3 rounded-l-lg">
          <ProductSection item={item} />
        </td>
        <td className="px-4 py-3 text-ms font-semibold ">
          <RentSection item={item} />
        </td>
        <td className="px-4 py-3 text-xs font-semibold ">
          <PeriodSection item={item} />
        </td>
        <td className="px-4 py-3 text-xs">
          <TotalRentSection item={item} />
        </td>
        <td className="px-4 py-3 text-sm">
          <Quantity item={item} />
        </td>
        <td className="px-4 py-3 text-sm rounded-r-lg">
          <Actions item={item} />
        </td>
      </tr>
    </>
  );
};
export const ProductSection = ({ item }: TableRowProps) => {
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

const RentSection = ({ item }: TableRowProps) => {
  return (
    <div className="flex items-center justify-center">
      <h1 className="font-Roboto text-sm font-medium">{euroSign}{item.add.prices.rent_price}/{item.add.prices.rented_as}</h1>
    </div>
  );
};
const PeriodSection = ({ item }: TableRowProps) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-center font-Montserrat font-semibold text-sm">
        {getSingleItemTimeDifference(item.add, new Date(item.start_date_time), new Date(item.end_date_time))} {item.add.prices.rented_as.toLowerCase()}
      </h1>
      <h1 className="text-center text-brand_gray-200 font-Montserrat font-semibold text-sm">
        {/* 1st May to 15th May */}
        {moment(item.start_date_time).format("Do MMM")} to {moment(item.end_date_time).format("Do MMM")}
      </h1>
    </div>
  );
};

const TotalRentSection = ({ item }: TableRowProps) => {
  const cartSlice = useAppSelector((s) => s.cart)
  return (
    <div className="flex items-center justify-center ">
      <h1 className="font-Roboto text-sm font-semibold text-center">{formatCurrency(getSingleCartItemTotalPriceWithTaxAndFeeThunk(cartSlice, item.add._id))}</h1>
    </div>
  );
};

const Quantity = ({ item }: TableRowProps) => {
  const dispatch = useAppDispatch()
  const handlePlus = () => {
    if (!(item.quantity < item.add.available_stock)) {
      return;
    }
    dispatch(updateCartItemAction({
      ...item,
      quantity: item.quantity + 1
    }))
  }
  const handleMinus = () => {
    if (!(item.quantity > 1)) {
      return;
    }
    dispatch(updateCartItemAction({
      ...item,
      quantity: item.quantity - 1
    }))
  }
  return (
    <div className="flex items-center justify-center ">
      <div className="rounded-full flex items-center justify-center gap-1">
        <MinusIcon
          onClick={handleMinus}
          height={"24"}
          width={"24"}
          className="stroke-brand_gray-200 cursor-pointer"
        />
        <input
          value={item.quantity}
          className="outline-none border text-center border-black p-2 bg-transparent rounded-lg text-xs text-black w-[35px] h-[35px]"
        />
        <PlusIcon
          height={"24"}
          width={"24"}
          className="stroke-black cursor-pointer"
          onClick={handlePlus}
        />
      </div>
    </div>
  );
};

const Actions = ({ item }: TableRowProps) => {
  const dispatch = useAppDispatch()
  const authState = useAppSelector((s) => s.auth)
  const handleDelete = () => {
    dispatch(removeCartItemAction({ id: item.add._id }))
  }
  return (
    <div className="flex items-center justify-center gap-4">
      {
        authState.isLoggedIn ?
          <HeartBadge liked={false} />
          :
          null
      }
      <DeleteIcon className="cursor-pointer" onClick={handleDelete} height={"25"} width={"25"} />
    </div>
  );
};

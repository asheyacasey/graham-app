import Button from "@/ui/form/Button";
import { cn } from "@/utils/styles";
import Image from "next/image";
import React from "react";
import {
  ChevDownAltSmall,
  Edit,
  Trash,
} from "../../../../public/assets/assets/svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IAdd, IOrder, RENTED_AS_ENUM } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import Select, { OptionType } from "@/ui/form/Select";
import { change_listing_product_status_thunk, remove_listing_single_item_action } from "@/redux/slices/seller-account-flow";
import Link from "next/link";
import { URLS } from "@/utils/URLS";
import { delete_add_api } from "@/services/add.services";
import { handleApiError } from "@/utils/hanldeApiError";
import { toast } from "react-toastify";
import { toggleFullScreenLoadingAction } from "@/redux/slices/app";
import { Dialog, DialogActions } from "@mui/material";

const ListingTable = () => {
  const sellerAccountState = useAppSelector((s) => s.seller_account_flow)
  return (
    <div className="!w-full mb-8 !overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table
          className="w-full"
          style={{
            borderStyle: "hidden",
          }}
        >
          <thead>
            <tr className=" text-sm font-semibold text-left text-white bg-brand_yellow-500 whitespace-nowrap">
              <th className="px-4 py-3 rounded-l-10px">Product</th>
              <th className="px-4 py-3 text-center">Price</th>
              <th className="px-4 py-3 text-center">Role</th>
              <th className="px-4 py-3 text-center">Quantity</th>
              <th className="px-4 py-3 text-center">Plan</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 rounded-r-10px text-center">Action</th>
            </tr>
          </thead>
          <tbody className="space-y-6">
            {
              sellerAccountState.listings.products.map((product, index) => (
                <TableRow product={product} key={index} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingTable;
interface TableRowProps {
  product: IAdd
}
const TableRow = ({ product }: TableRowProps) => {
  const [deleteDialog, setdeleteDialog] = React.useState(false)
  const [loading, setloading] = React.useState(false)
  const dispatch = useAppDispatch()
  const handleDelete = async () => {
    try {
      setloading(true)
      await delete_add_api(product._id)
      dispatch(remove_listing_single_item_action({ id: product._id }))
      toast.success("Add deleted successfully")
    } catch (error) {
      const err = handleApiError(error)
      toast.error(err)
    } finally {
      setloading(false)
      setdeleteDialog(false)
    }
  }
  return (
    <>
      <Dialog fullWidth maxWidth='xs' open={deleteDialog}>
        <div className='p-5 space-y-10 mt-5'>
          <div className='p-5'>
            <h1 className='text-center font-bold text-xl'>Delete listing item</h1>
          </div>
          <DialogActions>
            <Button disabled={loading} onClick={handleDelete} className='bg-red-500 border-none'>
              Confirm
            </Button>
            <Button disabled={loading} className='border-none' onClick={() => {
              setdeleteDialog(false)
            }}>
              Cancel
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <tr className="h-6" />
      <tr className="bg-white ">
        <td className="px-4 py-3 text-sm ">
          <ProductSection product={product} />
        </td>
        <td className="px-4 py-3 text-sm font-Roboto font-medium whitespace-nowrap">{formatCurrency(product.prices.rent_price)}/{product.prices.rented_as.toLocaleLowerCase()}</td>
        <td className="px-4 py-3 text-sm font-Roboto font-medium text-center uppercase">
          {product.prices.rented_as === RENTED_AS_ENUM.DAY ? 'Daily' : null}
          {product.prices.rented_as === RENTED_AS_ENUM.HOUR ? 'Hourly' : null}
          {product.prices.rented_as === RENTED_AS_ENUM.MONTH ? 'Monthly' : null}
          {product.prices.rented_as === RENTED_AS_ENUM.WEEKS ? 'Weekly' : null}
          {product.prices.rented_as === RENTED_AS_ENUM.YEAR ? 'Yearly' : null}
        </td>
        <td className="px-4 py-3 text-sm font-Roboto font-medium  text-center">
          {product.available_stock}
        </td>
        <td className="px-4 py-3 text-sm font-Roboto font-medium  text-center whitespace-nowrap">
          {product.plan.name.replaceAll("_", " ")}
        </td>
        <td className="px-4 py-3 text-sm font-Montserrat font-semibold  text-center">
          <div className="w-[120px]">
            <Select
              value={{ label: product.disabled ? "Disable" : "Active", value: String(product.disabled) }}
              options={[
                { label: "Disable", value: "true" },
                { label: "Active", value: "false" }
              ]}
              onChange={(value: OptionType) => {
                dispatch(change_listing_product_status_thunk({ id: product._id, status: value.value === "true" ? true : false }))
              }}
            />
          </div>
        </td>
        <td className="px-4 py-3 flex items-center justify-center gap-3 pt-8 rounded-r-lg">
          <div onClick={() => {
            setdeleteDialog(true)
          }} className="bg-red-500 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer">
            <Trash />
          </div>
          <Link href={URLS.EDIT_ADD(product._id)} className="bg-red-500 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer">
            <Edit />
          </Link>
        </td>
      </tr>
    </>
  );
};
const ProductSection = ({ product }: TableRowProps) => {
  console.log('single product', { product })
  return (
    <div className="flex items-center gap-4">
      <div className="w-[75px] h-[75px] relative">
        <Image
          src={product.images[0]}
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-sm font-semibold font-Montserrat leading-[22px]">
          {product.add_title}
        </h1>
        <h1 className="text-xs font-Roboto ">
          <span className="text-brand_gray-200">Category</span> {product.category}{" "}

          <span className="text-brand_gray-200">and</span> {product.sub_category}
        </h1>
        <h1 className="text-xs font-Roboto ">
          <span className="text-brand_gray-200">City</span> {product.location.city}
        </h1>
      </div>
    </div>
  );
};


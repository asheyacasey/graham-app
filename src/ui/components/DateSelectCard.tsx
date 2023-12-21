/* eslint-disable react/no-unescaped-entities */
import React, { useMemo, useState } from "react";
import Select from "react-select";
import Button from "../form/Button";
import { IAdd } from "@/types";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from 'yup'
import ErrorBox from "../form/ErrorBox";
import { useAppDispatch } from "@/redux/hooks";
import { addCartItemAction, getSingleItemTimeDifference } from "@/redux/slices/cart";
import { useRouter } from "next/navigation";
import { URLS } from "@/utils/URLS";
import { addPercentageToPrice } from '@/utils/addPercentageToPrice'
import { formatCurrency } from "@/utils/formatCurrency";
import { toast } from "react-toastify";
interface DateSelectCardProps {
  add: IAdd
}
function convertToDate(startDate: string, startTime: string) {
  // Combine start date and time strings
  const combinedDateTime = `${startDate} ${startTime}`;

  // Format for parsing
  const format = 'YYYY-MM-DD HH:mm';

  // Parse and convert to Date object
  const dateObject = moment(combinedDateTime, format).toDate();

  return dateObject;
}
const bookingValidation = Yup.object({
  stock: Yup.number().required("Select stocks.").min(1, 'Select stocks.'),
  start_date: Yup.string().required("Start date is required."),
  end_date: Yup.string().required("End date is required."),
  start_time: Yup.string().required("Start time is required."),
  end_time: Yup.string().required("End time is required.")
})
type BookingValues = Yup.InferType<typeof bookingValidation>

const DateSelectCard = ({ add }: DateSelectCardProps) => {
  const router = useRouter()
  const [isBooking, setisBooking] = useState(false)
  const dispatch = useAppDispatch()

  const Stocks = useMemo(() => {
    return Array(add?.available_stock).fill("").map((_, index) => ({ label: `${index + 1} Kit`, value: index + 1 }))
  }, [add?.available_stock])

  const { values, setValues, submitForm, errors } = useFormik({
    initialValues: { stock: 0, start_date: "", end_date: "", start_time: "", end_time: "" } as BookingValues,
    validationSchema: bookingValidation,
    onSubmit: (submitValues) => {
      if (getDifference <= 0) {
        toast.error("Duration must be Greater than 0")
        return;
      }
      dispatch(addCartItemAction({
        add,
        start_date_time: new Date(convertToDate(submitValues.start_date, submitValues.start_time)),
        end_date_time: new Date(convertToDate(submitValues.end_date, submitValues.end_time)),
        quantity: submitValues.stock,
        liked: false
      }))
      if (isBooking) {
        router.push(URLS.CHECKOUT)
      } else {
        toast.success("Added to cart successfully")
        router.push(URLS.CART)
      }
    },
  })

  const calculateTotalPriceOfKitDays = () => {
    const startDate = convertToDate(values.start_date, values.start_time)
    const endtDate = convertToDate(values.end_date, values.end_time)
    return getSingleItemTimeDifference(add!, new Date(startDate), new Date(endtDate)) * add?.prices?.rent_price! * values.stock
  }
  const calculateTotal = () => {
    return calculateTotalPriceOfKitDays() + (addPercentageToPrice(calculateTotalPriceOfKitDays(), add?.prices.service_fee!)) + (addPercentageToPrice(calculateTotalPriceOfKitDays(), add?.prices?.taxes!)) + (add?.payment_policy?.deposit! ? add?.payment_policy?.amount * values.stock : 0)
  }

  const getDifference = useMemo(() => {
    const startDate = convertToDate(values.start_date, values.start_time)
    const endtDate = convertToDate(values.end_date, values.end_time)
    const toreturn = getSingleItemTimeDifference(add!, new Date(startDate), new Date(endtDate))
    return toreturn
  }, [add, values.end_date, values.end_time, values.start_date, values.start_time])
  console.log("values==>", values)
  return (
    <div className="p-3 bg-white rounded-md">
      <h2 className="font-Roboto font-medium text-lg lowercase">{formatCurrency(add?.prices.rent_price!)} / {add?.prices?.rented_as}</h2>
      <div className="flex flex-col w-full rounded-md border-2 border-black ">
        <div className="border-b-2 flex  border-black">
          <div className="border-black border-r-2 w-full">
            <div className="flex w-full flex-col py-2 px-2">
              <label className="text-xs text-brand_gray-200 uppercase font-Roboto">
                Date From
              </label>
              <input
                className="outline-none font-medium h-5 text-sm"
                value={values.start_date}
                type={'date'}
                onChange={(e) => {
                  setValues((prev) => ({ ...prev, start_date: e.target.value }))
                }}
              />
              {
                errors.start_date ?
                  <ErrorBox error={errors.start_date} />
                  :
                  null
              }
            </div>
          </div>
          <div className="flex w-full flex-col py-2 px-2">
            <label className="text-xs text-brand_gray-200 uppercase font-Roboto">
              Date To
            </label>
            <input
              className="outline-none font-medium h-5 text-sm"
              value={values.end_date}
              type={'date'}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, end_date: e.target.value }))
              }}
            />
            {
              errors.end_date ?
                <ErrorBox error={errors.end_date} />
                :
                null
            }
          </div>
        </div>
        <div className=" flex border-black">
          <div className="border-black border-r-2 w-full">
            <div className="flex w-full flex-col py-2 px-2">
              <label className="text-xs text-brand_gray-200 uppercase font-Roboto">
                Time From
              </label>
              <input
                className="outline-none font-medium h-5 text-sm"
                type={'time'}
                value={values.start_time}
                onChange={(e) => {
                  console.log('time', e.target.value)
                  setValues((prev) => ({ ...prev, start_time: e.target.value }))
                }}
              />
              {
                errors.start_time ?
                  <ErrorBox error={errors.start_time} />
                  :
                  null
              }
            </div>
          </div>
          <div className="flex w-full flex-col py-2 px-2">
            <label className="text-xs text-brand_gray-200 uppercase font-Roboto">
              Time To
            </label>
            <input
              className="outline-none font-medium h-5 text-sm"
              type={'time'}
              value={values.end_time}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, end_time: e.target.value }))
              }}
            />
            {
              errors.end_time ?
                <ErrorBox error={errors.end_time} />
                :
                null
            }
          </div>
        </div>
        <div className="border-t-2  border-black">
          <span className="pt-2 ml-2 text-sm font-Roboto font-medium text-brand_gray-200">
            Stock
          </span>
          <Select
            className=" w-full react-stock-select"
            classNamePrefix="react-select-stock"
            styles={{
              singleValue: (newstyles) => ({
                ...newstyles,
                fontWeight: "600",
              }),
            }}
            options={Stocks}
            components={{
              IndicatorSeparator: () => null,
              DownChevron: () => <div></div>,
            }}
            onChange={(data) => { setValues((prev) => ({ ...prev, stock: Number(data?.value) })) }}
          />
          {
            errors.stock ?
              <ErrorBox error={errors.stock} />
              :
              null
          }
        </div>
      </div>
      <div className="flex gap-5 my-4">
        <Button type="button" onClick={() => {
          setisBooking(true)
          submitForm()
        }} className="bg-brand_yellow-500 h-10 border-none p-0 text-sm font-Montserrat font-medium">
          Book
        </Button>
        <Button
          onClick={() => {
            setisBooking(false)
            submitForm()
          }}
          type="button" className="bg-white border-2 border-brand_gray-200 h-10 p-0 font-medium font-Montserrat text-brand_gray-200 ">
          Add to Cart
        </Button>
      </div>
      <p className="text-sm font-medium text-center text-brand_gray-200">
        You won't be charged yet
      </p>
      <div className="flex flex-col gap-3 my-3">
        <div className="flex justify-between text-sm font-Montserrat font-semibold">
          <span>{values.stock ? values.stock : 0} kit x {formatCurrency(add?.prices?.rent_price!)} x {getDifference} {add?.prices?.rented_as.toLocaleLowerCase()}</span>
          <span>{formatCurrency(calculateTotalPriceOfKitDays())}</span>
        </div>
        <div className="flex justify-between text-sm font-Montserrat font-semibold">
          <span>Service Fees</span>
          <span>{formatCurrency(addPercentageToPrice(calculateTotalPriceOfKitDays(), add?.prices?.service_fee!))}</span>
        </div>
        <div className="flex justify-between text-sm font-Montserrat font-semibold">
          <span>Occupancy Taxes & Fees</span>
          <span>{formatCurrency(addPercentageToPrice(calculateTotalPriceOfKitDays(), add?.prices?.taxes!))}</span>
        </div>
        <div className="flex justify-between text-sm font-Montserrat font-semibold">
          <span>Security Fees</span>
          <span>{formatCurrency((add?.payment_policy.deposit ? add?.payment_policy?.amount * values.stock : 0))}</span>
        </div>
      </div>
      <div className="bg-brand_gray-200 w-full h-[1px] " />
      <div className="flex justify-between text-sm font-Montserrat font-semibold my-2">
        <span>Total</span>
        <span>{formatCurrency(calculateTotal())}</span>
      </div>
    </div>
  );
};

export default DateSelectCard;

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getSingleCartItemTotalPriceWithTaxAndFeeThunk, getSingleItemTimeDifference, singleProductServiceFeeThunk, singleProductTaxesThunk } from "@/redux/slices/cart";
import { createCheckoutSession } from "@/services/order.services";
import Button from "@/ui/form/Button";
import Input from "@/ui/form/Input";
import RadioButton from "@/ui/form/RadioButton";
import { handleApiError } from "@/utils/hanldeApiError";
import { cn } from "@/utils/styles";
import { useFormik } from "formik";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from 'yup'
import { loadStripe } from "@stripe/stripe-js";
import { toggleFullScreenLoadingAction } from "@/redux/slices/app";
const orderValidation = Yup.object({
  username: Yup.string().required("User name is required."),
  name: Yup.string().required("Name is required."),
  email: Yup.string().required("Email is required.").email("Invalid email."),
  mobile_number: Yup.string().required("Mobile number is required."),
  city: Yup.string().required("City is required."),
  zip_code: Yup.string().required("Zip code is required."),
  state: Yup.string().required("State is required."),
  country: Yup.string().required("Country is required."),
})

type TItem = {
  product?: string;
  quantity?: number;
  total_price?: number;
  start_date?: string;
  end_date?: string;
  time_difference?: number;
  taxes?: number;
  service_fee?: number;
  seller?: string;
}
const CheckoutForm = () => {
  const dispatch = useAppDispatch()
  const cartState = useAppSelector((s) => s.cart)
  const authState = useAppSelector((s) => s.auth)
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      city: authState.user?.city ?? "",
      country: authState.user?.country ?? "",
      email: authState.user?.email ?? "",
      mobile_number: authState.user?.phoneNumber ?? "",
      name: authState.user?.fullName ?? "",
      state: authState.user?.state ?? "",
      username: authState.user?.username ?? "",
      zip_code: authState.user?.zip_code ?? "",
    } as Yup.InferType<typeof orderValidation>,
    validationSchema: orderValidation,
    onSubmit: async (submitValues) => {
      const items = [] as TItem[]
      cartState.cartItems.forEach((item) => {
        items.push({
          end_date: new Date(item.end_date_time).toISOString(),
          product: item.add._id,
          quantity: item.quantity,
          seller: item.add.created_by?._id,
          service_fee: singleProductServiceFeeThunk(cartState, item.add._id),
          start_date: new Date(item.start_date_time).toISOString(),
          taxes: singleProductTaxesThunk(cartState, item.add._id),
          time_difference: getSingleItemTimeDifference(item.add, new Date(item.start_date_time), new Date(item.end_date_time)),
          total_price: getSingleCartItemTotalPriceWithTaxAndFeeThunk(cartState, item.add._id)
        })
      })
      try {
        dispatch(toggleFullScreenLoadingAction(true))
        const { data } = await createCheckoutSession({
          items,
          billing_details: submitValues
        })
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string
        );
        stripe?.redirectToCheckout({ sessionId: data });
      } catch (error: any) {
        const err = handleApiError(error)
        toast.error(err)
      } finally {
        dispatch(toggleFullScreenLoadingAction(false))
      }
    }
  })
  console.log(errors)
  return (
    <form className="" onSubmit={handleSubmit}>
      <h1 className="font-Montserrat text-2xl font-semibold">
        Billing Details
      </h1>
      <div className="bg-white rounded-lg p-6 mt-7">
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            value={values.username}
            name="username"
            onChange={handleChange}
            error={errors.username && touched.username ? errors.username : ""}
            className="border-brand_blue-500" label="Username"
          />
          <Input
            value={values.name}
            name="name"
            onChange={handleChange}
            error={errors.name && touched.name ? errors.name : ""}
            className="border-brand_blue-500" label="Name"
          />
          <Input
            value={values.email}
            name="email"
            onChange={handleChange}
            error={errors.email && touched.email ? errors.email : ""}
            className="border-brand_blue-500" label="Email" />
          <Input
            value={values.mobile_number}
            name="mobile_number"
            onChange={handleChange}
            error={errors.mobile_number && touched.mobile_number ? errors.mobile_number : ""}
            className="border-brand_blue-500" label="Mobile No." />
          <Input
            value={values.city}
            name="city"
            onChange={handleChange}
            error={errors.city && touched.city ? errors.city : ""}
            className="border-brand_blue-500" label="City" />
          <Input
            value={values.zip_code}
            name="zip_code"
            onChange={handleChange}
            error={errors.zip_code && touched.zip_code ? errors.zip_code : ""}
            className="border-brand_blue-500" label="Zip Code" />
          <Input
            value={values.state}
            name="state"
            onChange={handleChange}
            error={errors.state && touched.state ? errors.state : ""}
            className="border-brand_blue-500" label="State" />
          <Input
            value={values.country}
            name="country"
            onChange={handleChange}
            error={errors.country && touched.country ? errors.country : ""}
            className="border-brand_blue-500" label="Country" />
        </div>
        <div className="">
          <h1 className="text-18px font-semibold mt-6">
            By Clicking the Button, you are agree to the{" "}
            <span className="text-brand_yellow-500 cursor-pointer">
              Terms and Conditions
            </span>
          </h1>
          <div className=" mt-12">
            {
              cartState.cartItems.length === 0 || !authState.isLoggedIn
                ?
                null
                :
                <Button type="submit" className="bg-brand_yellow-500 text-white border-none text-2xl p-0 font-semibold h-[60px]">
                  Place Order
                </Button>
            }
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 mt-7">
        {/* <div className="">
          <div className="grid lg:grid-cols-3 gap-6">
            <Paypal />
            <Stripe />
            <CreditCard />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-x-6 gap-y-7 mt-10">
          <Input className="border-brand_blue-500" label="Card Holder Name" />
          <Input className="border-brand_blue-500" label="Card Number" />
          <Input className="border-brand_blue-500" label="Expiry Date" />
          <Input className="border-brand_blue-500" label="CVV" />
        </div> */}
        {/* <h1 className="text-18px font-semibold mt-6">
          By Clicking the Button, you are agree to the{" "}
          <span className="text-brand_yellow-500 cursor-pointer">
            Terms and Conditions
          </span>
        </h1>
        <div className=" mt-12">
          <Button type="submit" className="bg-brand_yellow-500 text-white border-none text-2xl p-0 font-semibold h-[60px]">
            Place Order
          </Button>
        </div> */}
      </div>
    </form>
  );
};

export default CheckoutForm;

const Paypal = ({ selected }: { selected?: boolean }) => {
  return (
    <div
      className={cn("border-2 border-brand_blue-500 rounded-10px py-5 px-3", {
        "border-brand_yellow-500": selected,
      })}
    >
      <div className="flex items-center gap-3">
        <RadioButton />
        <h1 className="text-sm font-semibold ">Paypal</h1>
      </div>
      <Image
        width={100}
        height={26}
        className="object-contain mt-4"
        src={"/assets/images/Paypal.svg"}
        alt=""
      />
    </div>
  );
};
const Stripe = ({ selected }: { selected?: boolean }) => {
  return (
    <div
      className={cn("border-2 border-brand_blue-500 rounded-10px py-5 px-3", {
        "border-brand_yellow-500": selected,
      })}
    >
      <div className="flex items-center gap-3">
        <RadioButton />
        <h1 className="text-sm font-semibold ">Stripe</h1>
      </div>
      <Image
        width={63}
        height={26}
        className="object-contain mt-4"
        src={"/assets/images/Stripe.svg"}
        alt=""
      />
    </div>
  );
};
const CreditCard = ({ selected = true }: { selected?: boolean }) => {
  return (
    <div
      className={cn("border-2 border-brand_blue-500 rounded-10px py-5 px-3", {
        "border-brand_yellow-500": selected,
      })}
    >
      <div className="flex items-center gap-3">
        <RadioButton />
        <h1 className="text-sm font-semibold ">Credit Card</h1>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Image
          width={24}
          height={24}
          className="object-contain mt-4"
          src={"/assets/images/DinnerClubInternational.svg"}
          alt=""
        />
        <Image
          width={24}
          height={24}
          className="object-contain mt-4"
          src={"/assets/images/MasterCard.svg"}
          alt=""
        />
        <Image
          width={24}
          height={24}
          className="object-contain mt-4"
          src={"/assets/images/AmericanExpress.svg"}
          alt=""
        />
        <Image
          width={24}
          height={24}
          className="object-contain mt-4"
          src={"/assets/images/Visa.svg"}
          alt=""
        />
        <Image
          width={24}
          height={24}
          className="object-contain mt-4"
          src={"/assets/images/Discover.svg"}
          alt=""
        />
      </div>
    </div>
  );
};

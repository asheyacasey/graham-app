"use client";

import CartSummary from "@/layout/checkout/CartSummary";
import CheckoutForm from "@/layout/checkout/CheckoutForm";
import Common from "@/templates/Common";
import Button from "@/ui/form/Button";
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Image from "next/image";
import { URLS } from "@/utils/URLS";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
const Checkout = () => {
  const router = useRouter()
  const authState = useAppSelector((s) => s.auth)
  return (
    <Common>
      <>
        <Dialog open={!authState.isLoggedIn} maxWidth='md' fullWidth>
          <DialogContent>
            <div className="space-y-4 pb-5">
              <div className="w-full lg:h-[300px] h-[200px] overflow-hidden relative">
                <Image
                  fill
                  src={'/assets/assets/images/ad.png'}
                  className="object-contain"
                  alt=""
                />
              </div>
              <h1 className="text-center text-xl font-bold">Login Required!</h1>
              <p className="text-center">Please log in to continue with the checkout process. Your account ensures a seamless and secure shopping experience.</p>
              <Button className="" onClick={() => { router.push(URLS.LOGIN) }}>Login Now</Button>
            </div>
          </DialogContent>
        </Dialog>
        <div className="flex items-center gap-4">
          <Button className="w-[281px]">My Account</Button>
        </div>
        <div className="mt-7 grid lg:grid-cols-10 gap-10">
          <div className="lg:col-span-6">
            <CheckoutForm />
          </div>
          <div className="lg:col-span-4 overflow-hidden">
            <CartSummary />
          </div>
        </div>
      </>
    </Common>
  );
};

export default Checkout;

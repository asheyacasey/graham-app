"use client";
import CartListingTable from "@/layout/cart/CartListingTable";
import CartPriceDescription from "@/layout/cart/CartPriceDescription";
import EmptyCart from "@/layout/cart/EmptyCart";
import { useAppSelector } from "@/redux/hooks";
import Common from "@/templates/Common";
import BreadCrumbs from "@/ui/BreadCrumbs";
import Button from "@/ui/form/Button";
import { URLS } from "@/utils/URLS";
import React, { useState } from "react";

const Cart = () => {
  const cartState = useAppSelector((s) => s.cart)
  return (
    <Common>
      <>
        <div className="flex gap-4 flex-wrap items-center">
          <Button className="w-[281px]">My Cart</Button>
          <BreadCrumbs data={[{ title: "Home", route: URLS.HOME }, { title: "Cart" }]} />
        </div>
        <div className="mt-7">
          {cartState.cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="lg:grid lg:grid-cols-10 gap-3">
              <CartListingTable />
              <CartPriceDescription />
            </div>
          )}
        </div>
      </>
    </Common>
  );
};

export default Cart;

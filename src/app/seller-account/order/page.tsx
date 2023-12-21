"use client";
import OrdersTable from "@/layout/buyer-account/orders/OrdersTable";
import Tabs from "@/layout/seller-account/Tabs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { get_seller_orders_thunk } from "@/redux/slices/seller-account-flow";
import Common from "@/templates/Common";
import Profile from "@/templates/Profile";
import { IconComponent } from "@/ui/Icon";
import LoadingScreen from "@/ui/LoadingScreen";
import NotFoundScreen from "@/ui/NotFoundScreen.tsx";
import Pagination from "@/ui/components/Pagination";
import Input from "@/ui/form/Input";
import React, { useCallback, useEffect } from "react";

const SellerAccount = () => {
  const sellerState = useAppSelector((s) => s.seller_account_flow)
  const dispatch = useAppDispatch()
  const GetOrders = useCallback(() => {
    dispatch(get_seller_orders_thunk({ page: 1, title: "" }))
  }, [dispatch])
  useEffect(() => {
    GetOrders()
  }, [GetOrders])
  return (
    <Common>
      <Profile>
        <Tabs />
        <div>
          <h1 className="text-2xl font-semibold mt-7">My Orders</h1>
          <div className="mt-6 md:flex md:items-center md:justify-between md:space-y-0 space-y-3">
            <div className='w-64'>
              <Input
                value={sellerState.orders.title}
                onChange={(e) => {
                  dispatch(get_seller_orders_thunk({ page: 1, title: e.target.value }))
                }}
                placeholder='Search by Listing Name' rightElement={<IconComponent className='fill-brand_gray-200' name='SearchIcon' />} />
            </div>
          </div>
        </div>
        <div className='mt-8 w-full'>
          {
            sellerState.orders.isOrderLoading ?
              <LoadingScreen className="h-[400px]" />
              :
              null
          }
          {
            !sellerState.orders.isOrderLoading && sellerState.orders.orders.length > 0 ?
              <>
                <OrdersTable />
                <Pagination
                  currentPage={sellerState.orders.page}
                  totalPages={Math.ceil(sellerState.orders.totalDocs / sellerState.orders.limit)}
                  onPageChange={(page: number) => {
                    dispatch(get_seller_orders_thunk({ page: page, title: sellerState.orders.title }))
                  }}
                />
              </>
              :
              null
          }
          {
            !sellerState.orders.isOrderLoading && sellerState.orders.orders.length === 0 ?
              <NotFoundScreen className="h-[400px]" />
              :
              null
          }
        </div>
      </Profile>
    </Common>
  );
};

export default SellerAccount;

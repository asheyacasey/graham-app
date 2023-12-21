'use client';
import AccountHistory from '@/layout/buyer-account/analytics/AccountHistory';
import NextBooking from '@/layout/buyer-account/analytics/NextBooking';
import Tabs from '@/layout/seller-account/Tabs';
import { get_seller_future_orders_api } from '@/services/order.services';
import { getSellerUserAnalyticsApi } from '@/services/user.services';
import Common from '@/templates/Common';
import Profile from '@/templates/Profile';
import { IOrder } from '@/types';
import { IconComponent } from '@/ui/Icon';
import LoadingScreen from '@/ui/LoadingScreen';
import { formatCurrency } from '@/utils/formatCurrency';
import { handleApiError } from '@/utils/hanldeApiError';
import { getCookie } from 'cookies-next';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
type SellerAnalytics = {
  total_orders: number;
  total_completed_orders: number;
  total_products: number;
  published_properties: number;
  un_published_properties: number;
  total_earnings: number;
};
const SellerAccount = () => {
  const [futureOrders, setfutureOrders] = useState<IOrder[]>([])
  const [analyticsLoading, setanalyticsLoading] = useState(false);
  const [analytics, setanalytics] = useState<SellerAnalytics>({
    published_properties: 0,
    total_completed_orders: 0,
    total_earnings: 0,
    total_orders: 0,
    total_products: 0,
    un_published_properties: 0,
  });
  const GetSellerAnalytics = useCallback(async () => {
    try {
      setanalyticsLoading(true);
      const { data } = await getSellerUserAnalyticsApi();
      setanalytics(data);
    } catch (error) {
      const err = handleApiError(error);
      toast.error(err);
    } finally {
      setanalyticsLoading(false);
    }
  }, []);
  useEffect(() => {
    GetSellerAnalytics();
  }, [GetSellerAnalytics]);
  const cookieValue = getCookie('googtrans');
  const GetSellerFutureOrders = useCallback(async () => {
    try {
      const { data } = await get_seller_future_orders_api()
      setfutureOrders(data.orders)
    } catch (error) {

    }
  }, [])
  useEffect(() => {
    GetSellerFutureOrders()
  }, [GetSellerFutureOrders])
  return (
    <Common>
      <Profile>
        <Tabs />
        <div>
          <h1 className="text-2xl font-semibold mt-7">My Analytics</h1>
          {analyticsLoading ? (
            <LoadingScreen className="h-[200px]" />
          ) : (
            <div className="mt-5 grid lg:grid-cols-3 md:grid-cols-2 gap-3">
              {/* card */}
              <div className="py-4 pl-4 pr-14 rounded-14px bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center bg-brand_green-500 h-14 w-14 rounded-full">
                    <IconComponent className="fill-white " name="MoneyIcon" />
                  </div>
                  <h1
                    className={
                      cookieValue === '/auto/de'
                        ? 'text-base font-semibold'
                        : 'text-2xl font-semibold'
                    }
                  >
                    Total Earning
                  </h1>
                </div>
                <h1 className="text-brand_green-500 text-2xl font-semibold mt-4">
                  {formatCurrency(analytics.total_earnings)}
                </h1>
              </div>
              {/* card */}
              <div className="py-4 pl-4 pr-14 rounded-14px bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center bg-brand_red-600 h-14 w-14 rounded-full">
                    <IconComponent className="fill-white " name="CartIcon" />
                  </div>
                  <h1
                    className={
                      cookieValue === '/auto/de'
                        ? 'text-base font-semibold'
                        : 'text-2xl font-semibold'
                    }
                  >
                    Total Ordered
                  </h1>
                </div>
                <h1 className="text-brand_red-600 text-2xl font-semibold mt-4">
                  {analytics.total_orders}
                </h1>
              </div>
              {/* card */}
              <div className="py-4 pl-4 pr-14 rounded-14px bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center bg-brand_blue-600 h-14 w-14 rounded-full shrink-0">
                    <IconComponent className="fill-white " name="CartIcon" />
                  </div>
                  <h1
                    className={
                      cookieValue === '/auto/de'
                        ? 'text-base font-semibold'
                        : 'text-2xl font-semibold'
                    }
                  >
                    Total Completed
                  </h1>
                </div>
                <h1 className="text-brand_blue-600 text-2xl font-semibold mt-4">
                  {analytics.total_completed_orders}
                </h1>
              </div>
              {/* card */}
              <div className="py-4 pl-4 pr-14 rounded-14px bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center bg-brand_blue-600 h-14 w-14 rounded-full shrink-0">
                    <IconComponent className="fill-white " name="CartIcon" />
                  </div>
                  <h1
                    className={
                      cookieValue === '/auto/de'
                        ? 'text-base font-semibold'
                        : 'text-2xl font-semibold'
                    }
                  >
                    Total Products
                  </h1>
                </div>
                <h1 className="text-brand_blue-600 text-2xl font-semibold mt-4">
                  {analytics.total_products}
                </h1>
              </div>
              {/* card */}
              <div className="py-4 pl-4 pr-14 rounded-14px bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center bg-brand_green-500 h-14 w-14 rounded-full shrink-0">
                    <IconComponent className="fill-white" name="MoneyIcon" />
                  </div>
                  <h1
                    className={
                      cookieValue === '/auto/de'
                        ? 'text-base font-semibold'
                        : 'text-2xl font-semibold'
                    }
                  >
                    Published Properties
                  </h1>
                </div>
                <h1 className="text-brand_green-500 text-2xl font-semibold mt-4">
                  {analytics.published_properties}
                </h1>
              </div>
              {/* card */}
              <div className="py-4 pl-4 pr-14 rounded-14px bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center bg-brand_green-500 h-14 w-14 rounded-full shrink-0">
                    <IconComponent className="fill-white" name="MoneyIcon" />
                  </div>
                  <h1
                    className={
                      cookieValue === '/auto/de'
                        ? 'text-base font-semibold'
                        : 'text-2xl font-semibold'
                    }
                  >
                    UnPublished Properties
                  </h1>
                </div>
                <h1 className="text-brand_green-500 text-2xl font-semibold mt-4">
                  {analytics.un_published_properties}
                </h1>
              </div>
            </div>
          )}
          <div className="mt-11 grid grid-cols-10 gap-6">
            <div className="lg:col-span-7 col-span-10">
              <NextBooking orders={futureOrders} />
            </div>
            <div className="lg:col-span-3 col-span-10">
              <AccountHistory />
            </div>
          </div>
        </div>
      </Profile>
    </Common>
  );
};

export default SellerAccount;

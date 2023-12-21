'use client';
import Tabs from '@/layout/seller-account/Tabs';
import Common from '@/templates/Common';
import Profile from '@/templates/Profile';
import React, { useCallback, useEffect } from 'react';
import Input from '@/ui/form/Input';
import Button from '@/ui/form/Button';
import ListingTable from '@/layout/seller-account/listing/ListingTable';
import { dispatch } from '@/redux';
import {
  getUserListingProductsThunk,
  sellerAccountFlowInitialState,
} from '@/redux/slices/seller-account-flow';
import { useAppSelector } from '@/redux/hooks';
import NotFoundScreen from '@/ui/NotFoundScreen.tsx';
import LoadingScreen from '@/ui/LoadingScreen';
import { useRouter } from 'next/navigation';
import { URLS } from '@/utils/URLS';
import Pagination from '@/ui/components/Pagination';
const SellerAccount = () => {
  const router = useRouter();
  const sellerAccountFlowState = useAppSelector((s) => s.seller_account_flow);
  const GetUserListings = useCallback(() => {
    dispatch(
      getUserListingProductsThunk({
        limit: sellerAccountFlowInitialState.listings.limit,
        page: sellerAccountFlowInitialState.listings.page,
        title: '',
      })
    );
  }, []);
  useEffect(() => {
    GetUserListings();
  }, [GetUserListings]);
  return (
    <Common>
      <Profile>
        <Tabs />
        <div>
          <h1 className="text-xl font-semibold mt-7">My Listings</h1>
          <div className="mt-6 w-full flex gap-10 lg:gap-0 justify-between">
            <Input
              value={sellerAccountFlowState.listings.title}
              placeholder="Search by Listing Name"
              className="w-full lg:w-64 "
              onChange={(e) => {
                dispatch(
                  getUserListingProductsThunk({
                    limit: sellerAccountFlowInitialState.listings.limit,
                    page: sellerAccountFlowInitialState.listings.page,
                    title: e.target.value,
                  })
                );
              }}
            />
            <Button
              onClick={() => {
                router.push(URLS.POST_NEW_AD);
              }}
              className="w-full lg:w-72 p-0 border-none text-sm bg-brand_yellow-500 "
            >
              Add new Product
            </Button>
          </div>
          {sellerAccountFlowState.listings.isListingLoading ? (
            <LoadingScreen className="h-[300px]" />
          ) : (
            <div className="mt-8 w-full">
              <ListingTable />
            </div>
          )}
          {!sellerAccountFlowState.listings.isListingLoading &&
            sellerAccountFlowState.listings.products.length === 0 ? (
            <NotFoundScreen />
          ) : null}
          {sellerAccountFlowState.listings.products.length > 0 ? (
            <Pagination
              currentPage={sellerAccountFlowState.listings.page}
              totalPages={Math.ceil(
                sellerAccountFlowState.listings.totalDocs /
                sellerAccountFlowInitialState.listings.limit
              )}
              onPageChange={(page: number) => {
                dispatch(
                  getUserListingProductsThunk({
                    limit: sellerAccountFlowInitialState.listings.limit,
                    page: page,
                    title: sellerAccountFlowState.listings.title,
                  })
                );
              }}
            />
          ) : null}
        </div>
      </Profile>
    </Common>
  );
};

export default SellerAccount;

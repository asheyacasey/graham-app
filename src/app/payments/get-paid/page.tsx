"use client";
import AccountLayout from "@/layout/account";
import Tabs from "@/layout/payments/Tabs";
import Common from "@/templates/Common";
import Profile from "@/templates/Profile";
import React, { useState, useCallback, useEffect } from "react";
import Button from "@/ui/form/Button";
import BankCard, { UserBanks } from "@/layout/payments/get-paid/BankCard";
import { useRouter } from "next/navigation";
import { URLS } from "@/utils/URLS";

import { useAppDispatch } from "@/redux/hooks";
import { toggleFullScreenLoadingAction } from "@/redux/slices/app";
import { handleApiError } from "@/utils/hanldeApiError";
import { toast } from "react-toastify";
import { create_onboarding_account_api, get_user_bank_accounts, refresh_onboarding_account_api } from "@/services/bank.services";
import NotFoundScreen from "@/ui/NotFoundScreen.tsx";
import LoadingScreen from "@/ui/LoadingScreen";

const Payments = () => {
  const [loading, setloading] = useState(true)
  const [userBanks, setuserBanks] = useState<UserBanks['account'][]>([])
  const dispatch = useAppDispatch()
  const route = useRouter();
  // const handlenavigate = () => {
  //   route.push(URLS.ADD_BANK_CARD);
  // };
  const handle_create_new_account = async () => {
    try {
      dispatch(toggleFullScreenLoadingAction(true))
      const { data } = await create_onboarding_account_api()
      window.location.href = data
    } catch (error) {
      const err = handleApiError(error)
      toast.error(err)
    } finally {
      dispatch(toggleFullScreenLoadingAction(false))
    }
  }
  const GetUserAccounts = useCallback(async () => {
    try {
      const { data } = await get_user_bank_accounts()
      setuserBanks(data.accounts)
    } catch (error) {
      const err = handleApiError(error)
      toast.error(err)
    } finally {
      setloading(false)
    }
  }, [])
  useEffect(() => {
    GetUserAccounts()
  }, [GetUserAccounts])
  const UpdateAccountDetails = useCallback(async (account_id: string) => {
    if (!account_id) {
      return;
    }
    dispatch(toggleFullScreenLoadingAction(true))
    try {
      const { data } = await refresh_onboarding_account_api({
        account_id: account_id
      })
      window.location.href = data
    } catch (error) {
      const err = handleApiError(error)
      toast.error(err)
    } finally {
      dispatch(toggleFullScreenLoadingAction(false))
    }
  }, [dispatch])
  return (
    <Common>
      <Profile>
        <Tabs />
        <div className="flex items-center justify-between flex-col lg:flex-row">
          <h1 className="text-xl font-semibold my-7">Seller Bank Account</h1>
          <Button
            onClick={handle_create_new_account}
            className="lg:w-56 ">
            Link New Bank Account
          </Button>
        </div>
        <AccountLayout>
          <div className="flex flex-col items-center gap-5">
            {
              loading ?
                <LoadingScreen className="h-[400px]" />
                :
                null
            }
            {
              !loading && !userBanks.length ?
                <NotFoundScreen className="h-[400px]" />
                :
                userBanks.map((account, index) => (
                  <BankCard
                    actionButtons={
                      <Button onClick={() => {
                        UpdateAccountDetails("")
                      }} className="w-28 h-10 flex items-center justify-center bg-brand_yellow-500 border-none">
                        Edit
                      </Button>}
                    key={index} account={account} />
                ))
            }
          </div>
        </AccountLayout>
      </Profile>
    </Common>
  );
};

export default Payments;

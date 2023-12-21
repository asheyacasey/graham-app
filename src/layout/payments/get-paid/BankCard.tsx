import React, { ReactNode } from "react";
import { Bank, Radio } from "../../../../public/assets/assets/svg";
import { IBankAccount } from "@/types";
import Stripe from 'stripe'
import { cn } from "@/utils/styles";
export interface UserBanks {
  account?: {
    account?: IBankAccount,
    details?: Stripe.Response<Stripe.Account>
  },
  actionButtons?: React.ReactNode
}
const BankCard = ({ account, actionButtons }: UserBanks) => {
  const bankDetails = account?.details?.external_accounts?.data[0]
  return (
    <div className={cn("flex w-full justify-between items-center border-[2px] border-brand_gray-900 p-3 rounded-lg", {
      'border-red-500': !account?.account?.verified
    })}>
      <div className="flex items-center">
        <div className="flex items-center gap-5">
          <Bank />
        </div>
        {
          account?.account?.verified ?
            <div className="flex flex-col justify-center font-Montserrat px-2">
              {
                // @ts-ignore
                <span className="text-xs font-semibold">{bankDetails?.bank_name ?? ''}</span>
              }
              <span className="text-10px font-semibold text-brand_gray-200">
                Checking ***{bankDetails?.last4}
              </span>
            </div>
            :
            <div className="flex flex-col justify-center font-Montserrat px-2">
              <span className="text-sm font-semibold text-red-500 ">
                Account Details Are Required Edit Now.
              </span>
            </div>
        }
      </div>
      {actionButtons}
    </div>
  );
};

export default BankCard;

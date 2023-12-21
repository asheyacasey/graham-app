"use client";
import InvoiceTable from "@/layout/buyer-account/invoice/InvoiceTable";
import Tabs from "@/layout/seller-account/Tabs";
import { seller_subscription_plans_orders_api } from "@/services/add.services";
import { getAllUserSubscriptionApi } from "@/services/subscription.services";
import Common from "@/templates/Common";
import Profile from "@/templates/Profile";
import { IOrder, ISubscription } from "@/types";
import { IconComponent } from "@/ui/Icon";
import LoadingScreen from "@/ui/LoadingScreen";
import NotFoundScreen from "@/ui/NotFoundScreen.tsx";
import Pagination from "@/ui/components/Pagination";
import Input from "@/ui/form/Input";
import Select, { OptionType } from "@/ui/form/Select";
import { SubscriptionNameEnum } from "@/utils/enums";
import { handleApiError } from "@/utils/hanldeApiError";
import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";

const SellerAccount = () => {
  const [orders, setorders] = useState<IOrder[]>([])
  const [loading, setloading] = useState(false)
  const [totalDocs, settotalDocs] = useState(0)
  const [page, setpage] = useState(1)
  const [limit, setlimit] = useState(5)
  const [startDate, setstartDate] = useState("")
  const [endDate, setendDate] = useState("")
  const [subscription, setsubscription] = useState("")
  const [confirmedInvoices, setconfirmedInvoices] = useState(0)
  const GetInvoiceData = useCallback(async () => {
    try {
      setloading(true)
      const { data } = await seller_subscription_plans_orders_api({
        page: page,
        end_date: endDate,
        limit: limit,
        start_date: startDate,
        subscription: subscription
      })
      setorders(data.orders)
      settotalDocs(data.totalDocuments)
      setconfirmedInvoices(data.confirmed_invoices)
    } catch (error) {
      const err = handleApiError(error)
      toast.error(err)
    } finally {
      setloading(false)
    }
  }, [endDate, limit, page, startDate, subscription])
  useEffect(() => {
    GetInvoiceData()
  }, [GetInvoiceData])
  return (
    <Common>
      <Profile>
        <Tabs />
        <div>
          <h1 className='text-2xl font-semibold mt-7'>Invoice</h1>
          <div className='grid lg:grid-cols-4 gap-3 mt-5'>
            <Input
              label="Start date"
              value={startDate}
              onChange={(e) => {
                setstartDate(e.target.value)
              }}
              placeholder='From Date' type="date"
            // rightElement={<IconComponent className='fill-brand_gray-200' name='SearchIcon' />}
            />
            <Input
              label="End date"
              type="date"
              value={endDate}
              onChange={(e) => {
                setendDate(e.target.value)
              }}
              placeholder='To Date'
            // rightElement={<IconComponent className='fill-brand_gray-200' name='SearchIcon' />} 
            />
            <Select
              label="Select plan"
              placeholder="Select plan"
              value={{ label: subscription, value: subscription }}
              options={[{ label: "Select plan", value: "" }, ...Object.values(SubscriptionNameEnum).map((v) => ({ label: String(v), value: String(v) }))]}
              rightElement={<IconComponent className='fill-brand_gray-200'
                name='SearchIcon'
              />}
              onChange={(data: OptionType) => {
                setsubscription(String(data.value))
              }}
            />
            {/* <Select options={[]} placeholder='Any' rightElement={<IconComponent className='fill-brand_gray-200' name='SearchIcon' />} /> */}
          </div>
        </div>
        <h1 className='text-brand_gray-200 text-sm mt-5'>Reservation fees filter applies only to the invoices issued by you!</h1>
        <div className="flex items-center flex-wrap gap-11 mt-6">
          <div className="flex items-center gap-6">
            <h1 className="text-base font-semibold">Total Invoices Confirmed:</h1>
            <h1 className="text-brand_gray-200 font-medium">{confirmedInvoices}</h1>
          </div>
          <div className="flex items-center gap-6">
            <h1 className="text-base font-semibold">Total Invoices Issued:</h1>
            <h1 className="text-brand_gray-200 font-medium">{totalDocs}</h1>
          </div>
        </div>
        <div className='mt-5 w-full'>
          {
            loading ?
              <LoadingScreen className="h-[400px]" />
              :
              null
          }
          {
            !loading && orders.length === 0 ?
              <NotFoundScreen className="h-[400px]" />
              :
              null
          }
          {
            !loading && orders.length > 0 ?
              <>
                <InvoiceTable orders={orders} />
                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil(totalDocs / limit)}
                  onPageChange={(newPage: number) => {
                    setpage(newPage)
                  }}
                />
              </>
              :
              null
          }
        </div>
      </Profile>
    </Common>
  );
};

export default SellerAccount;

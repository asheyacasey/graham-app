"use client";
import InvoiceTable from "@/layout/buyer-account/invoice/InvoiceTable";
import Tabs from "@/layout/buyer-account/Tabs";
import { buyer_invoices_data } from "@/services/add.services";
import Common from "@/templates/Common";
import Profile from "@/templates/Profile";
import { IOrder } from "@/types";
import LoadingScreen from "@/ui/LoadingScreen";
import NotFoundScreen from "@/ui/NotFoundScreen.tsx";
import Input from "@/ui/form/Input";
import { handleApiError } from "@/utils/hanldeApiError";
import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import Pagination from "@/ui/components/Pagination";

const SellerAccount = () => {
  const [orders, setorders] = useState<IOrder[]>([])
  const [loading, setloading] = useState(false)
  const [totalDocs, settotalDocs] = useState(0)
  const [page, setpage] = useState(1)
  const [limit, setlimit] = useState(5)
  const [startDate, setstartDate] = useState("")
  const [endDate, setendDate] = useState("")
  const GetInvoiceData = useCallback(async () => {
    try {
      setloading(true)
      const { data } = await buyer_invoices_data({
        page: page,
        end_date: endDate,
        limit: limit,
        start_date: startDate
      })
      setorders(data.orders)
      settotalDocs(data.totalDocuments)
    } catch (error) {
      const err = handleApiError(error)
      toast.error(err)
    } finally {
      setloading(false)
    }
  }, [endDate, limit, page, startDate])
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

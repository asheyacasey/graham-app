import { IOrder } from '@/types'
import Button from '@/ui/form/Button'
import { formatCurrency } from '@/utils/formatCurrency'
import moment from 'moment'
import React from 'react'
import { useReactToPrint } from 'react-to-print';
const InvoiceDetail = ({ order }: { order: IOrder }) => {
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  if (typeof order.buyer === 'string' || typeof order.seller == 'string' || typeof order.product === 'string') {
    return <div>Populate fields please.</div>
  }
  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Invoice No. :  <span className='text-brand_gray-200'>{order._id}</span></h1>
        <Button onClick={handlePrint} className='border border-brand_purple-500 text-brand_purple-500 text-lg font-semibold bg-transparent p-0 w-32'>
          Print
        </Button>
      </div>
      <div className='mt-8 space-y-4 p-6' ref={componentRef}>
        <div className='flex items-center gap-10'>
          <h1 className='font-semibold text-base w-28'>Invoice No. :</h1>
          <h1 className='font-medium text-base text-brand_gray-200'>{order._id}</h1>
        </div>
        {/*  */}
        <div className='flex items-center gap-10'>
          <h1 className='font-semibold text-base w-28'>Period :</h1>
          <h1 className='font-medium text-base text-brand_gray-200'>
            {/* 04-02-23 01:00 to 04-02-23 04:00 */}
            {moment(order.start_date).format("DD-MM-YY h:mm")} to {moment(order.end_date).format("DD-MM-YY h:mm")}
          </h1>
        </div>
        {/*  */}
        <div className='flex items-center gap-10'>
          <h1 className='font-semibold text-base w-28'>No of {order.product?.prices.rented_as.toLocaleLowerCase()}s:</h1>
          <h1 className='font-medium text-base text-brand_gray-200'>{order.time_difference} {order.product?.prices.rented_as.toLocaleLowerCase()}</h1>
        </div>
        {/*  */}
        <div className='flex items-center gap-10'>
          <h1 className='font-semibold text-base w-28'>Stock :</h1>
          <h1 className='font-medium text-base text-brand_gray-200'>{order.quantity}</h1>
        </div>
        {/*  */}
        <div className='flex items-center gap-10'>
          <h1 className='font-semibold text-base w-28'>Price per hour :</h1>
          <h1 className='font-medium text-base text-brand_gray-200'>{formatCurrency(order.product?.prices.rent_price ?? 0)}</h1>
        </div>
        {/*  */}
        <div className='flex items-center gap-10'>
          <h1 className='font-semibold text-base w-28'>Product :</h1>
          <h1 className='font-medium text-base text-brand_gray-200'>{order.product?.add_title}</h1>
        </div>
        {/*  */}
        <div className='flex items-center gap-10'>
          <h1 className='font-semibold text-base w-28'>Rented By :</h1>
          <h1 className='font-medium text-base text-brand_gray-200'>{order.billing_details.username}</h1>
        </div>
        {/*  */}
        <div className='flex items-center gap-10'>
          <h1 className='font-semibold text-base w-28'>Email :</h1>
          <h1 className='font-medium text-base text-brand_gray-200'>{order.billing_details.email}</h1>
        </div>
        {/*  */}
        <div className='flex items-center gap-10'>
          <h1 className='font-semibold text-base w-28'>Phone :</h1>
          <h1 className='font-medium text-base text-brand_gray-200'>{order.billing_details.mobile_number}</h1>
        </div>
        {/*  */}
        <div className='h-max w-max border-2 border-brand_gray-900 rounded-lg flex'>
          <div className='p-4  border-r-2 border-r-brand_gray-900'>
            <h1 className='font-semibold text-sm '>Cost :</h1>
            <h1 className='font-medium text-sm text-brand_gray-200 mt-4'>Sub Total</h1>
          </div>
          <div className='p-4 border-r-2 border-r-brand_gray-900'>
            <h1 className='font-semibold text-sm '>Price :</h1>
            <h1 className='font-medium text-sm text-brand_gray-200 mt-4'>EURO {order.product?.prices.rent_price}</h1>
          </div>
          <div className='p-4'>
            <h1 className='font-semibold text-sm '>Detail :</h1>
            <h1 className='font-medium text-sm text-brand_gray-200 mt-4'>{order.time_difference} {order.product?.prices.rented_as} x EURO {order.product?.prices.rent_price}</h1>
          </div>
        </div>
        {/*  */}
        <div className='flex items-center gap-10'>
          <h1 className='font-semibold text-base w-28'>User Pays :</h1>
          <h1 className='font-medium text-base text-brand_gray-200'>{formatCurrency(order.total_price)}</h1>
        </div>
        {/*  */}
        {/* <div className='flex items-center gap-10'>
          <h1 className='font-semibold text-base w-28'>Balance :</h1>
          <h1 className='font-medium text-base text-brand_gray-200'>USD 225</h1>
        </div> */}
        {/*  */}
        <div className='flex items-center gap-10'>
          <h1 className='font-semibold text-base w-28'>You Earned :</h1>
          <h1 className='font-medium text-base text-brand_gray-200'>{formatCurrency(order.total_price)}</h1>
        </div>
        {/*  */}
        <h1 className='text-brand_red-500 text-sm font-medium'>*we deduct security deposit, city fees, cleaning fees and website service fee</h1>
        {/*  */}
        <div className='flex items-center gap-10'>
          <h1 className='font-semibold text-base w-28'>Service Fee :</h1>
          <h1 className='font-medium text-base text-brand_gray-200'>{formatCurrency(order.service_fee)}</h1>
        </div>
        {/*  */}
        <div className='flex items-center gap-10'>
          <h1 className='font-semibold text-base w-28'>Taxes :</h1>
          <h1 className='font-medium text-base text-brand_gray-200'>{formatCurrency(order.taxes)}</h1>
        </div>
        {/*  */}
        <h1 className='text-brand_red-500 text-sm font-medium'>*taxes are included in your earnings and you are responsible for paying these taxes</h1>
      </div>
    </div>
  )
}

export default InvoiceDetail
import { IconComponent } from '@/ui/Icon'
import { formatCurrency } from '@/utils/formatCurrency'
import React from 'react'

const CardDetails = ({
  total_orders, total_spent
}: { total_spent: number, total_orders: number }) => {
  return (
    <>
      <div className='flex lg:flex-row flex-col  lg:items-center gap-5'>
        {/* card */}
        <div className='py-4 pl-4 pr-14 rounded-14px bg-white'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center bg-brand_green-500 h-14 w-14 rounded-full'>
              <IconComponent className='fill-white' name='MoneyIcon' />
            </div>
            <h1 className='text-2xl font-semibold'>Total Spend</h1>
          </div>
          <h1 className='text-brand_green-500 text-2xl font-semibold mt-4'>{formatCurrency(total_spent)}</h1>
        </div>
        {/* card */}
        <div className='py-4 pl-4 pr-14 rounded-14px bg-white'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center bg-brand_red-600 h-14 w-14 rounded-full'>
              <IconComponent className='fill-white ' name='CartIcon' />
            </div>
            <h1 className='text-2xl font-semibold'>Total Ordered</h1>
          </div>
          <h1 className='text-brand_red-600 text-2xl font-semibold mt-4'>{total_orders}</h1>
        </div>
      </div>
    </>
  );
};

export default CardDetails;

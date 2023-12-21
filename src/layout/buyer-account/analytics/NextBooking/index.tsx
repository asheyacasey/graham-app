import { IOrder } from '@/types'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

const NextBooking = ({ orders }: { orders: IOrder[] }) => {
    return (
        <div>
            <h1 className='text-lg font-semibold'>Next Booking</h1>
            <div className='mt-6 bg-white rounded-14px p-4 space-y-3 '>
                {
                    orders.map((order, index) => (
                        <Item key={index} order={order} />
                    ))
                }
            </div>
        </div>
    )
}

export default NextBooking

const Item = ({ order }: { order: IOrder }) => {
    if (typeof order.product === 'string') {
        return null
    }
    return (
        <div className='p-3 border border-brand_gray-900 rounded-lg flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <Image src={order.product?.images[0] ?? ''} width={50} height={50} className='object-contain' alt='' />
                <h1 className='text-xs font-semibold'>{order.product?.add_title}</h1>
            </div>
            <h1 className='text-xs font-semibold'>{order.product?.prices.rented_as.replaceAll("_", " ")}</h1>
            <h1 className='text-xs font-semibold'>
                {moment(order.start_date).format("DD-MM-YY h:mm")} to {moment(order.end_date).format("DD-MM-YY h:mm")}
            </h1>
        </div>
    )
}
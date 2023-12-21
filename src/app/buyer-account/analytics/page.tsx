'use client'
import Tabs from '@/layout/buyer-account/Tabs'
import AccountHistory from '@/layout/buyer-account/analytics/AccountHistory'
import CardDetails from '@/layout/buyer-account/analytics/CardDetails'
import NextBooking from '@/layout/buyer-account/analytics/NextBooking'
import { useAppDispatch } from '@/redux/hooks'
import { toggleFullScreenLoadingAction } from '@/redux/slices/app'
import { get_buyer_analytics_api, get_buyer_future_orders_api } from '@/services/order.services'
import Common from '@/templates/Common'
import Profile from '@/templates/Profile'
import { IOrder } from '@/types'
import { IconComponent } from '@/ui/Icon'
import moment from 'moment'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'

const BuyerAccount = () => {
    const [futureOrders, setfutureOrders] = useState<IOrder[]>([])
    const dispatch = useAppDispatch()
    const [orders, setorders] = useState<IOrder[]>([])
    const [totalorders, settotalorders] = useState(0)
    const [totalspend, settotalspend] = useState(0)
    const GetAnalyticsData = useCallback(async () => {
        try {
            dispatch(toggleFullScreenLoadingAction(true))
            const { data } = await get_buyer_analytics_api()
            const { total_orders, total_spend, orders } = data
            setorders(orders)
            settotalorders(total_orders)
            settotalspend(total_spend)
        } catch (error) {

        } finally {
            dispatch(toggleFullScreenLoadingAction(false))
        }
    }, [dispatch])
    useEffect(() => {
        GetAnalyticsData()
    }, [GetAnalyticsData])
    const GetSellerFutureOrders = useCallback(async () => {
        try {
            const { data } = await get_buyer_future_orders_api()
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
                    <h1 className='text-2xl font-semibold mt-7'>Analytics</h1>
                    <div className='mt-5'>
                        <CardDetails
                            total_orders={totalorders}
                            total_spent={totalspend}
                        />
                    </div>
                    <div className='mt-11 grid grid-cols-10 gap-6'>
                        <div className='lg:col-span-7 col-span-10'>
                            <NextBooking orders={futureOrders} />
                        </div>
                        <div className='lg:col-span-3 col-span-10'>
                            <div>
                                <h1 className='text-lg font-semibold text-center'>Account History (last 7 days)</h1>
                                <div className='mt-6 bg-white rounded-14px p-4 space-y-3 '>
                                    {
                                        orders.map((order, index) => (
                                            <Item order={order} key={index} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Profile>
        </Common>
    )
}

export default BuyerAccount

const Item = ({ order }: { order: IOrder }) => {
    return (
        <div className='p-3 border border-brand_gray-900 rounded-lg space-y-1.5'>
            <h1 className='text-xs '>
                {/* February 5, 2023, 10:17 am */}
                {moment(order.createdAt).format("MMM d, YYYY, H:mm a")}
            </h1>
            <h1 className='text-xs font-medium'>Generated Invoice Invoice {order._id}</h1>
        </div>
    )
}

import { getLastSevenDaysOrderInvoicesApi } from '@/services/order.services'
import { IOrder } from '@/types'
import LoadingScreen from '@/ui/LoadingScreen'
import { handleApiError } from '@/utils/hanldeApiError'
import moment from 'moment'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const AccountHistory = () => {
    const [loading, setloading] = useState(false)
    const [orders, setorders] = useState<IOrder[]>([])
    const GetLastSevenDaysInvoices = useCallback(async () => {
        try {
            setloading(true)
            const { data } = await getLastSevenDaysOrderInvoicesApi()
            setorders(data.orders)
        } catch (error) {
            const err = handleApiError(error)
            toast.error(err)
        } finally {
            setloading(false)
        }
    }, [])
    useEffect(() => {
        GetLastSevenDaysInvoices()
    }, [GetLastSevenDaysInvoices])
    if (loading) {
        return <LoadingScreen className='h-[300px]' />
    }
    return (
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
    )
}

export default AccountHistory
const Item = ({ order }: { order: IOrder }) => {
    return (
        <div className='p-3 border border-brand_gray-900 rounded-lg space-y-1.5'>
            <h1 className='text-xs '>
                {moment(order.createdAt).format("MMM d, YYYY, H:mm a")}
            </h1>
            <h1 className='text-xs font-medium'>Generated Invoice Invoice {order._id}</h1>
        </div>
    )
}
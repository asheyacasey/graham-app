import { useAppDispatch } from '@/redux/hooks'
import { update_order_process_status_thunk } from '@/redux/slices/seller-account-flow'
import { IOrder } from '@/types'
import { URLS } from '@/utils/URLS'
import { ORDER_PROCESS_STATUS_ENUM } from '@/utils/enums'
import { cn } from '@/utils/styles'
import moment from 'moment'
import { usePathname } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'
const OrderSteps = ({ order }: { order: IOrder }) => {
    // check if we are on buyer route then don't allow user to update the statuses.
    const pathname = usePathname()
    const dispatch = useAppDispatch()

    const handleUpdateOrder = (status: ORDER_PROCESS_STATUS_ENUM) => {
        // check for step by step order status calls.
        if (status === ORDER_PROCESS_STATUS_ENUM.RETURNED) {
            const is_delivered_exists = order.process_status.find((v) => (v.status === ORDER_PROCESS_STATUS_ENUM.DELIVERED && v.date))
            if (!is_delivered_exists) {
                toast.error("Kindly fill the previous status")
                return;
            }
        }
        dispatch(update_order_process_status_thunk({
            order_id: order._id, process_status: status
        }))
    }
    return (
        <div className='border-2 border-brand_gray-900 rounded-lg py-14  flex items-center justify-center mt-10 w-[70%] mx-auto'>
            {
                order.process_status.map((value, index) => {
                    return (
                        <div key={index} className={cn('h-30 w-[184px] relative flex items-center', {
                            'w-0': index === order.process_status.length - 1
                        })}>
                            <div className={cn('w-full h-[2px] bg-gray-300', {
                                'bg-brand_green-400': index === 0 && order.process_status[1].date || index === 1 && order.process_status[2].date
                            })} />
                            <div onClick={() => {
                                if (pathname.includes(URLS.BUYER_ACCOUNT_ORDERS)) {
                                    return;
                                }
                                handleUpdateOrder(value.status)
                            }} className={cn('w-18px h-18px cursor-pointer rounded-full hover:scale-105 transition-all duration-300 bg-gray-300 absolute left-0 top-1/2 -translate-y-1/2', {
                                'bg-brand_green-400': value.date
                            })}>
                                <div className='w-full h-full relative'>
                                    <h1 className='absolute text-xs font-semibold -top-8 -left-6'>{value.status}</h1>
                                    <h1 className='absolute text-xs font-semibold top-8 -left-11 whitespace-nowrap text-brand_gray-200'>
                                        {/* Mon, 15th May 2023 */}
                                        {
                                            value.date ?
                                                moment(value.date).format("ddd, Do MMM YYYY")
                                                :
                                                null
                                        }
                                    </h1>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default OrderSteps
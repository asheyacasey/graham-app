'use client'
import React from 'react'
import { Close, Info } from '../../../../public/assets/assets/svg'
import { INotification } from '@/types'
import { cn } from '@/utils/styles'
import { NOTIFICATION_TYPES_ENUM } from '@/utils/enums'
import moment from 'moment'
import { useAppDispatch } from '@/redux/hooks'
import { delete_notification_thunk, seen_notification_thunk } from '@/redux/slices/notifications'
import Button from '@/ui/form/Button'
import { RxCrossCircled } from 'react-icons/rx'
import { BsCheckSquareFill } from 'react-icons/bs'
interface NotificationBoxProps {
    data: INotification
}
const NotificationBox: React.FC<NotificationBoxProps> = ({
    data
}) => {
    const dispatch = useAppDispatch()
    const handleDelete = () => {
        try {
            if (!data._id) {
                return;
            }
            dispatch(delete_notification_thunk({ notification_id: data._id }))
        } catch (error) {
        }
    }
    const handleSeen = () => {
        try {
            if (!data._id) {
                return;
            }
            dispatch(seen_notification_thunk({ id: data._id }))
        } catch (error) {

        }
    }
    return (
        <div className={cn("bg-white shadow  w-full rounded-lg flex relative py-3 lg:px-6 px-4 ", {
            'opacity-75 border bg-transparent': data.seen
        })}>
            <div
                className={cn(`
                absolute inset-y-1 lg:left-2.5 left-1.5 w-1 bg-black rounded-full 
                `, {
                    "bg-brand_purple-400": data.type === NOTIFICATION_TYPES_ENUM.INFORMATION,
                    "bg-brand_green-700": data.type === NOTIFICATION_TYPES_ENUM.SUCCESS,
                    "bg-brand_red-500": data.type === NOTIFICATION_TYPES_ENUM.ERROR,
                    "bg-brand_yellow-500": data.type === NOTIFICATION_TYPES_ENUM.OTHER,
                })}
            />
            {
                !data.seen && (
                    <h1 className='text-xs text-blue-600 mb-[0.5px] font-semibold absolute  top-1 right-2 font-Poppins'>New!</h1>
                )
            }
            <div className="flex gap-3 w-full">
                <div className="py-5 flex justify-between  w-full gap-3">
                    <div className="flex  gap-3">
                        <div
                            className={cn(`h-14 w-14 flex justify-center  rounded-full shrink-0`, {
                                "bg-brand_purple-400": data.type === NOTIFICATION_TYPES_ENUM.INFORMATION,
                                "bg-brand_green-700": data.type === NOTIFICATION_TYPES_ENUM.SUCCESS,
                                "bg-brand_red-500": data.type === NOTIFICATION_TYPES_ENUM.ERROR,
                                "bg-brand_yellow-500": data.type === NOTIFICATION_TYPES_ENUM.OTHER,

                            })}
                        >
                            <Info />
                        </div>
                        <div className="flex flex-col font-Montserrat ">
                            <span className="font-semibold text-xs lg:text-base">
                                {data.title}
                            </span>
                            <span className="font-semibold text-10px lg:text-xs text-brand_gray-200">
                                {data.message}
                            </span>
                            <span className="font-semibold text-10px lg:text-xs text-gray-400 mt-1">
                                {moment(data.createdAt).fromNow()}
                            </span>
                        </div>
                    </div>
                    <div className='flex  gap-x-3'>
                        {
                            !data?.seen && (
                                <BsCheckSquareFill onClick={handleSeen} className='text-green-500 cursor-pointer hover:opacity-75' size={30} />
                            )
                        }
                        <RxCrossCircled size={30} className="cursor-pointer text-red-500 hover:opacity-75" onClick={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationBox
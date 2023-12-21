'use client'
import { pusherClient } from '@/libs/pusherClient'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchParentCategoriesThunk } from '@/redux/slices/categories'
import { add_single_new_notification_action, load_more_notifications_thunk } from '@/redux/slices/notifications'

import { INotification } from '@/types'
import { PUSHER_CONSTANTS } from '@/utils/PUSHER_CONSTANTS'
import React, { useCallback, useEffect } from 'react'
interface RootDataFetchProps {
    children: React.ReactNode
}
const RootDataFetchProvider = ({ children }: RootDataFetchProps) => {
    const dispatch = useAppDispatch()
    const authState = useAppSelector((s) => s.auth)
    const notificationState = useAppSelector((s) => s.notifications)
    const FetchParentCategories = useCallback(async () => {
        dispatch(fetchParentCategoriesThunk())
    }, [dispatch])
    const getNotifications = useCallback(async () => {
        if (!authState || !authState?.user?._id) {
            return;
        }
        try {
            dispatch(load_more_notifications_thunk({ root: true }))
        } catch (error) {
        }
    }, [authState, dispatch])
    useEffect(() => {
        FetchParentCategories()
    }, [FetchParentCategories])
    useEffect(() => {
        getNotifications()
    }, [getNotifications])

    // real time notifications
    useEffect(() => {
        if (!authState?.user?._id) {
            return;
        }
        const notificationHandler = (notification: INotification) => {
            const alreadyExists = notificationState?.notifications?.find((noti) => noti._id === notification._id)
            if (alreadyExists) {
                return;
            }
            dispatch(add_single_new_notification_action(notification))
        }
        pusherClient.subscribe(authState?.user?._id)
        pusherClient.bind(PUSHER_CONSTANTS["NOTIFICATION:CREATE"], notificationHandler)
        return () => {
            if (authState?.user?._id) {
                pusherClient.unsubscribe(authState?.user?._id)
                pusherClient.unbind(PUSHER_CONSTANTS["NOTIFICATION:CREATE"], notificationHandler)
            }
        }
    }, [authState?.user?._id, dispatch, notificationState?.notifications])
    // real time notifications
    return (
        <div>{children}</div>
    )
}

export default RootDataFetchProvider
'use client'
import React from 'react'
import NotificationBox from './NotificationBox'
import Common from '@/templates/Common'
import Button from '@/ui/form/Button'
import BreadCrumbs from '@/ui/BreadCrumbs'
import { URLS } from '@/utils/URLS'
import { INotification } from '@/types'
interface NotificationListProps {
    notifications: INotification[]
}
const NotificationList: React.FC<NotificationListProps> = ({
    notifications
}) => {
    return (

        <div className='mt-10 space-y-6'>
            {
                notifications.map((item, index) => (
                    <NotificationBox
                        data={item}
                        key={index}
                    />
                ))
            }
        </div>
    )
}

export default NotificationList
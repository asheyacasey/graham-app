import httpCommon from "./httpCommon"

export const get_user_notifications_api = async (searchParams = "") => {
    return httpCommon.get(`/notification/user${searchParams}`)
}

export const delete_user_notification_api = async (notificationId: string) => {
    return httpCommon.del(`/notification/${notificationId}`)
}

export const mark_notification_seen_api = async (notification_id: string) => {
    return httpCommon.patch(`/notification/mark-seen/${notification_id}`,{})
}
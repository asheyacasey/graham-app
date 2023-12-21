import { delete_user_notification_api, get_user_notifications_api, mark_notification_seen_api } from "@/services/notification.services";
import { INotification } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toggleFullScreenLoadingAction } from "../app";


interface INotificationSliceState {
    notifications: INotification[]
    hasMore: boolean
    loading: boolean
}
const initialState: INotificationSliceState = {
    notifications: [],
    hasMore: true,
    loading: false
}
const notificationSlice = createSlice({
    name: "notifications",
    initialState: initialState,
    reducers: {
        add_notifications_action: (state, action: PayloadAction<INotification[]>) => {
            state.notifications = [...state.notifications, ...action.payload]
        },
        remove_notification_action: (state, action: PayloadAction<{ id: string }>) => {
            state.notifications = [...state.notifications.filter((noti) => noti._id !== action.payload.id)]
        },
        set_seen_single_notification_action: (state, action: PayloadAction<{ id: string }>) => {
            state.notifications = [...state.notifications.map((noti) => noti._id === action.payload.id ? ({ ...noti, seen: true }) : noti)]
        },
        set_has_more_action: (state, action: PayloadAction<boolean>) => {
            state.hasMore = action.payload
        },
        add_single_new_notification_action: (state, action: PayloadAction<INotification>) => {
            state.notifications = [action.payload, ...state.notifications]
        },
        toggle_notification_loading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})

export const {
    add_notifications_action,
    remove_notification_action,
    set_seen_single_notification_action,
    set_has_more_action,
    add_single_new_notification_action,
    toggle_notification_loading
} = notificationSlice.actions
export default notificationSlice.reducer

export const load_more_notifications_thunk = createAsyncThunk('load-more-notifications', async ({ root = false }: any, { dispatch, getState }) => {
    const notificationState = (getState() as any).notifications as INotificationSliceState
    try {
        dispatch(toggle_notification_loading(true))
        if (!root) {
            dispatch(toggleFullScreenLoadingAction(true))
        }
        const { data } = await get_user_notifications_api(`?skip=${notificationState.notifications.length}`)
        if (data) {
            dispatch(add_notifications_action(data))
            if (data.length === 0) {
                dispatch(set_has_more_action(false))
            }
        }
    } catch (error) {
    } finally {
        if (!root) {
            dispatch(toggleFullScreenLoadingAction(false))
        }
        dispatch(toggle_notification_loading(false))
    }
})

export const delete_notification_thunk = createAsyncThunk("delete-notification", async ({ notification_id }: { notification_id: string }, { dispatch, getState }) => {
    try {
        dispatch(remove_notification_action({ id: notification_id }))
        await delete_user_notification_api(notification_id)
    } catch (error) {
    }
})


export const seen_notification_thunk = createAsyncThunk("seen-notification", async ({ id }: { id: string }, { dispatch, getState }) => {
    try {
        dispatch(set_seen_single_notification_action({ id }))
        await mark_notification_seen_api(id)
    } catch (error) {

    }
})
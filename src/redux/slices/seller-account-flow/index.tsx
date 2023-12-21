import { dispatch } from "@/redux"
import { ChangeStatusProps, GetUserCreatedAddsWithFiltrationProps, change_add_status_api, getUserCreatedAddsWithFiltrationApi } from "@/services/add.services"
import { IAdd, IOrder } from "@/types"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toggleFullScreenLoadingAction } from "../app"
import { SellerOrdersFilters, buyer_orders_api, seller_orders_api, update_order_status_api } from "@/services/order.services"
import { AuthState } from "../auth"
import { ORDER_PROCESS_STATUS_ENUM } from "@/utils/enums"
import { toast } from "react-toastify"
import { handleApiError } from "@/utils/hanldeApiError"

interface SellerAccountFlowSlice {
    listings: {
        isListingLoading: boolean
        products: IAdd[]
        page: number,
        limit: number
        totalDocs: number
        title: string
    },
    orders: {
        isOrderLoading: boolean,
        page: number,
        orders: IOrder[],
        totalDocs: number,
        title: string
        limit: number
    },
}


export const sellerAccountFlowInitialState: SellerAccountFlowSlice = {
    listings: {
        isListingLoading: false,
        limit: 5,
        page: 1,
        products: [],
        totalDocs: 0,
        title: ""
    },
    orders: {
        isOrderLoading: false,
        page: 1,
        orders: [],
        totalDocs: 0,
        title: "",
        limit: 5
    },
}
const sellerAccountFlowSlice = createSlice({
    name: "seller_account_flow",
    initialState: sellerAccountFlowInitialState,
    reducers: {
        // LISTING FLOW
        toggleListingLoading: (state, action: PayloadAction<boolean>) => {
            state.listings.isListingLoading = action.payload
        },
        add_listing_products_action: (state, action: PayloadAction<IAdd[]>) => {
            state.listings.products = action.payload
        },
        add_listing_filtration: (state, action: PayloadAction<GetUserCreatedAddsWithFiltrationProps>) => {
            state.listings.limit = action.payload.limit
            state.listings.page = action.payload.page
            state.listings.title = action.payload.title
        },
        add_listing_total_docs: (state, action: PayloadAction<number>) => {
            state.listings.totalDocs = action.payload
        },
        remove_listing_single_item_action: (state, action: PayloadAction<{ id: string }>) => {
            state.listings.products = state.listings.products.filter((v) => v._id !== action.payload.id)
        },
        // ORDERS FLOW
        toggle_orders_loading: (state, action: PayloadAction<boolean>) => {
            state.orders.isOrderLoading = action.payload
        },
        add_orders_action: (state, action: PayloadAction<IOrder[]>) => {
            state.orders.orders = action.payload
        },
        orders_filtration: (state, action: PayloadAction<Partial<SellerOrdersFilters>>) => {
            state.orders.page = action.payload.page ?? 1
            state.orders.title = action.payload.title ?? ''
            state.orders.limit = action.payload.limit ?? 5
        },
        update_orders_total_docs: (state, action: PayloadAction<number>) => {
            state.orders.totalDocs = action.payload
        }
    }
})

export const {
    toggleListingLoading,
    add_listing_products_action,
    add_listing_filtration,
    add_listing_total_docs,
    remove_listing_single_item_action,
    add_orders_action,
    orders_filtration,
    toggle_orders_loading,
    update_orders_total_docs
} = sellerAccountFlowSlice.actions
export default sellerAccountFlowSlice.reducer

// LISTING FLOW
export const getUserListingProductsThunk = createAsyncThunk("listing-search", async (args: GetUserCreatedAddsWithFiltrationProps, { dispatch }) => {
    try {
        dispatch(toggleListingLoading(true))
        dispatch(add_listing_filtration(args))
        const { data } = await getUserCreatedAddsWithFiltrationApi(args)
        dispatch(add_listing_products_action(data.products))
        dispatch(add_listing_total_docs(data.totalDocuments))
    } catch (error) {
    } finally {
        dispatch(toggleListingLoading(false))
    }
})

export const change_listing_product_status_thunk = createAsyncThunk('status-listing-product', async (args: ChangeStatusProps, { dispatch, getState }) => {
    try {
        dispatch(toggleFullScreenLoadingAction(true))
        await change_add_status_api(args)
        // @ts-ignore
        const flowState = getState().seller_account_flow as SellerAccountFlowSlice
        const updatedListings = flowState.listings.products.map((el) => el._id === args.id ? ({ ...el, disabled: args.status }) : el)
        dispatch(add_listing_products_action(updatedListings))
    } catch (error: any) {

    } finally {
        dispatch(toggleFullScreenLoadingAction(false))
    }
})

// ORDERS FLOW
export const get_seller_orders_thunk = createAsyncThunk('seller-orders-get', async ({ page, title, is_buyer = false }: Omit<SellerOrdersFilters & { is_buyer?: boolean }, 'limit'>, { dispatch, getState }) => {
    try {
        dispatch(toggle_orders_loading(true))
        const seller_flow = (getState() as any).seller_account_flow as SellerAccountFlowSlice
        dispatch(orders_filtration({
            limit: seller_flow.orders.limit,
            page: page,
            title: title
        }))
        const authState = (getState() as any).auth as AuthState
        if (!authState.user?._id) {
            return;
        }
        if (!is_buyer) {
            const { data } = await seller_orders_api(authState.user?._id, {
                limit: seller_flow.orders.limit,
                page: page,
                title: title
            })
            dispatch(add_orders_action(data.orders))
            dispatch(update_orders_total_docs(data.totalDocuments))
        } else {
            const { data } = await buyer_orders_api(authState.user?._id, {
                limit: seller_flow.orders.limit,
                page: page,
                title: title
            })
            dispatch(add_orders_action(data.orders))
            dispatch(update_orders_total_docs(data.totalDocuments))
        }

    } catch (error) {

    } finally {
        dispatch(toggle_orders_loading(false))
    }
})

export const update_order_process_status_thunk = createAsyncThunk('order-process-status-update', async (args: {
    process_status: ORDER_PROCESS_STATUS_ENUM
    order_id: string;
}, { dispatch, getState }) => {
    try {
        const sellerState = (getState() as any).seller_account_flow as SellerAccountFlowSlice
        dispatch(toggleFullScreenLoadingAction(true))
        const { data } = await update_order_status_api(args)
        const updated_orders = sellerState.orders.orders.map((val) => val._id === args.order_id ? data.updated_order : val)
        dispatch(add_orders_action(updated_orders))
        toast.success("Status updated")
    } catch (error: any) {
        const err = handleApiError(error)
        toast.error(err)
    } finally {
        dispatch(toggleFullScreenLoadingAction(false))
    }
})
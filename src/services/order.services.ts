import httpCommon from "./httpCommon"

export const createCheckoutSession = async (data: any) => {
    return httpCommon.post("/order/create-checkout-session", data)
}
// HANDLE SUCCESSFULL PAYMENT 
export const verifyOrdersCheckoutSession = async (invoiceId: string) => {
    return httpCommon.post(`/order/verify-checkout-sessions/${invoiceId}`, {})
}

// HANDLE CANCELLED PAYMENT
export const handleCancelledOrdersCheckoutSession = async (invoiceId: string) => {
    return httpCommon.post(`/order/cancel-checkout-sessions/${invoiceId}`, {})
}
// LAST SEVEN DAYS ORDERS
export const getLastSevenDaysOrderInvoicesApi = async () => {
    return httpCommon.get("/order/orders-last-seven-days")
}
// GET SELLER ORDERS WITH FILTRATION
export type SellerOrdersFilters = {
    page: number,
    limit: number,
    title: string
}
export const seller_orders_api = async (seller_id: string, filters: SellerOrdersFilters) => {
    return httpCommon.get(`/order/seller-orders/${seller_id}?page=${filters.page}&title=${filters.title}&limit=${filters.limit}`)
}
export const buyer_orders_api = async (buyer_id: string, filters: SellerOrdersFilters) => {
    return httpCommon.get(`/order/buyer-orders/${buyer_id}?page=${filters.page}&title=${filters.title}&limit=${filters.limit}`)
}

// update order status

export const update_order_status_api = async (data: any) => {
    return httpCommon.patch('/order/seller/order-status-update', data)
}

// get buyer analytics

export const get_buyer_analytics_api = async () => {
    return httpCommon.get(`/order/buyer-analytics`)
}

// seller future orders
export const get_seller_future_orders_api = async () => {
    return httpCommon.get(`/order/seller/future-orders`)
}
// buyer future orders
export const get_buyer_future_orders_api = async () => {
    return httpCommon.get(`/order/seller/future-orders`)
}
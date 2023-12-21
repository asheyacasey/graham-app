import httpCommon from "./httpCommon"

export const createAddApi = async (data: any) => {
    return httpCommon.post('/create-add', data)
}

export const getUserAddsApi = async (data: any) => {
    return httpCommon.post("/search/adds", data)
}

export const getSingleAddApi = async (id: string) => {
    return httpCommon.get(`/add/${id}`)
}
export const getSingleAddForDescriptionPageApi = async (id: string) => {
    return httpCommon.get(`/add-description-page/${id}`)
}

export interface GetUserCreatedAddsWithFiltrationProps {
    limit: number
    page: number
    title: string,
    subscriptions_only?: boolean
}
export const getUserCreatedAddsWithFiltrationApi = async ({ limit, page, title = '', subscriptions_only = false }: GetUserCreatedAddsWithFiltrationProps) => {
    return httpCommon.get(`/user_adds_with_pagination?limit=${limit}&page=${page}&title=${title}&subscriptions_only=${subscriptions_only}`)
}

export type ChangeStatusProps = {
    id: string
    status: boolean
}
export const change_add_status_api = async ({ id, status }: ChangeStatusProps) => {
    return httpCommon.post(`/add-status/${id}`, {
        status
    })
}
export const update_add_api = async (id: string, body: any) => {
    return httpCommon.patch(`/update/add/${id}`, body)
}

export const delete_add_api = async (id: string) => {
    return httpCommon.del(`/remove/add/${id}`)
}

type SellerSubscriptionPlanOrderApi = {
    subscription?: string
    start_date?: string
    end_date?: string
    limit?: number,
    page?: number
}
export const seller_subscription_plans_orders_api = async ({
    end_date = "",
    start_date = "",
    subscription = "",
    limit = 5,
    page = 1
}: SellerSubscriptionPlanOrderApi) => {
    return httpCommon.get(`/order/seller/subscription-orders?subscription=${subscription}&start_date=${start_date}&end_date=${end_date}&limit=${limit}&page=${page}`)
}


export const buyer_invoices_data = async ({
    end_date = "",
    start_date = "",
    limit = 5,
    page = 1
}: Omit<SellerSubscriptionPlanOrderApi, 'subscription'>) => {
    return httpCommon.get(`/order/buyer/invoice/data?start_date=${start_date}&end_date=${end_date}&limit=${limit}&page=${page}`)
}


export const get_highlight_adds_api = async () => {
    return httpCommon.get(`/highlight-adds`)
}
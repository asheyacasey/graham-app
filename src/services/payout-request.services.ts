import { PAYOUT_TYPE_ENUM } from "@/utils/enums"
import httpCommon from "./httpCommon"
type get_seller_payouts_available = {
    page?: number,
    limit?: number,
}
export const get_seller_payouts_available = async ({ limit = 5, page = 1 }: get_seller_payouts_available) => {
    return httpCommon.get(`/payout/seller-payouts?page=${page}&&limit=${limit}`)
}
type seller_payout_request = {
    payout_type: PAYOUT_TYPE_ENUM,
    order_id: string
    payout_amount: number,
    user_account: string
}
export const seller_payout_request = async (data: seller_payout_request) => {
    return httpCommon.post(`/payout/seller/payout-request`, data)
}
export const buyer_payout_request = async (data: seller_payout_request) => {
    return httpCommon.post(`/payout/buyer/payout-request`, data)
}

export const get_buyer_security_fee_available_payouts = async ({ limit, page }: get_seller_payouts_available) => {
    return httpCommon.get(`/payout/buyer/security-fee/payout-request?page=${page}&&limit=${limit}`)
}

export const get_payout_history_api = async (searchQuery = '') => {
    return httpCommon.get(`/payout/history${searchQuery}`)
}


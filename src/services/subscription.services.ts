import httpCommon from "./httpCommon"

export const getAllUserSubscriptionApi = async () => {
    return httpCommon.get("/subscription/user/get-all-subscription")
}
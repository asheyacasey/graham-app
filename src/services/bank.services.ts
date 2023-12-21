import httpCommon from "./httpCommon"

export const create_onboarding_account_api = async () => {
    return httpCommon.get("/bank/create-onboarding-account")
}

export const verify_onboarding_account_api = async (data: any) => {
    return httpCommon.post('/bank/verify-onboarding-account', data)
}
export const refresh_onboarding_account_api = async (data: any) => {
    return httpCommon.post('/bank/refresh-onboarding-account', data)
}

export const get_user_bank_accounts = async () => {
    return httpCommon.get("/bank/accounts")
}

export const get_user_verified_accounts = async () => {
    return httpCommon.get(`/bank/accounts/verified`)
}
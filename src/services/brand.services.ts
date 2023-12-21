import httpCommon from "./httpCommon"

export const getUserBrandsApi = async () => {
    return httpCommon.get("/brand/user/get-all")
}
import httpCommon from "./httpCommon"

export const likeProductApi = async (data: any) => {
    return httpCommon.post("/liked-product/user/like-product", data)
}
export const unLikeProductApi = async (data: any) => {
    return httpCommon.post("/liked-product/user/unlike-product", data)
}


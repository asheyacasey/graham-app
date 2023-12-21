import httpCommon from "./httpCommon"

// update user profile

export const updateUserProfileApi = async (data: any) => {
    return httpCommon.post('/update/user/profile', data)
}

// update profile image

export const updateProfileImageApi = async (data: any) => {
    return httpCommon.post('/update/user/profile-image', data)
}

// seller user analytics get
export const getSellerUserAnalyticsApi = async () => {
    return httpCommon.get("/user/seller-analytics")
}
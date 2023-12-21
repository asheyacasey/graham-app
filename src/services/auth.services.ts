import httpCommon from "./httpCommon";

// login
export const loginApi = async (data: any) => {
    return httpCommon.post('/login', data)
}
// register

export const registerApi = async (data: any) => {
    return httpCommon.post('/register', data)
}

// verify otp

export const verifyOTPApi = async (data: any) => {
    return httpCommon.post("/verify-otp", data)
}

// forget password

export const forgetPasswordApi = async (data: any) => {
    return httpCommon.post('/forget-password', data)
}

// reset password

export const resetPasswordApi = async (data: any) => {
    return httpCommon.post("/reset-password", data)
}
// google login/signup

export const googleLoginApi = async (data: any) => {
    return httpCommon.post('/google/login', data)
}

// change password

export const changePasswordApi = async (data: any) => {
    return httpCommon.post("/change-password", data)
}

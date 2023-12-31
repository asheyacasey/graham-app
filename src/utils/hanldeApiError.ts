export const handleApiError = (error: any): string => {
    let err = ""
    if (error?.response?.data?.msg) {
        err = error?.response?.data?.msg
    } else {
        err = error.message
    }
    return err;
}
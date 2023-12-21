import httpCommon from "./httpCommon"

export const getParentCategoriesApi = async () => {
    return httpCommon.get("/category/user/parent-categories")
}
export const getSubCategoriesOfParentCategoriesApi = async (parentCategory: string) => {
    return httpCommon.get(`/category/user/sub-category/${parentCategory}`)
}


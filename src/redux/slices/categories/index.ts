import { getParentCategoriesApi } from '@/services/categories.services'
import { ICategory } from '@/types'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'



interface CategoriesSlice {
    parentCategories: ICategory[],
    subCategories: ICategory[]
    loading: boolean
}

const CategorySliceInitialState: CategoriesSlice = {
    parentCategories: [],
    subCategories: [],
    loading: false,
}
const categorySlice = createSlice({
    name: "category",
    initialState: CategorySliceInitialState,
    reducers: {
        addParentCategories: (state, action: PayloadAction<ICategory[]>) => {
            state.parentCategories = action.payload
        },
        addSubCategories: (state, action: PayloadAction<ICategory[]>) => {
            state.parentCategories = action.payload
        },
        toggleLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    },
})

export const { addParentCategories, addSubCategories, toggleLoading } = categorySlice.actions

export default categorySlice.reducer;


export const fetchParentCategoriesThunk = createAsyncThunk('cat/parent', async (_, { dispatch }) => {
    try {
        dispatch(toggleLoading(false))
        const { data } = await getParentCategoriesApi()
        if (!data) {
            return;
        }
        if (data && data.length > 0) {
            dispatch(addParentCategories(data))
        }
    } catch (error) {

    } finally {
        dispatch(toggleLoading(false))
    }
})



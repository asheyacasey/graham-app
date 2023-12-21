import { CreateAddValues } from '@/layout/post-new-add/utils'
import { getUserAddsApi } from '@/services/add.services'
import { IAdd } from '@/types'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
type SearchAddsQuery = {
    lat?: string
    long?: string
    kilometers?: number
    category?: string
    searchText?: string
    brand?: string[]
    min_price?: number
    max_price?: number
    sub_category?: string
    page?: number
    limit?: number
    city?: string
}


interface AddSlice {
    adds: IAdd[]
    loading: boolean
    filteration: SearchAddsQuery
    totalDocs: number
}

export const addSliceInitialState: AddSlice = {
    adds: [],
    loading: false,
    filteration: {
        city: "",
        brand: [],
        category: "",
        kilometers: 0,
        lat: "",
        limit: 9,
        long: '',
        max_price: 1000,
        min_price: 0,
        page: 1,
        searchText: "",
        sub_category: ""
    },
    totalDocs: 0,
}

const addSlice = createSlice({
    name: "add",
    initialState: addSliceInitialState,
    reducers: {
        addProducts: (state, action: PayloadAction<{ adds: IAdd[] }>) => {
            state.adds = action.payload.adds
        },
        addLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        updateFiltration: (state, action: PayloadAction<SearchAddsQuery>) => {

            state.filteration = action.payload
        },
        handleTotalDocs: (state, action: PayloadAction<number>) => {
            state.totalDocs = action.payload
        },
        
    }
})

export const { addProducts, addLoading, updateFiltration, handleTotalDocs, } = addSlice.actions
export default addSlice.reducer


export const getAddWithFiltersThunk = createAsyncThunk('add/filter', async (body: SearchAddsQuery, { dispatch, getState }) => {
    try {
        const state = (getState() as any).add as AddSlice
        let _search = { ...state.filteration, ...body }
        dispatch(addLoading(true))
        dispatch(updateFiltration(_search))
        const { data } = await getUserAddsApi(_search)
        dispatch(addProducts({ adds: data.products }))
        dispatch(handleTotalDocs(data.totalAdds))
    } catch (error: any) {
        console.error(error)
    } finally {
        dispatch(addLoading(false))
    }
})


import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IAppState {
    fullScreenLoading: boolean
}
const appInitialState: IAppState = {
    fullScreenLoading: false
}
const appState = createSlice({
    name: "app",
    initialState: appInitialState,
    reducers: {
        toggleFullScreenLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.fullScreenLoading = action.payload
        }
    }
})
export const { toggleFullScreenLoadingAction } = appState.actions

export default appState.reducer
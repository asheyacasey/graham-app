import { TRootState } from '@/redux'
import { IAdd, RENTED_AS_ENUM } from '@/types'
import { addPercentageToPrice } from '@/utils/addPercentageToPrice'
import { calculateDaysDifference, calculateHoursDifference, calculateMonthsDifference, calculateWeeksDifference, calculateYearsDifference } from '@/utils/datesFunctions'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CartItem {
    add: IAdd
    start_date_time: Date
    end_date_time: Date
    quantity: number
    liked: boolean
}
export interface CarSlice {
    cartItems: CartItem[]
}

const cartInitialState: CarSlice = {
    cartItems: []
}
const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {
        addCartItemAction: (state, action: PayloadAction<CartItem>) => {
            const filteredCart = state.cartItems.filter((v) => v.add._id !== action.payload.add._id)
            state.cartItems = [...filteredCart, action.payload]
        },
        removeCartItemAction: (state, action: PayloadAction<{ id: string }>) => {
            state.cartItems = state.cartItems.filter((value) => value.add._id !== action.payload.id)
        },
        updateCartItemAction: (state, action: PayloadAction<CartItem>) => {
            state.cartItems = state.cartItems.map((p) => p.add._id === action.payload.add._id ? action.payload : p)
        },
        emptyCartAction: (state) => {
            state.cartItems = []
        }
    }
})

export const { addCartItemAction, removeCartItemAction, updateCartItemAction, emptyCartAction } = cartSlice.actions;

export default cartSlice.reducer



// SINGLE PRODUCT TOTAL PRICE WITH_OUT TAXES ONLY.
export const getSingleCartItemTotalPriceThunk = (cart: TRootState['cart'], id: string): number => {
    const cartItem = cart.cartItems.find((v) => v.add._id == id)
    if (!cartItem) {
        return 0;
    }
    return cartItem.add.prices.rent_price * cartItem.quantity * getSingleItemTimeDifference(cartItem.add, new Date(cartItem.start_date_time), new Date(cartItem.end_date_time))
}
// SINGLE PRODUCT TAXES ONLY
export const singleProductTaxesThunk = (cart: TRootState['cart'], id: string): number => {
    const cartItem = cart.cartItems.find((v) => v.add._id == id)
    if (!cartItem) {
        return 0;
    }
    return (addPercentageToPrice((cartItem.add.prices.rent_price * cartItem.quantity * getSingleItemTimeDifference(cartItem.add, new Date(cartItem.start_date_time), new Date(cartItem.end_date_time))), cartItem.add.prices.taxes))
}
// SINGLE PRODUCT SERVICES FEE ONLY
export const singleProductServiceFeeThunk = (cart: TRootState['cart'], id: string): number => {
    const cartItem = cart.cartItems.find((v) => v.add._id == id)
    if (!cartItem) {
        return 0;
    }
    return (addPercentageToPrice((cartItem.add.prices.rent_price * cartItem.quantity * getSingleItemTimeDifference(cartItem.add, new Date(cartItem.start_date_time), new Date(cartItem.end_date_time))), cartItem.add.prices.service_fee))
}
// *** security fee calculation ***
export const singleCartItemTotalSecurityFee = (cart: TRootState['cart'], id: string): number => {
    const cartItem = cart.cartItems.find((v) => v.add._id == id)
    if (!cartItem) {
        return 0;
    }
    return cartItem.add.payment_policy.deposit ? cartItem.add.payment_policy.amount * cartItem.quantity : 0
}
// SINGLE PRODUCT TOTAL PRICES WITH TAXES+SERVICE_FEE
export const getSingleCartItemTotalPriceWithTaxAndFeeThunk = (cart: TRootState['cart'], id: string) => {
    return getSingleCartItemTotalPriceThunk(cart, id) + singleProductTaxesThunk(cart, id) + singleProductServiceFeeThunk(cart, id) + singleCartItemTotalSecurityFee(cart, id)
}

// FULL CART PRICE TOTAL WITH OUT TAXES
export const calculateTotalPriceThunk = (cartState: TRootState['cart']): number => {
    return cartState.cartItems.reduce((prevValue, item) => {
        return prevValue + (item.add.prices.rent_price * item.quantity * getSingleItemTimeDifference(item.add, new Date(item.start_date_time), new Date(item.end_date_time)))
    }, 0)
}
// FULL CART TOTAL TAXES ONLY
export const calculateTotalTaxesPriceThunk = (cartState: TRootState['cart']): number => {
    return cartState.cartItems.reduce((prevValue, item) => {
        return prevValue + (addPercentageToPrice((item.add.prices.rent_price * item.quantity * getSingleItemTimeDifference(item.add, new Date(item.start_date_time), new Date(item.end_date_time))), item.add.prices.taxes))
    }, 0)
}

// FULL CART SERVICE FEE
export const calculateTotalServicesFeePriceThunk = (cartState: TRootState['cart']): number => {
    return cartState.cartItems.reduce((prevValue, item) => {
        return prevValue + (addPercentageToPrice((item.add.prices.rent_price * item.quantity * getSingleItemTimeDifference(item.add, new Date(item.start_date_time), new Date(item.end_date_time))), item.add.prices.service_fee))
    }, 0)
}
// *** calculate total security fees ***
export const totalSecurityFeesOfCart = (cartState: TRootState['cart']): number => {
    return cartState.cartItems.reduce((prevValue, item) => {
        return prevValue + singleCartItemTotalSecurityFee(cartState, item.add._id)
    }, 0)
}

// FULL CART FINAL AMOUNT
export const getTotalFinalAmountThunk = (cartState: TRootState['cart']): number => {
    return calculateTotalPriceThunk(cartState) + calculateTotalTaxesPriceThunk(cartState) + calculateTotalServicesFeePriceThunk(cartState) + totalSecurityFeesOfCart(cartState)
}

// CALCULATE SINGLE ITEM TIME DIFFERENCE PRICE 
export const getSingleItemTimeDifference = (add: IAdd, start_date: Date, end_date: Date) => {
    switch (add.prices.rented_as) {
        case RENTED_AS_ENUM.DAY:
            return calculateDaysDifference(new Date(start_date), new Date(end_date))
        case RENTED_AS_ENUM.HOUR:
            return calculateHoursDifference(new Date(start_date), new Date(end_date))
        case RENTED_AS_ENUM.MONTH:
            return calculateMonthsDifference(new Date(start_date), new Date(end_date))
        case RENTED_AS_ENUM.WEEKS:
            return calculateWeeksDifference(new Date(start_date), new Date(end_date))
        case RENTED_AS_ENUM.YEAR:
            return calculateYearsDifference(new Date(start_date), new Date(end_date))
        default:
            return 0
    }
}
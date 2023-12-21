
import { RoleEnum } from "@/redux/slices/auth/utils"
import { NOTIFICATION_TYPES_ENUM, ORDER_PROCESS_STATUS_ENUM, ORDER_STATUS_ENUM, PAYMENT_STATUS_ENUM, PAYOUT_PAYMENT_STATUS_ENUM, PAYOUT_TYPE_ENUM, SubscriptionNameEnum } from "@/utils/enums"

// USER
export interface IUser extends TimeStamps {
    _id: string
    country: string
    email: string
    phoneNumber: string
    role: RoleEnum
    city: string
    fullName: string
    state: string
    username: string
    zip_code: string
    profile_image: string
}

// USER
export interface ICategory {
    _id: string
    name: string
    parent_category?: string
    draft: boolean
    icon?: string
}

export interface IBrand {
    _id: string
    name: string
    draft: boolean
}


export interface ISubscription {
    _id: string
    name: SubscriptionNameEnum
    duration_in_days: number
    draft: boolean
    amount: number
}



// addd
export enum RENTED_AS_ENUM {
    HOUR = 'HOUR',
    DAY = "DAY",
    WEEKS = 'WEEKS',
    MONTH = "MONTH",
    YEAR = 'YEAR'
}
type Price = {
    currency: string
    rented_as: RENTED_AS_ENUM
    rent_price: number
    taxes: number
    service_fee: number
}
type PaymentPolicy = {
    deposit: boolean
    rent_type: string
    amount: number
}
type CustomDetails = {
    label: string
    value: string
}
type Location = {
    street_no_1: string
    street_no_2: string
    postcode: string
    city: string
    country: string
    lat: number
    long: number
}
type Plan = {
    amount: number,
    duration_in_days: number,
    name: string
}
type VendorDetails = {
    name: string
    street_no_1: string
    street_no_2: string
    phone_number: string
    desctiption: string
    postcode: string
    city: string
    country: string
}
export interface IAdd extends TimeStamps {
    _id: string
    add_title: string
    add_description: string
    available_stock: number
    images: string[]
    prices: Price
    vendor_details: VendorDetails
    category: string
    sub_category: string
    brand: string
    payment_policy: PaymentPolicy
    product_details: string
    about_product: string
    things_to_know: string
    cancellation_policy: string
    customDetails: CustomDetails[]
    location: Location,
    start_date: Date,
    end_date: Date,
    plan: Plan
    created_by?: IUser
    disabled: boolean
}


interface TimeStamps {
    createdAt: string
    updatedAt: string
}

export type TOrderProcessStatus = {
    date: string
    status: ORDER_PROCESS_STATUS_ENUM
}
export interface IOrder extends TimeStamps {
    _id: string
    product?: IAdd | string
    quantity: number
    total_price: number
    buyer?: IUser | string
    seller?: IUser | string
    seller_earned: number
    start_date: string
    end_date: string
    time_difference: number
    taxes: number
    service_fee: number
    process_status: TOrderProcessStatus[]
    payment_status: PAYMENT_STATUS_ENUM
    order_status: ORDER_STATUS_ENUM
    billing_details: Billing_Details
    // *** stripe_session_id
    stripe_session_id: string
    // *** refund_session_id ***
    refund_session_id: string
    // *** refunded policy ***
    refunded: boolean
    // *** refunded_amount ***
    refunded_amount: number
}
export type Billing_Details = {
    username: string
    name: string
    email: string
    mobile_number: string
    city: string
    zip_code: string
    state: string
    country: string
}

export interface IBankAccount extends TimeStamps {
    _id: string
    account_id: string
    user: IUser | string
    verified: boolean
}

export interface IPayoutRequest {
    _id: string,
    payout_type: PAYOUT_TYPE_ENUM,
    user: string,
    order_id: string,
    payout_amount: number
    payout_stripe_id: string
    payment_status: PAYOUT_PAYMENT_STATUS_ENUM
}


export interface INotification {
    _id?: string
    recipent?: string,
    title?: string
    message?: string
    type?: NOTIFICATION_TYPES_ENUM
    createdAt?: string
    updatedAt?: string
    seen?: boolean
}
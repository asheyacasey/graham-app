import * as Yup from 'yup'
export enum PLANS_ENUM {
    PUSH_UP = "PUSH_UP",
    HIGHLIGHT = "HIGHLIGHT",
    TOP = "TOP"
}
export const createAddValidator = Yup.object({
    add_title: Yup.string().required("Add title is required."),
    add_description: Yup.string().required("Add description is required."),
    available_stock: Yup.number().min(1, "Stock is required.").required("Stock is required."),
    images: Yup.array().of(Yup.string()).required("Images are required.").min(1,'Kindly select images.'),
    prices: Yup.object({
        currency: Yup.string().required("Currency is required."),
        rented_as: Yup.string().required("Rented as is required."),
        rent_price: Yup.number().min(1, "Rent price is required.").required("Rent price is required."),
        taxes: Yup.number(),
        service_fee: Yup.number(),
    }),
    category: Yup.string().required("Category is required"),
    vendor_details: Yup.object({
        name: Yup.string().required("Vendor name is required."),
        street_no_1: Yup.string().required("Vendor street no.1 is required."),
        street_no_2: Yup.string().required("Vendor street no.2 is required."),
        phone_number: Yup.string().required("Vendor phone number required."),
        desctiption: Yup.string().required("Vendor desctiption is required."),
        postcode: Yup.string().required("Vendor postcode is required."),
        city: Yup.string().required("Vendor city is required."),
        country: Yup.string().required("Vendor country is required."),
    }),
    sub_category: Yup.string().required("Sub category is required"),
    brand: Yup.string().required("Brand is required"),
    payment_policy: Yup.object({
        deposit: Yup.boolean().required("Policy deposit is required."),
        rent_type: Yup.string().required("Rent type is required."),
        amount: Yup.number().min(1, "Amount is required.").required("Amount is required."),
    }),
    product_details: Yup.string().required("Product details is required."),
    about_product: Yup.string().required("About product is required."),
    things_to_know: Yup.string().required("Things to know is required."),
    cancellation_policy: Yup.string().required("Cancellation policy is required."),
    customDetails: Yup.array().of(
        Yup.object({
            label: Yup.string(),
            value: Yup.string(),
        })
    ),
    location: Yup.object({
        street_no_1: Yup.string().required("Street is required."),
        street_no_2: Yup.string().required("Street is required."),
        postcode: Yup.string().required("Postcode is required."),
        city: Yup.string().required("City is required."),
        country: Yup.string().required("Country is required."),
        lat: Yup.number().required("Latitude is required."),
        long: Yup.number().required("Longitude is required."),
    }),
    plan: Yup.object({
        _id: Yup.string(),
        name: Yup.string(),
        duration_in_days: Yup.number(),
        amount: Yup.number()
    })
})

export type CreateAddValues = Yup.InferType<typeof createAddValidator>


export const createAddValidatorInitialValues: CreateAddValues = {
    add_title: '',
    add_description: '',
    available_stock: 0,
    images: [],
    prices: {
        currency: '',
        rented_as: '',
        rent_price: 0,
        service_fee: 0,
        taxes: 0
    },
    category: '',
    vendor_details: {
        city: "",
        country: "",
        desctiption: "",
        name: "",
        phone_number: "",
        postcode: "",
        street_no_1: "",
        street_no_2: ""
    },
    sub_category: '',
    brand: '',
    payment_policy: {
        amount: 0,
        deposit: false,
        rent_type: ""
    },
    product_details: '',
    about_product: '',
    things_to_know: '',
    cancellation_policy: '',
    location: {
        city: "",
        country: "",
        lat: 51.1657,
        long: 10.4515,
        postcode: "",
        street_no_1: "",
        street_no_2: ""
    },
    plan: {
        _id: '',
        amount: 0,
        duration_in_days: 0,
        name: ""
    },
    customDetails: [{ label: "", value: "" }],
}



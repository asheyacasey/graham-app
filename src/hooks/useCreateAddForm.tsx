import { CreateAddValues, createAddValidator, createAddValidatorInitialValues } from '@/layout/post-new-add/utils'
import { useAppDispatch } from '@/redux/hooks'
import { toggleFullScreenLoadingAction } from '@/redux/slices/app'
import { createAddApi, update_add_api } from '@/services/add.services'
import { IAdd } from '@/types'
import { handleApiError } from '@/utils/hanldeApiError'
import { loadStripe } from '@stripe/stripe-js'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'

const useCreateAddForm = (add: null | IAdd) => {
    const dispatch = useAppDispatch()
    const form = useFormik({
        validationSchema: createAddValidator,
        enableReinitialize: true,
        initialValues: !add ? createAddValidatorInitialValues : {
            about_product: add.about_product,
            add_description: add.add_description,
            add_title: add.add_title,
            available_stock: add.available_stock,
            brand: add.brand,
            cancellation_policy: add.cancellation_policy,
            category: add.category,
            images: add.images,
            location: {
                city: add.location.city,
                country: add.location.country,
                lat: add.location.lat,
                long: add.location.long,
                postcode: add.location.postcode,
                street_no_1: add.location.street_no_1,
                street_no_2: add.location.street_no_2
            },
            payment_policy: {
                amount: add.payment_policy.amount,
                deposit: add.payment_policy.deposit,
                rent_type: add.payment_policy.rent_type
            },
            plan: {
                amount: add.plan.amount,
                duration_in_days: add.plan.duration_in_days,
                name: add.plan.name
            },
            prices: {
                currency: add.prices.currency,
                rent_price: add.prices.rent_price,
                rented_as: add.prices.rented_as,
                service_fee: add.prices.service_fee,
                taxes: add.prices.taxes,
            },
            product_details: add.product_details,
            sub_category: add.sub_category,
            things_to_know: add.things_to_know,
            customDetails: add.customDetails,
            vendor_details: add.vendor_details
        } as CreateAddValues,
        onSubmit: async (submitValues) => {
            // ********** Update the add ****************
            if (add) {
                try {
                    dispatch(toggleFullScreenLoadingAction(true))
                    const { data } = await update_add_api(add._id, submitValues)
                    toast.success("Add updated successfully")
                } catch (error: any) {
                    const err = handleApiError(error)
                    toast.error(err)
                } finally {
                    dispatch(toggleFullScreenLoadingAction(false))
                }
            } else {
                // ********* crete new add ***************
                try {
                    dispatch(toggleFullScreenLoadingAction(true))
                    const { data } = await createAddApi(submitValues)
                    if (data.payment) {
                        const stripe = await loadStripe(
                            process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string
                        );
                        stripe?.redirectToCheckout({ sessionId: data.session_id });
                    } else {
                        toast.success("Add created successful")
                    }
                } catch (error: any) {
                    const err = handleApiError(error)
                    toast.error(err)
                } finally {
                    dispatch(toggleFullScreenLoadingAction(false))
                }
            }
        }
    })
    return form
}
export default useCreateAddForm

export type CreateAddFormActionsType = ReturnType<typeof useCreateAddForm>;
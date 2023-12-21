import { CreateAddFormActionsType } from '@/hooks/useCreateAddForm'
import AccountLayout from '@/layout/account'
import TextArea from '@/ui/form/TextArea'
import React from 'react'
interface ProductDetailsProps extends CreateAddFormActionsType { }
const ProductDetails = (props: ProductDetailsProps) => {
    const { values, errors, touched, handleBlur, handleChange, setValues } = props
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
                <label className="font-semibold font-Montserrat">
                    Product Details
                </label>
                <AccountLayout>
                    <TextArea
                        id='product_details'
                        value={values.product_details}
                        name='product_details'
                        onChange={handleChange}
                        error={errors.product_details && touched.product_details ? errors.product_details : ""}
                        onBlur={handleBlur}

                        className='border-brand_blue-500' rows={8} label='Description*' labelClassName='font-semibold' />
                </AccountLayout>
            </div>
            <div className="space-y-3">
                <label className="font-semibold font-Montserrat">
                    About Product
                </label>
                <AccountLayout>
                    <TextArea
                        id="about_product"
                        value={values.about_product}
                        name='about_product'
                        onChange={handleChange}
                        error={errors.about_product && touched.about_product ? errors.about_product : ""}
                        onBlur={handleBlur}
                        className='border-brand_blue-500' rows={8} label='Description*' labelClassName='font-semibold' />
                </AccountLayout>
            </div>
            <div className="space-y-3">
                <label className="font-semibold font-Montserrat">
                    Things to Know
                </label>
                <AccountLayout>
                    <TextArea
                        id="things_to_know"
                        value={values.things_to_know}
                        name='things_to_know'
                        onChange={handleChange}
                        error={errors.things_to_know && touched.things_to_know ? errors.things_to_know : ""}
                        onBlur={handleBlur}
                        className='border-brand_blue-500' rows={8} label='Description*' labelClassName='font-semibold' />
                </AccountLayout>
            </div>
            <div className="space-y-3">
                <label className="font-semibold font-Montserrat">
                    Cancellation Policy
                </label>
                <AccountLayout>
                    <TextArea
                        id="cancellation_policy"
                        value={values.cancellation_policy}
                        name='cancellation_policy'
                        onChange={handleChange}
                        error={errors.cancellation_policy && touched.cancellation_policy ? errors.cancellation_policy : ""}
                        onBlur={handleBlur}
                        className='border-brand_blue-500' rows={8} label='Description*' labelClassName='font-semibold' />
                </AccountLayout>
            </div>
        </div>
    )
}

export default ProductDetails
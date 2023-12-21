import { currencyData } from '@/data/currencyData'
import { CreateAddFormActionsType } from '@/hooks/useCreateAddForm'
import AccountLayout from '@/layout/account'
import { OptionType } from '@/ui/components/Dropdown'
import Input from '@/ui/form/Input'
import Select from '@/ui/form/Select'
import { RENTED_AS_ENUM } from '@/utils/enums'
import React, { memo } from 'react'
interface PriceSectionProps extends CreateAddFormActionsType { }
const PriceSection = (props: PriceSectionProps) => {
    const { values, errors, touched, handleBlur, handleChange, setValues } = props
    return (
        <div className="space-y-5 font-Montserrat ">
            <h2 className="font-semibold">Price</h2>
            <AccountLayout className="flex flex-col md:grid md:grid-cols-3 lg:flex lg:flex-row gap-5 justify-between">
                <div className="w-full">
                    <Select
                        value={{ value: values.prices.currency, label: values.prices.currency }}
                        id="prices_currency"
                        name="prices.currency"
                        label='Currency'
                        placeholder="Currency"
                        labelClassName='font-semibold text-sm text-black'
                        options={currencyData}
                        className="react-notification-select"
                        classNamePrefix="react-select-notification"
                        onChange={(data: OptionType) => {
                            setValues((prev) => ({ ...prev, prices: { ...prev.prices, currency: String(data.value) } }));
                        }}
                        onBlur={handleBlur}
                        error={errors.prices?.currency && touched.prices?.currency ? errors.prices?.currency : ""}
                    />
                </div>
                <div className="w-full">
                    <Select
                        id="prices_rented_as"
                        value={{ label: values.prices.rented_as, value: values.prices.rented_as }}
                        name="prices.rented_as"
                        label='Rated As a'
                        placeholder="Rated as"
                        labelClassName='font-semibold text-sm text-black'
                        options={Object.keys(RENTED_AS_ENUM).map((val) => ({ label: val, value: val }))}
                        className="react-notification-select"
                        classNamePrefix="react-select-notification"
                        onChange={(data: OptionType) => {
                            setValues((prev) => ({ ...prev, prices: { ...prev.prices, rented_as: String(data.value) } }));
                        }}
                        onBlur={handleBlur}
                        error={errors.prices?.rented_as && touched.prices?.rented_as ? errors.prices?.rented_as : ""}
                    />
                </div>
                <div className="w-full">
                    <Input
                        id="prices_rent_price"
                        label='Rent Price'
                        labelClassName='font-semibold text-sm text-black'
                        value={values.prices.rent_price}
                        name='prices.rent_price'
                        onChange={handleChange}
                        error={errors.prices?.rent_price && touched.prices?.rent_price ? errors.prices?.rent_price : ''}
                        onBlur={handleBlur}
                        className="border-[1.5px] border-brand_blue-500"
                    />
                </div>
                <div className="w-full">
                    <Input
                        id="prices_taxes"
                        label='Taxes'
                        labelClassName='font-semibold text-sm text-black'
                        value={values.prices.taxes}
                        name='prices.taxes'
                        onChange={handleChange}
                        error={errors.prices?.taxes && touched.prices?.taxes ? errors.prices?.taxes : ''}
                        onBlur={handleBlur}
                        className="border-[1.5px] border-brand_blue-500"
                    />
                </div>
                <div className="w-full">
                    <Input
                        id="prices_service_fee"
                        label='Service Fee'
                        labelClassName='font-semibold text-sm text-black'
                        value={values.prices.service_fee}
                        name='prices.service_fee'
                        onChange={handleChange}
                        error={errors.prices?.service_fee && touched.prices?.service_fee ? errors.prices?.service_fee : ''}
                        onBlur={handleBlur}
                        className="border-[1.5px] border-brand_blue-500"
                    />
                </div>
            </AccountLayout>
        </div>
    )
}

export default memo(PriceSection) 
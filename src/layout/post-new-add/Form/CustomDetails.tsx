import { CreateAddFormActionsType } from '@/hooks/useCreateAddForm'
import AccountLayout from '@/layout/account'
import Button from '@/ui/form/Button'
import Input from '@/ui/form/Input'
import React, { memo } from 'react'
interface CustomDetailsProps extends CreateAddFormActionsType { }
const CustomDetails = (props: CustomDetailsProps) => {
    const { values, errors, touched, handleBlur, handleChange, setValues } = props
    const handleAddMoreCustomDetails = () => {
        const customField = { label: "", value: "" }
        const updatedCustomDetails = values.customDetails?.length ? [...values.customDetails, customField] : [customField]
        setValues((prev) => ({ ...prev, customDetails: updatedCustomDetails }))
    }
    const handleDeleteCustomField = (index: number) => {
        const updatedCustomDetails = values.customDetails?.filter((el, i) => i !== index)
        setValues((prev) => ({ ...prev, customDetails: updatedCustomDetails }))
    }
    return (
        <div className="my-5 space-y-7">
            <label className="font-semibold font-Montserrat ">
                Add Custom Details
            </label>
            <AccountLayout className='space-y-5' >
                {
                    values.customDetails?.map((el, index) => (
                        <div key={index} className="flex flex-col gap-5  lg:flex-row justify-between md:gap-10 w-full">
                            <div className="md:space-y-2 w-full">
                                <Input
                                    name={`customDetails[${index}].label`}
                                    value={values.customDetails && values.customDetails[index].label}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    label='Label'
                                    labelClassName='text-sm text-black font-semibold font-Montserrat'
                                    className=" border-brand_blue-500"
                                />
                            </div>
                            <div className="md:space-y-2 w-full">
                                <Input
                                    name={`customDetails[${index}].value`}
                                    value={values.customDetails && values.customDetails[index].value}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    label='Value'
                                    labelClassName='text-sm text-black font-semibold font-Montserrat'
                                    className="  border-brand_blue-500"
                                />
                            </div>
                            <div className="md:mt-8 w-full flex flex-col gap-5 md:flex-row md:gap-10 items-center">
                                <Button onClick={() => { handleDeleteCustomField(index) }}>Delete</Button>
                                <Button onClick={handleAddMoreCustomDetails} className="bg-brand_yellow-500 border-none">
                                    Add More
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </AccountLayout>

        </div>
    )
}

export default memo(CustomDetails) 
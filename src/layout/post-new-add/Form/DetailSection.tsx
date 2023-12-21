import Input from '@/ui/form/Input'
import React, { memo, useRef, useState } from 'react'
import { File, Plus, RadioIcon, RadioIconFill } from '../../../../public/assets/assets/svg';
import ImagePicker from '@/layout/post-new-ad/ImagePicker';
import { cn } from '@/utils/styles';
import { CreateAddFormActionsType } from '@/hooks/useCreateAddForm';
import Select from '@/ui/form/Select';
import { OptionType } from '@/ui/components/Dropdown';
import { fileIntoBase64 } from '@/utils/fileIntoBase64';
import { IconComponent } from '@/ui/Icon';
import ErrorBox from '@/ui/form/ErrorBox';
interface DetailSectionProps extends CreateAddFormActionsType { }
const StocksData = [
    {
        label: "1",
        value: 1
    },
    {
        label: "2",
        value: 2
    },
    {
        label: "3",
        value: 3
    },
    {
        label: "4",
        value: 4
    },
] as OptionType[]
const DetailSection = (props: DetailSectionProps) => {
    const [changingFile, setchangingFile] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const { values, errors, touched, handleBlur, handleChange, setValues } = props
    const handleImageChange = async (data: File) => {
        const base64Image = await fileIntoBase64(data)
        console.log({ base64Image, images: values.images })
        setValues((prev) => ({ ...prev, images: [...prev.images, base64Image] }))
        setchangingFile(!changingFile)
    }
    const handleRemoveImage = (index: number) => {
        const updatedImage = [...values.images].filter((_, i) => i !== index)
        setValues((prev) => ({ ...prev, images: updatedImage }))
    }
    console.log('Images===<>', errors.images)
    return (
        <div className="flex flex-col w-full py-10 gap-5 md:flex-row">
            <div className="w-full">
                <h2 className="font-Montserrat font-semibold">Ad Details</h2>
                <div className="w-full bg-white rounded-lg p-7">
                    <div className="font-Montserrat space-y-5">
                        <Input
                            id='add_title'
                            name='add_title'
                            value={values.add_title}
                            error={errors.add_title && touched.add_title ? errors.add_title : ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label='Title of the Ad*' labelClassName='font-semibold text-sm text-brand_gray-200' className="w-full p-0 border-[1.5px] border-brand_blue-500" />
                        <Input
                            id='add_description'
                            name='add_description'
                            value={values.add_description}
                            error={errors.add_description && touched.add_description ? errors.add_description : ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label='Descriptions'
                            labelClassName='font-semibold text-sm text-brand_gray-200'
                            className="w-full p-0 border-[1.5px] border-brand_blue-500" />
                        <section className="pt-4" >
                            <Select
                                value={{ label: String(values.available_stock), value: String(values.available_stock) }}
                                id="available_stock"
                                name="available_stock"
                                label='Stocks'
                                labelClassName='font-semibold text-sm text-brand_gray-200'
                                options={Array(100).fill("").map((_, index) => ({ label: `${index + 1}`, value: `${index + 1}` }))}
                                className="react-notification-select"
                                classNamePrefix="react-select-notification"
                                onChange={(data: OptionType) => {
                                    setValues((prev) => ({ ...prev, available_stock: Number(data.value) }));
                                }}
                                onBlur={handleBlur}
                                error={errors.available_stock && touched.available_stock ? errors.available_stock : ""}
                            />
                        </section>
                    </div>
                </div>
            </div>
            <div className="w-full" >
                <h2 className="font-Montserrat font-semibold">Pictures</h2>
                {
                    errors.images ?
                        <ErrorBox error={errors.images as string} />
                        :
                        null
                }
                <div
                    id={'images'}
                    className="grid grid-cols-2 justify-items-center gap-y-10 gap-5 lg:grid-cols-4"
                >
                    {
                        values.images?.map((el, index) => (
                            <div
                                key={index}
                                className="relative p-3 bg-brand_yellow-500 flex justify-center items-center h-28 w-28 xl:h-36 xl:w-36 rounded-lg "
                            >
                                <div className='h-10 w-10 rounded-full bg-red-500 absolute right-0 top-0 flex items-center justify-center ' >
                                    <IconComponent name='CrossIcon' className=' text-white cursor-pointer' onClick={() => {
                                        handleRemoveImage(index)
                                    }} />
                                </div>
                                <img src={el} alt="" className='w-full h-full object-contain bg-white' />
                            </div>
                        ))
                    }
                    <label
                        htmlFor="actual-btn"
                        className="relative bg-brand_yellow-500 cursor-pointer flex justify-center items-center h-28 w-28 xl:h-36 xl:w-36 rounded-lg "
                    >
                        <div className="relative bg-white flex justify-center items-center h-20 w-20 xl:h-28 xl:w-28 rounded-lg ">
                            <input
                                type="file"
                                onChange={(e) => {
                                    console.log('inside onchange')
                                    if (!e.target.files) {
                                        return;
                                    }
                                    const file = e.target.files[0]
                                    handleImageChange(file)
                                    e.target.value = ''
                                }}

                                id="actual-btn"
                                className="hidden" />
                            <Plus />
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default memo(DetailSection)
interface RadioButtonProps {
    checked: boolean;
    onChange: () => void;
    title: string;
}
const RadioButton = ({ checked, onChange, title }: RadioButtonProps) => {
    return (
        <div
            onClick={onChange}
            className={cn("flex items-center gap-3", {
                "border-brand_green-200 ": checked,
                "border-brand_gray-500 bg-transparent": !checked,
            })}
        >
            {checked ? <RadioIconFill /> : <RadioIcon />}
            <h1 className={cn(" text-sm text-black font-semibold font-Montserrat")}>
                {title}
            </h1>
        </div>
    );
};
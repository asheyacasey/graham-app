import AccountLayout from '@/layout/account'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { CreateAddFormActionsType } from '@/hooks/useCreateAddForm'
import Select from '@/ui/form/Select'
import { currencyData } from '@/data/currencyData'
import { OptionType } from '@/ui/components/Dropdown'
import { IBrand, ICategory } from '@/types'
import { getParentCategoriesApi, getSubCategoriesOfParentCategoriesApi } from '@/services/categories.services'
import { getUserBrandsApi } from '@/services/brand.services'
interface CategorySectionProps extends CreateAddFormActionsType { }
const CategorySection = (props: CategorySectionProps) => {
    const [parentCategories, setparentCategories] = useState<ICategory[]>([])
    const [subCategories, setsubCategories] = useState<ICategory[]>([])
    const [allBrands, setallBrands] = useState<IBrand[]>([])
    const { values, errors, touched, handleBlur, handleChange, setValues } = props
    const GetParentCategories = useCallback(async () => {
        try {
            const { data } = await getParentCategoriesApi()
            setparentCategories(data)
        } catch (error: any) {
            console.error(error.message)
        }
    }, [])
    const GetSubCategories = useCallback(async () => {
        if (!values.category) {
            return;
        }
        try {
            const _parentCat = parentCategories.find((val) => val.name === values.category)
            if (!_parentCat) {
                return;
            }
            const { data } = await getSubCategoriesOfParentCategoriesApi(_parentCat._id)
            setsubCategories(data)
        } catch (error) {
        }
    }, [parentCategories, values.category])
    const GetAllBrands = useCallback(async () => {
        try {
            const { data } = await getUserBrandsApi()
            setallBrands(data)
        } catch (error) {
        }
    }, [])
    useEffect(() => {
        GetParentCategories()
    }, [GetParentCategories])
    useEffect(() => {
        GetSubCategories()
    }, [GetSubCategories])
    useEffect(() => {
        GetAllBrands()
    }, [GetAllBrands])

    const parentCategoriesSelectData = useMemo(() => {
        const toReturn: OptionType[] = parentCategories.map((val) => ({ label: val.name, value: String(val.name) }))
        return toReturn;
    }, [parentCategories])
    const subCategoriesSelectData = useMemo(() => {
        const toReturn: OptionType[] = subCategories.map((val) => ({ label: val.name, value: String(val.name) }))
        return toReturn;
    }, [subCategories])
    const brandsSelectDate: OptionType[] = useMemo(() => {
        const toReturn: OptionType[] = allBrands.map((val) => ({ label: val.name, value: String(val.name) }))
        return toReturn;
    }, [allBrands])
    console.log('categories page')
    return (
        <div className="font-Montserrat flex flex-col lg:flex-row w-full my-5 gap-7 `">
            <div className="w-full space-y-3">
                <h2 className="font-semibold">Category</h2>
                <AccountLayout>
                    <Select
                        id="category"
                        name="category"
                        placeholder="Select Category"
                        labelClassName='font-semibold text-sm text-black'
                        options={parentCategoriesSelectData}
                        className="react-notification-select"
                        classNamePrefix="react-select-notification"
                        value={{ value: values.category, label: values.category }}
                        onChange={(data: OptionType) => {
                            setValues((prev) => ({ ...prev, category: String(data.value), sub_category: "" }));
                        }}
                        onBlur={handleBlur}
                        error={errors.category && touched.category ? errors.category : ""}
                    />
                </AccountLayout>
            </div>
            <div className="w-full space-y-3">
                <h2 className="font-semibold">Sub - Category</h2>
                <AccountLayout>
                    <Select
                        id="sub_category"
                        name="sub_category"
                        placeholder="Select Sub-Categories"
                        labelClassName='font-semibold text-sm text-black'
                        options={subCategoriesSelectData}
                        className="react-notification-select"
                        classNamePrefix="react-select-notification"
                        value={{ value: values.sub_category, label: values.sub_category }}
                        onChange={(data: OptionType) => {
                            setValues((prev) => ({ ...prev, sub_category: String(data.value) }));
                        }}
                        onBlur={handleBlur}
                        error={errors.sub_category && touched.sub_category ? errors.sub_category : ""}
                    />
                </AccountLayout>
            </div>
            <div className="w-full space-y-3">
                <h2 className="font-semibold">Brand</h2>
                <AccountLayout>
                    <Select
                        id="brand"
                        name="brand"
                        placeholder="Select Sub-Categories"
                        labelClassName='font-semibold text-sm text-black'
                        options={brandsSelectDate}
                        className="react-notification-select"
                        classNamePrefix="react-select-notification"
                        onChange={(data: OptionType) => {
                            setValues((prev) => ({ ...prev, brand: String(data.value) }));
                        }}
                        value={{ label: values.brand, value: values.brand }}
                        onBlur={handleBlur}
                        error={errors.brand && touched.brand ? errors.brand : ""}
                    />
                </AccountLayout>
            </div>
        </div>
    )
}

export default memo(CategorySection) 
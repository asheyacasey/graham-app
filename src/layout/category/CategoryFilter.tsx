import DarkDropdown from "@/ui/components/DarkDropdown";
import CustomCheckbox from "@/ui/form/CustomCheckBox";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getSubCategoriesOfParentCategoriesApi } from "@/services/categories.services";
import { IBrand, ICategory } from "@/types";
import { getAddWithFiltersThunk } from "@/redux/slices/add";
import { getUserBrandsApi } from "@/services/brand.services";
import RageDoubleSelect from "@/ui/RangeDoubleSelect";
import { ChangeResult } from 'multi-range-slider-react'
import { cn } from "@/utils/styles";
import ReactSlider from "react-slider";
import { formatCurrency } from "@/utils/formatCurrency";
interface Props {
  options: any;
  placeholder: string;
}
interface CheckboxState {
  [id: string]: CheckboxItem;
}

interface CheckboxItem {
  value: boolean;
  label: string;
}
const CategoryFilter = ({
  options,
  placeholder = "All Categories"
}: Props) => {
  const [sliderMinimum, setsliderMinimum] = useState(0)
  const [sliderMaximum, setsliderMaximum] = useState(1000)
  const [sliderState, setsliderState] = useState([0, 1000])
  const [productBrands, setproductBrands] = useState<IBrand[]>([])
  const dispatch = useAppDispatch()
  const ADD_STATE = useAppSelector((s) => s.add)
  const addState = useMemo(() => ADD_STATE, [ADD_STATE])
  const [subCategories, setsubCategories] = useState<ICategory[]>([])

  const handleClearAllFilters = () => {
    dispatch(getAddWithFiltersThunk({ ...addState.filteration, brand: [], sub_category: "" }))
  }
  const GetSubCategories = useCallback(async () => {
    try {
      if (!addState.filteration.category) {
        return;
      }
      const { data } = await getSubCategoriesOfParentCategoriesApi(addState.filteration.category)
      setsubCategories(data)
    } catch (error: any) {

    }
  }, [addState.filteration.category])
  const GetBrands = useCallback(async () => {
    try {
      const { data } = await getUserBrandsApi()
      setproductBrands(data)
    } catch (error: any) {

    }
  }, [])
  useEffect(() => {
    GetSubCategories()
  }, [GetSubCategories])
  useEffect(() => {
    GetBrands()
  }, [GetBrands])
  return (
    <div className="bg-brand_white-500 flex flex-col w-full gap-5">
      <DarkDropdown placeholder={placeholder}
      />
      <div className="bg-white p-3 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="font-Montserrat font-bold ">Filters</h2>
          <span onClick={handleClearAllFilters} className="font-Roboto text-sm text-brand_blue-500 cursor-pointer">
            Clear All
          </span>
        </div>
        <div className="py-4 px-2">
          <h3 className="font-Roboto text-lg font-semibold">Department</h3>
          <h3
            className={`font-Roboto font-medium text-sm text-black`}
          >
            {addState.filteration.category}
          </h3>
          <div>
            {subCategories.map((el, index) => (
              <div className=" cursor-pointer" key={index}>
                <p
                  onClick={() => {
                    const alreadyContain = addState.filteration.sub_category === String(el.name)
                    if (alreadyContain) {
                      dispatch(getAddWithFiltersThunk({ ...addState.filteration, sub_category: "" }))
                    } else {
                      dispatch(getAddWithFiltersThunk({ ...addState.filteration, sub_category: String(el.name) }))
                    }
                  }}
                  className={cn("font-Roboto text-brand_gray-700 ml-2 text-sm mt-1 font-medium", {
                    "font-bold text-black": addState.filteration.sub_category === String(el.name)
                  })}
                >
                  {el.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 flex flex-col gap-2 font-Roboto">
          <h3 className=" text-lg font-semibold">Brand</h3>
          <div className="flex flex-col gap-2">
            {productBrands.map((el, index) => {
              const isChecked = addState.filteration.brand?.includes(el.name) ?? false
              return (
                <CustomCheckbox
                  key={index}
                  text={el.name}
                  isChecked={isChecked}
                  toogle={() => {
                    if (isChecked) {
                      dispatch(getAddWithFiltersThunk({ ...addState.filteration, brand: addState.filteration.brand ? [...addState.filteration.brand?.filter((val) => val !== el.name)] : [] }))
                    } else {
                      dispatch(getAddWithFiltersThunk({ ...addState.filteration, brand: addState.filteration.brand ? [...addState.filteration.brand, el.name] : [el.name] }))

                    }
                  }}
                />
              )
            })}
          </div>
        </div>
        <div className="mt-5">
          <h3 className=" text-lg font-semibold font-Roboto mb-8">Price</h3>
          <div className="px-5">
            <ReactSlider
              className="filter-slider"
              value={[addState.filteration.min_price ?? 0, addState.filteration.max_price ?? 0]}
              ariaLabel={['Lower thumb', 'Upper thumb']}
              ariaValuetext={state => `Thumb value ${state.valueNow}`}
              renderThumb={(props, state) => <div className="" {...props} >
                <div className="relative ">
                  <span className="absolute -top-6">
                    {state.valueNow}
                  </span>
                </div>
              </div>}
              pearling
              min={sliderMinimum}
              max={sliderMaximum}
              minDistance={1}
              onChange={(v) => {
                dispatch(getAddWithFiltersThunk({ ...addState.filteration, min_price: v[0], max_price: v[1] }))
              }}
            />
          </div>
        </div>
        <div className="mt-5 px-5">
          <div className="flex justify-between items-center gap-3">
            <select
              className="border-black outline-none w-full border-2 rounded text-brand_gray-200"
              onChange={(e) => {
                setsliderMinimum(Number(e.target.value))
              }}
            >
              <option selected value={0}>0</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
              <option value={60}>60</option>
              <option value={70}>70</option>
              <option value={80}>80</option>
              <option value={90}>90</option>
              <option value={100}>100</option>
            </select>
            <span className="text-brand_gray-200">to</span>
            <select
              className="border-black outline-none w-full border-2 rounded text-brand_gray-200"
              onChange={(e) => {
                setsliderMaximum(Number(e.target.value))
              }}
            >
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={300}>300</option>
              <option value={400}>400</option>
              <option value={500}>500</option>
              <option value={600}>600</option>
              <option value={700}>700</option>
              <option value={800}>800</option>
              <option value={900}>900</option>
              <option selected value={1000}>1000</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CategoryFilter);

import { useAppSelector } from "@/redux/hooks";
import { URLS } from "@/utils/URLS";
import { useRouter } from "next/navigation";
import React from "react";
import Select from "react-select";
import { OptionType } from "../form/Select";

interface Props {
  placeholder: string;
}
const DarkDropdown = ({
  placeholder = "All Categories",
  ...rest
}: Props) => {
  const router = useRouter()
  const addState = useAppSelector((s) => s.add)
  const categoryState = useAppSelector((s) => s.category)
  return (
    <div className="w-full">
      <Select
        {...rest}
        // @ts-ignore
        onChange={(data: OptionType) => {
          if (!data.value) {
            router.push(URLS.HOME)
          } else {
            router.push(`${URLS.CATEGORY}?cat=${data.value}`)
          }
        }}
        value={addState.filteration.category ? { label: addState.filteration.category, value: addState.filteration.category } : null}
        options={
          categoryState?.parentCategories ?
            [{ value: "", label: "Select category" }, ...categoryState.parentCategories.map((v) => ({ label: v.name, value: v.name }))]
            :
            [{ value: "", label: "Select category" }]
        }
        styles={{
          control: (basicStyles) => ({
            ...basicStyles,
            background: "#000",
            outline: "none",
            color: "white",
          }),
          input: (inputStyles) => ({
            ...inputStyles,
            color: "white",
          }),
          singleValue: (newstyles) => ({
            ...newstyles,
            color: "white",
          }),
          placeholder: (styles) => ({
            ...styles,
            color: "white",
            whiteSpace: "nowrap",
          }),
        }}
        className=" w-full react-cat-select"
        classNamePrefix="react-select-prefix"
        placeholder={placeholder}
        components={{
          IndicatorSeparator: () => null,
          DownChevron: () => <div></div>,
        }}

      />
    </div>
  );
};

export default DarkDropdown;

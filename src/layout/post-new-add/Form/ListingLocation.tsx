import React, { memo } from "react";
import AccountLayout from "../../account";
import Input from "@/ui/form/Input";
import Select from "@/ui/form/Select";
import MapWithLocationOnly from "@/layout/post-new-add/Map";
import { CreateAddFormActionsType } from "@/hooks/useCreateAddForm";
import { OptionType } from "@/ui/components/Dropdown";
import { ICities, germanyCities } from "@/data/germanyCities";
import { countriesData } from "@/data/countriesData";
interface ListingLocationProps extends CreateAddFormActionsType { }
const ListingLocation = (props: ListingLocationProps) => {
  const { values, errors, touched, handleBlur, handleChange, setValues } = props
  return (
    <AccountLayout>
      <div className="flex flex-col w-full h-full lg:flex-row gap-6">
        <div className="w-full flex flex-col  space-y-6">
          <div className="flex flex-col space-y-6">
            <Input
              id="location_street_no_1"
              labelClassName="font-semibold text-sm text-brand_gray-200"
              className="border-brand_blue-500 "
              label="Street, No.1*"
              value={values.location.street_no_1}
              onChange={handleChange}
              name="location.street_no_1"
              onBlur={handleBlur}
              error={errors.location?.street_no_1 && touched.location?.street_no_1 ? errors.location.street_no_1 : ""}
            />
            <Input
              id="location_street_no_2"
              name="location.street_no_2"
              labelClassName="font-semibold text-sm text-brand_gray-200"
              className="border-brand_blue-500 "
              label="Street, No.2*"
              value={values.location.street_no_2}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.location?.street_no_2 && touched.location?.street_no_2 ? errors.location.street_no_2 : ""}
            />
          </div>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Input
              id="location_postcode"
              name="location.postcode"
              labelClassName="font-semibold text-sm text-brand_gray-200"
              className="border-brand_blue-500 "
              label="Postcode*"
              value={values.location.postcode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.location?.postcode && touched.location?.postcode ? errors.location.postcode : ""}
            />
            <Select
              id="location_city"
              name="location.city"
              options={germanyCities.map((el) => ({ ...el, label: el.name, value: el.name }))}
              labelClassName="font-semibold text-sm text-brand_gray-200"
              label="City*"
              className="react-notification-select"
              classNamePrefix="react-select-notification"
              value={{ value: values.location.city, label: values.location.city }}
              onChange={(value: ICities) => {
                setValues((prev) => ({ ...prev, location: { ...prev.location, city: String(value.name), lat: Number(value.coords.lat), long: Number(value.coords.lon) } }))
              }}
              onBlur={handleBlur}
              error={errors.location?.city && touched.location?.city ? errors.location.city : ""}
            />
            <Select
              id="location_country"
              name="location.country"
              labelClassName="font-semibold text-sm text-brand_gray-200"
              options={countriesData}
              label="Country*"
              className="react-notification-select"
              classNamePrefix="react-select-notification"
              value={{ value: values.location.country, label: values.location.country }}
              onChange={(value: OptionType) => {
                setValues((prev) => ({ ...prev, location: { ...prev.location, country: String(value.value) } }))
              }}
              onBlur={handleBlur}
              error={errors.location?.country && touched.location?.country ? errors.location.country : ""}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
            <Input
              id="location_long"
              name="location.long"
              labelClassName="font-semibold text-sm text-brand_gray-200"
              label="Latitude (for Maps Pin Position)"
              className="border-brand_blue-500 "
              value={values.location.long}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.location?.long && touched.location?.long ? errors.location.long : ""}
            />
            <Input
              id="location_lat"
              name="location.lat"
              labelClassName="font-semibold text-sm text-brand_gray-200"
              label="Longitude (for Maps Pin Position)"
              className="border-brand_blue-500"
              value={values.location.lat}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.location?.lat && touched.location?.lat ? errors.location.lat : ""}
            />
          </div>
        </div>
        <div className="w-full h-96 lg:h-6/6 md:pt-5">
          <MapWithLocationOnly {...props} />
        </div>
      </div>
    </AccountLayout>
  );
};

export default memo(ListingLocation);

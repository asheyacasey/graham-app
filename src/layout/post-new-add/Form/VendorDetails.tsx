import { countriesData } from '@/data/countriesData';
import { currencyData } from '@/data/currencyData';
import { germanyCities } from '@/data/germanyCities';
import { CreateAddFormActionsType } from '@/hooks/useCreateAddForm';
import AccountLayout from '@/layout/account';
import { OptionType } from '@/ui/components/Dropdown';
import Input from '@/ui/form/Input';
import Select from '@/ui/form/Select';
import React, { memo } from 'react';
interface VendorDetailsProps extends CreateAddFormActionsType {}
const VendorDetails = (props: VendorDetailsProps) => {
  const { values, errors, touched, handleBlur, handleChange, setValues } =
    props;
  return (
    <div className="space-y-7">
      <h2 className="font-semibold">Vendor details</h2>
      <AccountLayout className="p-7 grid md:grid-cols-2 grid-cols-1 gap-10">
        <Input
          id="vendor_details_name"
          name="vendor_details.name"
          value={values.vendor_details.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            errors.vendor_details?.name && touched.vendor_details?.name
              ? errors.vendor_details?.name
              : ''
          }
          label="Name"
          labelClassName="text-sm font-medium text-brand_gray-200"
          className="border-brand_blue-500 border-[1.5px] "
          placeholder=""
        />
        <Input
          id="vendor_details_phone_number"
          name="vendor_details.phone_number"
          value={values.vendor_details.phone_number}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            errors.vendor_details?.phone_number &&
            touched.vendor_details?.phone_number
              ? errors.vendor_details?.phone_number
              : ''
          }
          label="Phone No"
          labelClassName="text-sm font-medium text-brand_gray-200"
          className="border-brand_blue-500 border-[1.5px] "
          placeholder=""
        />
        <Input
          id="vendor_details_desctiption"
          name="vendor_details.desctiption"
          value={values.vendor_details.desctiption}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            errors.vendor_details?.desctiption &&
            touched.vendor_details?.desctiption
              ? errors.vendor_details?.desctiption
              : ''
          }
          label="Description"
          labelClassName="text-sm font-medium text-brand_gray-200"
          className="border-brand_blue-500 border-[1.5px] "
          placeholder=""
        />
        <Input
          id="vendor_details_street_no_1"
          name="vendor_details.street_no_1"
          value={values.vendor_details.street_no_1}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            errors.vendor_details?.street_no_1 &&
            touched.vendor_details?.street_no_1
              ? errors.vendor_details?.street_no_1
              : ''
          }
          label="Street, No.1*"
          labelClassName="text-sm font-medium text-brand_gray-200"
          className="border-brand_blue-500 border-[1.5px] "
          placeholder=""
        />
        <Input
          id="vendor_details_street_no_2"
          name="vendor_details.street_no_2"
          value={values.vendor_details.street_no_2}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            errors.vendor_details?.street_no_2 &&
            touched.vendor_details?.street_no_2
              ? errors.vendor_details?.street_no_2
              : ''
          }
          label="Street, No.2*"
          labelClassName="text-sm font-medium text-brand_gray-200"
          className="border-brand_blue-500 border-[1.5px] "
          placeholder=""
        />
        <div className="hidden lg:grid lg:grid-cols-3 gap-5">
          <div className="w-full">
            <Input
              id="vendor_details_postcode"
              name="vendor_details.postcode"
              value={values.vendor_details.postcode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.vendor_details?.postcode &&
                touched.vendor_details?.postcode
                  ? errors.vendor_details?.postcode
                  : ''
              }
              label="Postcode*"
              labelClassName="text-sm font-medium text-brand_gray-200"
              className="border-brand_blue-500 border-[1.5px] "
              placeholder=""
            />
          </div>
          <div className="w-full">
            <Select
              id="vendor_details_city"
              name="vendor_details.city"
              label="City*"
              placeholder="City"
              labelClassName="text-sm font-medium text-brand_gray-200"
              options={germanyCities.map((el) => ({
                label: el.name,
                value: el.name,
              }))}
              className="react-notification-select"
              classNamePrefix="react-select-notification"
              value={{
                label: values.vendor_details.city,
                value: values.vendor_details.city,
              }}
              onChange={(data: OptionType) => {
                setValues((prev) => ({
                  ...prev,
                  vendor_details: {
                    ...prev.vendor_details,
                    city: String(data.value),
                  },
                }));
              }}
              onBlur={handleBlur}
              error={
                errors.vendor_details?.city && touched.vendor_details?.city
                  ? errors.vendor_details?.city
                  : ''
              }
            />
          </div>
          <div className="w-full">
            <Select
              id="vendor_details_country"
              name="vendor_details.country"
              label="Country*"
              placeholder="Country"
              labelClassName="text-sm font-medium text-brand_gray-200"
              options={countriesData}
              className="react-notification-select"
              classNamePrefix="react-select-notification"
              value={{
                label: values.vendor_details.country,
                value: values.vendor_details.country,
              }}
              onChange={(data: OptionType) => {
                setValues((prev) => ({
                  ...prev,
                  vendor_details: {
                    ...prev.vendor_details,
                    country: String(data.value),
                  },
                }));
              }}
              onBlur={handleBlur}
              error={
                errors.vendor_details?.country &&
                touched.vendor_details?.country
                  ? errors.vendor_details?.country
                  : ''
              }
            />
          </div>
        </div>
        <div className="w-full lg:hidden">
          <Input
            id="vendor_details_postcode"
            name="vendor_details.postcode"
            value={values.vendor_details.postcode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.vendor_details?.postcode &&
              touched.vendor_details?.postcode
                ? errors.vendor_details?.postcode
                : ''
            }
            label="Postcode*"
            labelClassName="text-sm font-medium text-brand_gray-200"
            className="border-brand_blue-500 border-[1.5px] "
            placeholder=""
          />
        </div>
        <div className="w-full lg:hidden">
          <Select
            id="vendor_details_city"
            name="vendor_details.city"
            label="City*"
            placeholder="City"
            labelClassName="text-sm font-medium text-brand_gray-200"
            options={germanyCities.map((el) => ({
              label: el.name,
              value: el.name,
            }))}
            className="react-notification-select"
            classNamePrefix="react-select-notification"
            value={{
              label: values.vendor_details.city,
              value: values.vendor_details.city,
            }}
            onChange={(data: OptionType) => {
              setValues((prev) => ({
                ...prev,
                vendor_details: {
                  ...prev.vendor_details,
                  city: String(data.value),
                },
              }));
            }}
            onBlur={handleBlur}
            error={
              errors.vendor_details?.city && touched.vendor_details?.city
                ? errors.vendor_details?.city
                : ''
            }
          />
        </div>
        <div className="w-full lg:hidden">
          <Select
            id="vendor_details_country"
            name="vendor_details.country"
            label="Country*"
            placeholder="Country"
            labelClassName="text-sm font-medium text-brand_gray-200"
            options={countriesData}
            className="react-notification-select"
            classNamePrefix="react-select-notification"
            value={{
              label: values.vendor_details.country,
              value: values.vendor_details.country,
            }}
            onChange={(data: OptionType) => {
              setValues((prev) => ({
                ...prev,
                vendor_details: {
                  ...prev.vendor_details,
                  country: String(data.value),
                },
              }));
            }}
            onBlur={handleBlur}
            error={
              errors.vendor_details?.country && touched.vendor_details?.country
                ? errors.vendor_details?.country
                : ''
            }
          />
        </div>
      </AccountLayout>
    </div>
  );
};

export default memo(VendorDetails);

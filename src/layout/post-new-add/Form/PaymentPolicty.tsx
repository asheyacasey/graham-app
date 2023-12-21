import AccountLayout from '@/layout/account';
import React, { memo } from 'react';
import { RadioIcon, RadioIconFill } from '../../../../public/assets/assets/svg';
import Input from '@/ui/form/Input';
import { cn } from '@/utils/styles';
import { CreateAddFormActionsType } from '@/hooks/useCreateAddForm';
import Select from '@/ui/form/Select';
import { OptionType } from '@/ui/components/Dropdown';
import { currencyData } from '@/data/currencyData';
interface PaymentPolictyProps extends CreateAddFormActionsType {}
const PaymentPolicty = (props: PaymentPolictyProps) => {
  const { values, errors, touched, handleBlur, handleChange, setValues } =
    props;
  return (
    <div className="space-y-7 my-5">
      <h2 className="font-semibold">Payment Policy</h2>
      <AccountLayout className="flex flex-col lg:flex-row gap-3 lg:gap-10">
        <div className="space-y-3">
          <label className="text-sm font-semibold">Deposit</label>
          <div className="flex gap-5">
            <RadioButton
              checked={values.payment_policy.deposit ? true : false}
              onChange={() => {
                setValues((prev) => ({
                  ...prev,
                  payment_policy: { ...prev.payment_policy, deposit: true },
                }));
              }}
              title="Yes"
            />
            <RadioButton
              checked={values.payment_policy.deposit ? false : true}
              onChange={() => {
                setValues((prev) => ({
                  ...prev,
                  payment_policy: { ...prev.payment_policy, deposit: false },
                }));
              }}
              title="No"
            />
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Select
            id="payment_policy_rent_type"
            name="payment_policy.rent_type"
            label="Rented Amount Per"
            labelClassName="font-semibold text-sm text-brand_gray-200"
            options={currencyData}
            className="react-notification-select w-full"
            classNamePrefix="react-select-notification"
            value={{
              label: values.payment_policy.rent_type,
              value: values.payment_policy.rent_type,
            }}
            onChange={(data: OptionType) => {
              setValues((prev) => ({
                ...prev,
                payment_policy: {
                  ...prev.payment_policy,
                  rent_type: String(data.value),
                },
              }));
            }}
            onBlur={handleBlur}
            error={
              errors.payment_policy?.rent_type &&
              touched.payment_policy?.rent_type
                ? errors.payment_policy?.rent_type
                : ''
            }
          />
          <Input
            id="payment_policy_amount"
            name="payment_policy.amount"
            value={values.payment_policy.amount}
            onBlur={handleBlur}
            label="Amount"
            error={
              errors.payment_policy?.amount && touched.payment_policy?.amount
                ? errors.payment_policy.amount
                : ''
            }
            onChange={handleChange}
            labelClassName="font-semibold text-sm text-brand_gray-200"
            className=" border-brand_blue-500"
          />
        </div>
      </AccountLayout>
    </div>
  );
};

export default memo(PaymentPolicty);
interface RadioButtonProps {
  checked: boolean;
  onChange: () => void;
  title: string;
}
const RadioButton = ({ checked, onChange, title }: RadioButtonProps) => {
  return (
    <div
      onClick={onChange}
      className={cn('flex items-center gap-3', {
        'border-brand_green-200 ': checked,
        'border-brand_gray-500 bg-transparent': !checked,
      })}
    >
      {checked ? <RadioIconFill /> : <RadioIcon />}
      <h1 className={cn(' text-sm text-black font-semibold font-Montserrat')}>
        {title}
      </h1>
    </div>
  );
};

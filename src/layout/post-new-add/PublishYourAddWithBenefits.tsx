import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import AccountLayout from "../account";
import { IconComponent } from "@/ui/Icon";
import Select from "@/ui/form/Select";
import { CreateAddFormActionsType } from "@/hooks/useCreateAddForm";
import { cn } from "@/utils/styles";
import { getAllUserSubscriptionApi } from "@/services/subscription.services";
import { ISubscription } from "@/types";
import { SubscriptionNameEnum } from "@/utils/enums";
const euroTag = '€'

interface PublishAdActionsProps extends CreateAddFormActionsType {
  editing: boolean
}
const PublishYourAddWithBenefits = (props: PublishAdActionsProps) => {
  const { setValues, values } = props
  const editing = props.editing
  const [subscriptions, setsubscriptions] = useState<ISubscription[]>([])

  const GetAllSubscription = useCallback(async () => {
    try {
      const { data } = await getAllUserSubscriptionApi()
      setsubscriptions(data)
    } catch (error: any) {
    }
  }, [])
  useEffect(() => {
    GetAllSubscription()
  }, [GetAllSubscription])
  const subscriptionData = useMemo(() => {
    const highlightplan = subscriptions.filter((d) => d.name === SubscriptionNameEnum.HIGH_LIGHT_PLAN).map((val) => ({ ...val, label: `${val.duration_in_days} Days`, value: val._id }))
    const pushupplan = subscriptions.filter((d) => d.name === SubscriptionNameEnum.PUSH_UP_PLAN).map((val) => ({ ...val, label: `${val.duration_in_days} Days`, value: val._id }))
    const topplan = subscriptions.filter((d) => d.name === SubscriptionNameEnum.TOP_PLAN).map((val) => ({ ...val, label: `${val.duration_in_days} Days`, value: val._id }))
    return {
      highlightplan,
      pushupplan,
      topplan
    }
  }, [subscriptions])
  console.log(values.plan)
  return (
    <AccountLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className={cn("pt-7 pb-20 bg-white rounded-lg border border-brand_yellow-500", {
          "bg-brand_yellow-500": values.plan.name === SubscriptionNameEnum.PUSH_UP_PLAN
        })}>
          <div className="w-24 h-24 bg-white rounded-10px border border-brand_blue-500 flex items-center justify-center mx-auto">
            <IconComponent
              width={"50"}
              height={"50"}
              name="ArrowUpSpeedIcon"
              className="fill-brand_yellow-400"
            />
          </div>
          <h1 className={cn("text-18px font-semibold text-center mt-7", {
            'text-white': values.plan.name === SubscriptionNameEnum.PUSH_UP_PLAN
          })}>
            Push Up Plan
          </h1>
          <div className="mt-7 w-44 mx-auto">
            <Select
              isDisabled={editing}
              value={values.plan.name === SubscriptionNameEnum.PUSH_UP_PLAN ? { ...values.plan, label: `${values.plan.duration_in_days} Days`, value: values.plan._id } : null}
              onChange={(value: any) => {
                console.log(value)
                setValues((prev) => ({
                  ...prev,
                  plan: {
                    amount: value.amount,
                    duration_in_days: value.duration_in_days,
                    name: value.name,
                  }
                }))
              }}
              options={subscriptionData.pushupplan}
            />
            {
              values.plan.name === SubscriptionNameEnum.PUSH_UP_PLAN &&
              <h1 className="font-semibold text-white text-lg text-center mt-6">
                {euroTag} {values.plan.amount}
              </h1>
            }
          </div>
        </div>
        <div className={cn("pt-7 pb-20 rounded-lg border border-brand_green-600", {
          "bg-brand_green-600": values.plan.name === SubscriptionNameEnum.HIGH_LIGHT_PLAN
        })}>
          <div className="w-24 h-24 bg-white rounded-10px border border-brand_blue-500 flex items-center justify-center mx-auto">
            <IconComponent
              width={"50"}
              height={"50"}
              name="SnowIcon"
              className="fill-brand_green-600"
            />
          </div>
          <h1 className={cn("text-18px font-semibold text-center mt-7", {
            'text-white': values.plan.name === SubscriptionNameEnum.HIGH_LIGHT_PLAN
          })}>
            Highlight Plan
          </h1>
          <div className="mt-7 w-44 mx-auto">
            <Select
              isDisabled={editing}
              value={values.plan.name === SubscriptionNameEnum.HIGH_LIGHT_PLAN ? { ...values.plan, label: `${values.plan.duration_in_days} Days`, value: values.plan._id } : null}
              onChange={(value: any) => {
                console.log(value)
                setValues((prev) => ({
                  ...prev,
                  plan: {
                    amount: value.amount,
                    duration_in_days: value.duration_in_days,
                    name: value.name,
                  }
                }))
              }}
              options={subscriptionData.highlightplan}
            />
            {
              values.plan.name === SubscriptionNameEnum.HIGH_LIGHT_PLAN &&
              <h1 className="font-semibold text-white text-lg text-center mt-6">
                {euroTag} {values.plan.amount}
              </h1>
            }
          </div>
        </div>
        <div className={cn("pt-7 pb-20 bg-white rounded-lg border border-brand_blue-700", {
          'bg-brand_blue-700': values.plan.name === SubscriptionNameEnum.TOP_PLAN
        })}>
          <div className="w-24 h-24 bg-white rounded-10px border border-brand_blue-500 flex items-center justify-center mx-auto">
            <IconComponent width={"50"} height={"50"} name="Start10" />
          </div>
          <h1 className={cn("text-18px font-semibold text-center mt-7", {
            'text-white': values.plan.name === SubscriptionNameEnum.TOP_PLAN
          })}>Top Plan</h1>
          <div className="mt-7 w-44 mx-auto">
            <Select
              isDisabled={editing}
              value={values.plan.name === SubscriptionNameEnum.TOP_PLAN ? { ...values.plan, label: `${values.plan.duration_in_days} Days`, value: values.plan._id } : null}
              onChange={(value: any) => {
                console.log(value)
                setValues((prev) => ({
                  ...prev,
                  plan: value
                }))
              }}
              options={subscriptionData.topplan}
            />
            {
              values.plan.name === SubscriptionNameEnum.TOP_PLAN &&
              <h1 className="font-semibold text-white text-lg text-center mt-6">
                {euroTag} {values.plan.amount}
              </h1>
            }
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default memo(PublishYourAddWithBenefits);

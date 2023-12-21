import { PLANS_ENUM } from "@/layout/post-new-add/utils";
import { OptionType } from "@/ui/components/Dropdown";


export type PlansOptions = OptionType & { price: number, title: PLANS_ENUM }
export const highlightPlans = [
    {
        label: "Select plan",
        value: 0,
        price: 0,
        title: ""
    },
    {
        label: "1 Days",
        value: 1,
        price: 500,
        title: PLANS_ENUM.HIGHLIGHT
    },
] as PlansOptions[]


export const pushUpPlans = [
    {
        label: "Select plan",
        value: 0,
        price: 0,
        title: ""
    },
    {
        label: "7 Days",
        value: 7,
        price: 1500,
        title: PLANS_ENUM.PUSH_UP
    }
] as PlansOptions[]
export const topPlans = [
    {
        label: "Select plan",
        value: 0,
        price: 0,
        title: ""
    },
    {
        label: "15 Days",
        value: 15,
        price: 15000,
        title: PLANS_ENUM.TOP
    },
    {
        label: "30 Days",
        value: 30,
        price: 10000,
        title: PLANS_ENUM.TOP
    },
] as PlansOptions[]
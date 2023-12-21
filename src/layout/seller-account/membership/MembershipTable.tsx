import Button from "@/ui/form/Button";
import { cn } from "@/utils/styles";
import Image from "next/image";
import React from "react";
import {
    ChevDownAltSmall,
    Edit,
    Trash,
} from "../../../../public/assets/assets/svg";

const MemberShipTable = () => {
    return (
        <div className="!w-full mb-8 !overflow-hidden">
            <div className="w-full overflow-x-auto">
                <table
                    className="w-full"
                    style={{
                        borderStyle: "hidden",
                    }}
                >
                    <thead>
                        <tr className=" text-sm font-semibold text-left text-white bg-brand_yellow-500 whitespace-nowrap">
                            <th className="px-4 py-3 rounded-l-10px">Product</th>
                            <th className="px-4 py-3">Membership Type</th>
                            <th className="px-4 py-3 text-center">TImeline</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 rounded-r-10px">Action</th>
                        </tr>
                    </thead>
                    <tbody className="space-y-6">
                        <TableRow />
                        <TableRow />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MemberShipTable;

const TableRow = () => {
    return (
        <>
            <tr className="h-6" />
            <tr className="bg-white ">
                <td className="px-4 py-3 text-sm ">
                    <ProductSection />
                </td>
                <td className="px-4 py-3 text-sm font-Roboto font-medium  text-center">Highlight</td>

                <td className="px-4 py-3 text-sm font-Roboto font-medium text-center">
                    <PeriodSection />
                </td>
                <td className="px-4 py-3 text-sm font-Roboto font-medium  text-center">
                    $100
                </td>
                <td className="px-4 py-3 text-sm font-Montserrat font-semibold  text-center">
                    <span className="flex items-center justify-between bg-brand_white-500 py-2 px-2 rounded-lg">
                        Disable
                        <ChevDownAltSmall />
                    </span>
                </td>
                <td className="px-4 py-3 flex items-center justify-center gap-3 pt-8 rounded-r-lg">

                    <i className="bg-brand_yellow-500 w-8 h-8 flex justify-center items-center rounded-full">
                        <Edit />
                    </i>
                </td>
            </tr>
        </>
    );
};
const ProductSection = () => {
    return (
        <div className="flex items-center gap-4">
            <div className="w-[75px] h-[75px] relative">
                <Image
                    src={"/assets/assets/images/1.png"}
                    alt=""
                    fill
                    className="object-contain"
                />
            </div>
            <div className="space-y-1">
                <h1 className="text-sm font-semibold font-Montserrat leading-[22px]">
                    Morgan Drill Concrete
                </h1>
                <h1 className="text-xs font-Roboto ">
                    <span className="text-brand_gray-200">Category</span> Garden{" "}
                    <span className="text-brand_gray-200">and</span> Sub-Garden
                </h1>
                <h1 className="text-xs font-Roboto ">
                    <span className="text-brand_gray-200">City</span> Berlin
                </h1>
            </div>
        </div>
    );
};
const PeriodSection = () => {
    return (
        <div className="flex items-center justify-center flex-col">
            <h1 className="text-center font-Montserrat font-semibold text-sm">
                15 Days
            </h1>
            <h1 className="text-center text-brand_gray-200 font-Montserrat font-semibold text-sm">
                1st May to 15th May
            </h1>
        </div>
    );
};

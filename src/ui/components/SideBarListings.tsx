import React, { useCallback, useEffect, useState } from "react";
import type { ICategory } from '@/types/index'
import {
  CarTruck,
  ContructionMachinery,
  CordlessDevice,
  Drill,
  DryingHeating,
  ForestMachines,
  GardenTool,
  HandTools,
  KFZTool,
  LifeFramHoist,
  LoaderRollerShutter,
  Machinery,
  MeasuringDevice,
  MetalWood,
  Pump,
} from "../../../public/assets/assets/svg";
import Link from "next/link";
import enData from "../../lang/en.json";
import deData from "../../lang/de.json";
import { getParentCategoriesApi } from "@/services/categories.services";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
const SideBarListings = () => {
  const categoryState = useAppSelector((s) => s.category)
  return (
    <div className="space-y-[2px] flex-1">
      {categoryState?.parentCategories?.map((el, index) => (
        <Link
          href={{ pathname: "/category", query: { cat: el.name } }}
          key={index}
          className="flex items-center px-4 py-4 bg-white first:rounded-t-[10px] space-x-[42px] cursor-pointer"
        >
          {
            el.icon &&
            <Image width={20} height={20} alt="" src={el.icon} className="object-cover" />
          }
          <h1 className="font-Montserrat font-semibold text-sm">{el.name}</h1>
        </Link>
      ))}
    </div>
  );
};

export default SideBarListings;

import React from "react";
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
const data = [
  {
    svg: <Machinery />,
    title: "Agricultural machinery",
  },
  {
    svg: <CarTruck />,
    title: "Car / Truck trailer",
  },
  {
    svg: <CarTruck />,
    title: "Concrete Drill",
  },
  {
    svg: <Drill />,
    title: "Concrete Drill",
  },
  {
    svg: <ContructionMachinery />,
    title: "Construction machinery",
  },
  {
    svg: <CordlessDevice />,
    title: "Cordless Device",
  },
  {
    svg: <DryingHeating />,
    title: "Drying and heating devices",
  },
  {
    svg: <ForestMachines />,
    title: "Foresting machines",
  },
  {
    svg: <GardenTool />,
    title: "Garden tool",
  },
  {
    svg: <HandTools />,
    title: "Hand tools",
  },
  {
    svg: <KFZTool />,
    title: "KFZ tool",
  },
  {
    svg: <LifeFramHoist />,
    title: "Lift frame / hoist",
  },
  {
    svg: <LoaderRollerShutter />,
    title: "Loader & Roller Shutter",
  },
  {
    svg: <MeasuringDevice />,
    title: "Measuring device",
  },
  {
    svg: <Pump />,
    title: "Pump",
  },
  {
    svg: <KFZTool />,
    title: "Rottelplatten & Compaction",
  },
  {
    svg: <MetalWood />,
    title: "Small Appliances for Metal Wood",
  },
];
const SideBarListings = () => {
  return (
    <div className="space-y-[2px]">
      {data.map((el, index) => (
        <Link
          href={{ pathname: "/category", query: { cat: el.title } }}
          key={index}
          className="flex items-center px-4 py-3 bg-white first:rounded-t-[10px] space-x-[42px] cursor-pointer"
        >
          {el.svg}
          <h1 className="font-Montserrat font-semibold text-sm">{el.title}</h1>
        </Link>
      ))}
    </div>
  );
};

export default SideBarListings;

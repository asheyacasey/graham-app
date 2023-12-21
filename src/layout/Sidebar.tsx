'use client';
import React from 'react';
import imglogo from '../../public/assets/assets/logos/Logo-16.png';
import Dropdown, { OptionType } from '../ui/components/Dropdown';
import Image from 'next/image';
import { DISTANCE } from '../mock/options';
import { Location, LocationAlt } from '../../public/assets/assets/svg';
import { useRouter } from 'next/navigation';
import { URLS } from '@/utils/URLS';
import { IconComponent } from '@/ui/Icon';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import ImageWithFallback from '@/ui/ImageWithFallback';
import {
  addSliceInitialState,
  getAddWithFiltersThunk,
} from '@/redux/slices/add';
import { ICities, germanyCities } from '@/data/germanyCities';
import { kilometersData } from '@/data/kilometersData';
interface Props {
  open: boolean;
  close: () => void;
}
const Sidebar = ({ open, close }: Props) => {
  const router = useRouter();
  const authState = useAppSelector((s) => s.auth);
  const addState = useAppSelector((s) => s.add);
  const categoryState = useAppSelector((s) => s.category);
  const dispatch = useAppDispatch();
  return (
    <div
      className={`fixed inset-y-0 w-full md:w-[50%]  !overflow-hidden z-50  bg-[#F1F1F5] transition-transform duration-300 transform flex lg:hidden
       ${open ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="flex flex-col items-center w-full  p-5">
        <div className="flex items-center justify-between gap-5 w-full">
          <Image
            height={80}
            width={80}
            src={'/assets/assets/logos/Logo-16.png'}
            alt="logo"
            onClick={() => {
              router.push(URLS.HOME);
            }}
          />
          <div className="flex flex-row-reverse items-center gap-5">
            <IconComponent
              name="CrossContainedIcon"
              onClick={close}
              className="cursor-pointer"
            />
            {authState.isLoggedIn ? (
              <ImageWithFallback
                className="h-12 w-12 rounded-full cursor-pointer"
                onClick={() => {
                  router.push(URLS.PROFILE);
                }}
                alt=""
                src={authState.user?.profile_image}
              />
            ) : (
              <h3
                onClick={() => {
                  router.push(URLS.LOGIN);
                }}
                className="font-semibold cursor-pointer"
              >
                Login
              </h3>
            )}
            <button
              onClick={() => {
                router.push(URLS.POST_NEW_AD);
              }}
              className="bg-[#FFC10E] text-white px-5 py-2 rounded-lg font-medium"
            >
              Post Ad
            </button>
          </div>
        </div>
        <div className="overflow-auto h-full w-full gap-5 flex flex-col pt-5">
          <Dropdown
            Icon={<Location />}
            value={
              addState.filteration.city
                ? {
                  label: addState.filteration.city,
                  value: addState.filteration.city,
                }
                : null
            }
            options={[
              { value: '', label: 'Select cities' },
              ...germanyCities.map((v) => ({
                ...v,
                label: v.name,
                value: v.name,
              })),
            ]}
            placeholder={'All Germany'}
            onChange={(data: ICities) => {
              close();
              dispatch(
                getAddWithFiltersThunk({
                  ...addSliceInitialState.filteration,
                  city: data.name,
                  lat: data?.coords?.lat ?? '',
                  long: data?.coords?.lon ?? '',
                })
              );
            }}
          />
          <Dropdown
            disable
            value={
              addState.filteration.kilometers
                ? {
                  label: `${addState.filteration.kilometers} Km`,
                  value: addState.filteration.kilometers,
                }
                : null
            }
            Icon={<LocationAlt />}
            options={[
              { value: '', label: 'Select distance' },
              ...kilometersData,
            ]}
            placeholder={'Distance'}
            onChange={(data: OptionType) => {
              close();
              if (addState.filteration.city) {
                dispatch(
                  getAddWithFiltersThunk({
                    kilometers: Number(data.value),
                    brand: [],
                    searchText: '',
                    category: '',
                  })
                );
              }
            }}
          />
          <Dropdown
            Icon={null}
            value={
              addState.filteration.category
                ? {
                  label: addState.filteration.category,
                  value: addState.filteration.category,
                }
                : null
            }
            options={
              categoryState?.parentCategories ?
                [
                  { value: '', label: 'Select category' },
                  ...categoryState.parentCategories.map((v) => ({
                    label: v.name,
                    value: v.name,
                  })),
                ] :
                [
                  { value: '', label: 'Select category' }
                ]
            }
            placeholder={'All Categories'}
            onChange={(data: OptionType) => {
              close();
              if (!data.value) {
                router.push(URLS.HOME);
              } else {
                router.push(`${URLS.CATEGORY}?cat=${data.value}`);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;

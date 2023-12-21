'use client';
import React, { useMemo } from 'react';
import {
  Bell,
  Cart,
  Location,
  LocationAlt,
  Logo,
  Search,
} from '../../public/assets/assets/svg';
import imglogo from '../../public/assets/assets/logos/Logo-16.png';
import { HiBars3, HiLanguage } from 'react-icons/hi2';
import Dropdown, { OptionType } from '../ui/components/Dropdown';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { URLS } from '@/utils/URLS';
import Link from 'next/link';
import Button from '@/ui/form/Button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IconComponent } from '@/ui/Icon';
import { ICities, germanyCities } from '@/data/germanyCities';
import {
  addSliceInitialState,
  getAddWithFiltersThunk,
} from '@/redux/slices/add';
import { kilometersData } from '@/data/kilometersData';
import ImageWithFallback from '@/ui/ImageWithFallback';
import { Badge } from '@mui/material';
import LangSelect from '@/lang/LangSelect';

const Navbar = ({ toggleSideBard = () => { } }) => {
  const authState = useAppSelector((s) => s.auth);
  const addState = useAppSelector((s) => s.add);
  const categoryState = useAppSelector((s) => s.category);
  const cartState = useAppSelector((s) => s.cart);
  const notificationState = useAppSelector((s) => s.notifications)
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isNewNotification = useMemo(() => {
    const notSeenNotification = notificationState.notifications.find((noti) => noti.seen === false)
    return notSeenNotification ? true : false
  }, [notificationState.notifications])
  return (
    <div className={`relative`}>
      <nav className="px-5 hidden  py-4 bg-[#FEFEFE] justify-between border-b-[1.5px] lg:flex gap-5 items-center">
        <div className="flex flex-row w-9/12 items-center gap-5">
          <Link
            href={URLS.HOME}
            className="cursor-pointer"
          >
            <Logo />
          </Link>
          <div className="flex gap-1 w-full">
            <div className="w-8/12 flex items-center gap-1">
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
            </div>
            <div className="flex items-center bg-[#F6F7FB] rounded-lg gap-1 w-8/12 pr-2">
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
                    ]
                    :
                    [
                      { value: '', label: 'Select category' }
                    ]
                }
                placeholder={'All Categories'}
                onChange={(data: OptionType) => {
                  if (!data.value) {
                    router.push(URLS.HOME);
                  } else {
                    router.push(`${URLS.CATEGORY}?cat=${data.value}`);
                  }
                }}
              />
              <div className="w-[2px] h-8 bg-black"></div>
              <input
                value={addState.filteration.searchText}
                onChange={async (e) => {
                  dispatch(
                    getAddWithFiltersThunk({
                      ...addState.filteration,
                      searchText: e.target.value,
                    })
                  );
                }}
                placeholder={'Search in all germany'}
                className="bg-[#F6F7FB] pl-2 outline-none w-10/12 text-sm text-[#92929D]"
              />
              <i>
                <Search />
              </i>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5 justify-between w-4/12 mnts">
          <div className="flex items-center gap-3">
            <i
              className="cursor-pointer"
              onClick={() => {
                router.push(URLS.NOTIFICATION);
              }}
            >
              {
                isNewNotification ?
                  <Badge
                    color="error"
                    variant="dot"
                    overlap="circular"
                    badgeContent="12"
                  >
                    <Bell width={24} height={24} />
                  </Badge>
                  :
                  <Bell width={24} height={24} />
              }
            </i>
            <Link href={URLS.CART} className="">
              <Badge badgeContent={cartState.cartItems.length} color="error">
                <Cart width={24} height={24} />
              </Badge>
            </Link>
          </div>
          <LangSelect />
          {authState.isLoggedIn ? (
            <>
              <ImageWithFallback
                onClick={() => {
                  router.push(URLS.PROFILE);
                }}
                className="h-12 w-12 rounded-full cursor-pointer"
                src={authState.user?.profile_image}
                alt=""
              />
            </>
          ) : (
            <h1
              onClick={() => {
                router.push(URLS.LOGIN);
              }}
              className="font-semibold cursor-pointer"
            >
              Login
            </h1>
          )}

          <Button
            onClick={() => {
              router.push(URLS.POST_NEW_AD);
            }}
            className="bg-[#FFC10E] text-white w-32 border-none px-5 py-2 rounded-lg font-medium"
          >
            Post Ad
          </Button>
        </div>
      </nav>
      <nav className="flex lg:hidden gap-2 w-full items-center py-1 bg-[#FEFEFE] justify-between border-b-[1.5px] pr-2">
        <div className="flex flex-row w-9/12 items-center gap-5">
          <div
            onClick={() => {
              router.push(URLS.HOME);
            }}
            className="cursor-pointer"
          >
            <Image
              className="cursor-pointer"
              width={80}
              height={80}
              src={imglogo}
              alt="logo"
            />
          </div>
          <LangSelect />
          <div className="flex items-center bg-[#F6F7FB] justify-between rounded-lg gap-1 w-full pr-2">
            <input
              value={addState.filteration.searchText}
              onChange={async (e) => {
                dispatch(
                  getAddWithFiltersThunk({
                    ...addState.filteration,
                    searchText: e.target.value,
                  })
                );
              }}
              placeholder="Search in all germany"
              className="bg-[#F6F7FB] pl-2 rounded-l-lg outline-none py-2 w-10/12 text-sm text-[#92929D]"
            />
            <i>
              <Search />
            </i>
          </div>
        </div>
        <div className="flex flex-row w-3/12 items-center justify-between">
          <i
            onClick={() => {
              router.push(URLS.NOTIFICATION);
            }}
          >
            <Badge
              color="error"
              variant="dot"
              overlap="circular"
              badgeContent=" "
            >
              <Bell />
            </Badge>
          </i>
          <Link className="cursor-pointer" href={URLS.CART}>
            <Badge badgeContent={cartState.cartItems.length} color="error">
              <Cart />
            </Badge>
          </Link>
          <i onClick={toggleSideBard}>
            <HiBars3 size={19} color="#92929D" className="cursor-pointer" />
          </i>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;

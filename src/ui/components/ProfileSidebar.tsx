import React from "react";
import {
  AccountProfile,
  BellAlt,
  Case,
  Document,
  Lock,
  Logout,
  PaymentCards,
  Profile,
} from "../../../public/assets/assets/svg";
import { cn } from "@/utils/styles";
import { usePathname, useRouter } from "next/navigation";
import { URLS } from "@/utils/URLS";
import { useAppDispatch } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/auth";

interface Props {
  handleItemClick?: (index: number) => void;
  item?: null | number;
  className?: string;
}
const ProfileSidebar = ({
  handleItemClick = () => { },
  item,
  className,
}: Props) => {
  const dispatch = useAppDispatch()
  const pathname = usePathname();
  const router = useRouter();
  const data = [
    {
      svg: <Profile />,
      title: "Profile Information",
      pathname: URLS.PROFILE,
      prefixURL: URLS.PROFILE,
    },
    {
      svg: <Lock />,
      title: "Change Password",
      pathname: URLS.CHANGE_PASSWORD,
      prefixURL: URLS.CHANGE_PASSWORD,
    },
    {
      svg: <Document />,
      title: "Documents",
      pathname: URLS.DOCUMENT,
      prefixURL: URLS.DOCUMENT,
    },
    {
      svg: <Case />,
      title: "Seller Account",
      prefixURL: "seller-account",
      pathname: URLS.SELLER_ACCOUNT_LISTING,
    },
    {
      svg: <AccountProfile />,
      title: "Buyer Account",
      prefixURL: "buyer-account",
      pathname: URLS.BUYER_ACCOUNT_ORDERS,
    },
    {
      svg: <PaymentCards />,
      title: "Payments",
      prefixURL: "payments",
      pathname: URLS.PAYMENTS,
    },
    {
      svg: <BellAlt />,
      title: "Notifications",
      prefixURL: "notification-setting",
      pathname: URLS.NOTIFICATION_SETTING,
    },
    {
      svg: <Logout />,
      title: "Logout",
      action: () => {
        dispatch(logoutAction())
        router.push(URLS.HOME)
      }
    },
  ] as {
    svg: React.ReactElement;
    title: string;
    prefixURL?: string;
    pathname?: string;
    action?: () => void
  }[];


  return (
    <div className={cn("space-y-[2px]", className)}>
      {data.map((el, index) => (
        <div
          key={index}
          onClick={() => {
            handleItemClick(index);
            if (el.action) {
              el.action()
            }
            if (el.pathname) {
              router.push(el.pathname);
            }
          }}
          className={cn(
            `flex items-center px-4 py-3  last:rounded-b-[10px] first:rounded-t-[10px] space-x-[42px] cursor-pointer bg-white`,
            {
              "bg-brand_yellow-500":
                el.prefixURL && pathname.includes(el.prefixURL),
            }
          )}
        >
          <div className="w-4">
            {React.cloneElement(el.svg, {
              color:
                el.prefixURL && pathname.includes(el.prefixURL)
                  ? "#fff"
                  : "#000",
            })}
          </div>
          <h1
            className={cn("font-Montserrat font-semibold text-sm", {
              "text-white": el.prefixURL && pathname.includes(el.prefixURL),
            })}
          >
            {el.title}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default ProfileSidebar;

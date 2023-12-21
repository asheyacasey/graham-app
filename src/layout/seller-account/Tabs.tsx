import { IconComponent } from "@/ui/Icon";
import { cn } from "@/utils/styles";
import React, { useEffect } from "react";
import * as AllIcons from "@/ui/Icon/all-icons";
import { usePathname, useRouter } from "next/navigation";
import { URLS } from "@/utils/URLS";
import {
  AnalyticsIcon,
  Box,
  BoxSmall,
  Case,
  CaseSmall,
  Chat,
  Invoice,
} from "../../../public/assets/assets/svg";
type TItem = {
  title: string;
  icon: any;
  pathname: string;
};
const data: TItem[] = [
  {
    icon: <AnalyticsIcon />,
    title: "Analytics",
    pathname: URLS.SELLER_ACCOUNT_ANALYTICS,
  },
  {
    icon: <CaseSmall />,
    title: "MyListing",
    pathname: URLS.SELLER_ACCOUNT_LISTING,
  },
  {
    icon: <BoxSmall />,
    title: "Orders",
    pathname: URLS.SELLER_ACCOUNT_ORDERS,
  },
  {
    icon: <Invoice />,
    title: "Plan Invoices",
    pathname: URLS.SELLER_ACCOUNT_INVOICE,
  },
  {
    icon: <Invoice />,
    title: "Membership",
    pathname: URLS.SELLER_ACCOUNT_MEMBERSHIP,
  },
];
const Tabs = () => {
  const pathname = usePathname();
  const router = useRouter();
  console.log(pathname);
  useEffect(() => {
    if (pathname) {
      const selectedElement = window.document.querySelector(".selected-tab");
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  }, [pathname]);
  return (
    <div className="flex items-center w-full gap-4 overflow-auto scrollbar-hide">
      {data.map((el, index) => (
        <div
          onClick={() => {
            router.push(el.pathname);
          }}
          key={index}
          className={cn(
            `cursor-pointer lg:w-60 bg-white rounded-10px px-5 py-3 flex items-center gap-2 `,
            {
              "bg-black selected-tab":
                el.pathname && pathname.includes(el.pathname),
            }
          )}
        >
          {React.cloneElement(el.icon, {
            color:
              el.pathname && pathname.includes(el.pathname) ? "#fff" : "#000",
          })}
          <h1
            className={cn("text-xs font-semibold whitespace-nowrap", {
              "text-white": el.pathname && pathname.includes(el.pathname),
            })}
          >
            {el.title}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Tabs;

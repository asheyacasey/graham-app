import { IconComponent } from "@/ui/Icon";
import { cn } from "@/utils/styles";
import React, { useEffect } from "react";
import * as AllIcons from "@/ui/Icon/all-icons";
import { usePathname, useRouter } from "next/navigation";
import { URLS } from "@/utils/URLS";
type TItem = {
  title: string;
  icon: keyof typeof AllIcons;
  pathname: string;
};
const data: TItem[] = [
  {
    icon: "BoxIcon",
    title: "Orders",
    pathname: URLS.BUYER_ACCOUNT_ORDERS,
  },
  {
    icon: "InvoiceIcon",
    title: "Invoices",
    pathname: URLS.BUYER_ACCOUNT_INVOICE,
  },
  {
    icon: "AnalyticsIcon",
    title: "Analytics",
    pathname: URLS.BUYER_ACCOUNT_ANALYTICS,
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
    <div className="flex items-center gap-4 overflow-auto scrollbar-hide">
      {data.map((el, index) => (
        <div
          onClick={() => {
            router.push(el.pathname);
          }}
          key={index}
          className={cn(
            `cursor-pointer lg:w-40 bg-white rounded-10px px-5 py-3 flex items-center gap-4`,
            {
              "bg-black selected-tab":
                el.pathname && pathname.includes(el.pathname),
            }
          )}
        >
          <IconComponent
            name={el.icon}
            width={"20"}
            height={"20"}
            className={cn("", {
              "fill-white": el.pathname && pathname.includes(el.pathname),
            })}
          />
          <h1
            className={cn("text-xs font-semibold", {
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

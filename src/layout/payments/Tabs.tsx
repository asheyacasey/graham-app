import { cn } from '@/utils/styles';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { URLS } from '@/utils/URLS';
import {
  AccountProfileSmall,
  CaseSmall,
} from '../../../public/assets/assets/svg';
import { AiOutlineHistory } from 'react-icons/ai'
import { getCookie } from 'cookies-next';
type TItem = {
  title: string;
  icon: any;
  pathname: string;
};
const data: TItem[] = [
  {
    icon: <CaseSmall />,
    title: 'My Bank Accounts',
    pathname: URLS.PAYMENTS,
  },
  {
    icon: <AccountProfileSmall />,
    title: 'Seller Payouts',
    pathname: URLS.PAYOUT_ITEMS_SELLER,
  },
  {
    icon: <AccountProfileSmall />,
    title: 'Refund Security Fesses',
    pathname: URLS.PAYOUT_ITEMS_BUYER,
  },
  {
    icon: <AiOutlineHistory />,
    title: 'History',
    pathname: URLS.PAYOUT_ITEMS_HISTORY,
  },
];
const Tabs = () => {
  const pathname = usePathname();
  const router = useRouter();
  console.log(pathname);
  const cookieValue = getCookie('googtrans');
  useEffect(() => {
    if (pathname) {
      const selectedElement = window.document.querySelector(".selected-tab");
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "instant",
          block: "center",
          inline: "center",
        });
      }
    }
  }, [pathname]);
  return (
    <div className="flex items-center gap-4 overflow-auto">
      {data.map((el, index) => (
        <div
          onClick={() => {
            router.push(el.pathname);
          }}
          key={index}
          className={cn(
            'cursor-pointer  bg-white rounded-10px px-5 py-3 flex items-center gap-2 w-max',
            {
              'bg-black selected-tab': el.pathname && pathname.includes(el.pathname)
            }
          )}
        >
          {React.cloneElement(el.icon, {
            color:
              el.pathname && pathname.includes(el.pathname) ? '#fff' : '#000',
          })}
          <h1
            className={cn('text-xs font-semibold flex-nowrap whitespace-nowrap', {
              'text-white': el.pathname && pathname.includes(el.pathname),
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

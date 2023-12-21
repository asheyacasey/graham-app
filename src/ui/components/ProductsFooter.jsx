import React from 'react';
import {
  HeadPhone,
  Money,
  PaymentCard,
  Shipping,
} from '../../../public/assets/assets/svg';
import Image from 'next/image';

const ProductsFooter = () => {
  return (
    <div className="py-[20px] px-[21px] bg-[#FFC10E] rounded-lg flex items-center gap-16 flex-col lg:flex-row">
      <div className="flex items-center gap-5 mx-auto flex-col lg:flex-row">
        <Image
          height={60}
          width={60}
          className="object-contain"
          src={'/assets/assets/images/why.png'}
          alt="product"
        />
        <button className="rounded-xl text-center p-2 bg-white text-black font-semibold text-xs whitespace-nowrap">
          Know More
        </button>
      </div>
      <div className="flex items-center justify-center gap-5 ml-2 lg:flex-nowrap flex-wrap">
        <div>
          <Shipping className="mx-auto mb-3" height="20" width="20" />
          <h1 className="text-center text-[#161D25] text-sm font-semibold">
            Free Shipping
          </h1>
          <h1 className="text-center text-[#5A7184] text-xs mt-1">
            Free delivery for all orders
          </h1>
        </div>
        <div>
          <Money className="mx-auto mb-3" height="20" width="20" />
          <h1 className="text-center text-[#161D25] text-sm font-semibold">
            Money Guarantee
          </h1>
          <h1 className="text-center text-[#5A7184] text-xs mt-1">
            30 days money back
          </h1>
        </div>
        <div>
          <HeadPhone className="mx-auto mb-3" height="20" width="20" />
          <h1 className="text-center text-[#161D25] text-sm font-semibold">
            24/7 Support
          </h1>
          <h1 className="text-center text-[#5A7184] text-xs mt-1">
            Friendly 24/7 support
          </h1>
        </div>
        <div>
          <PaymentCard className="mx-auto mb-3" height="20" width="20" />
          <h1 className="text-center text-[#161D25] text-sm font-semibold">
            Secure Payment
          </h1>
          <h1 className="text-center text-[#5A7184] text-xs mt-1">
            All cards accepted
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProductsFooter;

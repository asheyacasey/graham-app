/* eslint-disable @next/next/no-img-element */
'use client';
import AccountLayout from '@/layout/account';
import Common from '@/templates/Common';
import BreadCrumbs from '@/ui/BreadCrumbs';
import Button from '@/ui/form/Button';
import { URLS } from '@/utils/URLS';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const PostAd = () => {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <Common>
      <Button onClick={() => router.push(URLS.POST_NEW_AD)} className="w-64">
        Place an Ad
      </Button>
      <div>
        <BreadCrumbs
          data={[{ title: 'Home', route: URLS.HOME }, { title: 'Post add' }]}
        />
        <AccountLayout className="flex flex-col gap-20 justify-center items-center">
          <img
            width={300}
            height={300}
            src={'/assets/assets/images/ad.png'}
            alt="ad"
          />
        </AccountLayout>
      </div>
    </Common>
  );
};

export default PostAd;

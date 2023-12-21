import { cn } from '@/utils/styles';
import React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const AccountLayout = ({ children, className }: Props) => {
  return (
    <div className={cn('w-full rounded-10px p-5 bg-white', className)}>
      {children}
    </div>
  );
};

export default AccountLayout;

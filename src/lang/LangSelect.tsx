/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { HiLanguage } from 'react-icons/hi2';
import { LANGUAGES } from '@/mock/options';
const LangSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const langChange = (e: string) => {
    if (hasCookie('googtrans')) {
      setCookie('googtrans', decodeURI(e));
    } else {
      setCookie('googtrans', e);
    }
    window.location.reload();
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const dropdownRef = useRef<any>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="relative" ref={dropdownRef}>
      <HiLanguage
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute top-7 -left-7 z-20 bg-brand_green-50 rounded-xl px-4 py-2">
          {LANGUAGES.map((el, index) => (
            <ul key={index}>
              <li
                className="cursor-pointer text-sm text-brand_gray-800 font-Montserrat font-medium"
                onClick={() => langChange(el.value)}
              >
                {el.label}
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default LangSelect;

'use client'
import React, { useEffect } from 'react';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import Script from 'next/script';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
const TranslateWrapper = () => {
  const googleTranslateElementInit = () => {
    //@ts-ignore
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'auto',
        autoDisplay: false,
        includedLanguages: 'de,en',
        // @ts-ignore
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element'
    );
  };
  useEffect(() => {
    if (!hasCookie('googtrans')) {
      setCookie('googtrans', decodeURI('/auto/de'));
    }
    if (hasCookie('googtrans')) {
      const cookieValue = getCookie('googtrans');
      console.log('Cookie Value:', cookieValue); // Debugging
    }
    // @ts-ignore
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return <>
    <ProgressBar
      height="4px"
      color="#FFC10E"
      options={{ showSpinner: false }}
      shallowRouting
    />
    <Script
      type="text/javascript"
      src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    />
  </>;
};

export default TranslateWrapper;

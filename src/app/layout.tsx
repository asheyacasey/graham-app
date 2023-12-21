import ReduxProvider from '@/providers/ReduxProvider';
import './globals.css';
import type { Metadata } from 'next';
import ReactToastProvider from '@/providers/ReactToastProvider';
import RootDataFetchProvider from '@/providers/RootDataFetchProvider';
import BackDropProvider from '@/providers/BackDropProvider';
import TranslateWrapper from '@/lang/TranslateWrapper';


export const metadata: Metadata = {
  title: 'Graham',
  description: 'Graham app buy it now',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="google_translate_element">
        <TranslateWrapper />
        <ReactToastProvider>
          <ReduxProvider>
            <RootDataFetchProvider>
              <BackDropProvider>{children}</BackDropProvider>
            </RootDataFetchProvider>
          </ReduxProvider>
        </ReactToastProvider>
      </body>
    </html>
  );
}

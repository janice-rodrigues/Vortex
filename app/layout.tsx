import type { ReactNode } from 'react';
import Script from 'next/script';
import { Inter } from 'next/font/google';

import './styles.css';

import { SiteFooter } from './site/SiteFooter';
import { SiteNavbar } from './site/SiteNavbar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteNavbar />

        <main>{children}</main>

        <SiteFooter />

        {/* Client-side: menu toggle, dropdowns, filters */}
        <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}


import type { ReactNode } from 'react';
import Script from 'next/script';

import '../styles.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Legacy client-side behaviors (menu, filters, year, animations) */}
        <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}


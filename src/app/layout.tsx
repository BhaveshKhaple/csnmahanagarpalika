import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'छत्रपती संभाजीनगर महानगरपालिका (CSMC)',
  description: 'छत्रपती संभाजीनगर महानगरपालिका - आपल्या शहराच्या विकासासाठी',
  keywords: ['CSMC', 'Chhatrapati Sambhajinagar', 'Municipal Corporation', 'Maharashtra'],
  authors: [{ name: 'CSMC' }],
  openGraph: {
    title: 'छत्रपती संभाजीनगर महानगरपालिका',
    description: 'छत्रपती संभाजीनगर महानगरपालिका - आपल्या शहराच्या विकासासाठी',
    type: 'website',
    locale: 'mr_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr" className={inter.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var size = localStorage.getItem('csmc-font-size');
                if (size === 'small') {
                  document.documentElement.style.fontSize = '90%';
                } else if (size === 'large') {
                  document.documentElement.style.fontSize = '110%';
                } else {
                  document.documentElement.style.fontSize = '100%';
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-marathi antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | छत्रपती संभाजीनगर महानगरपालिका',
    default: 'छत्रपती संभाजीनगर महानगरपालिका (CSMC)',
  },
  description:
    'छत्रपती संभाजीनगर महानगरपालिकेच्या नागरी सेवा — मालमत्ता कर, पाणीपट्टी, तक्रार, प्रमाणपत्रे आणि अधिक.',
  openGraph: {
    siteName: 'CSMC — छत्रपती संभाजीनगर महानगरपालिका',
    locale: 'mr_IN',
  },
};

/**
 * Public layout — no authentication required.
 * All pages under (public)/ are served without any login check.
 * Auth-protected routes remain under /citizen, /admin, /officer.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

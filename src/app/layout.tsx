import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Since next-intl provides the document in `[locale]/layout.tsx`,
// this root layout only needs to provide a minimal shell
export default function RootLayout({ children }: Props) {
  return children;
}

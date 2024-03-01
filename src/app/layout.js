import './globals.scss';
import { Providers } from './providers';

export const metadata = {
  title: 'SUPCON WMS',
  description: 'SUPCON WMS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="ml-12">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

import './globals.scss';
import Providers from './providers';
import { ThemeProvider } from '@/utils/ThemeContext';
export const metadata = {
  title: 'SUPCON WMS',
  description: 'SUPCON WMS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Providers>
            <div className="ml-12">{children}</div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

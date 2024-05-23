import './globals.scss';
import Providers from './providers';
import { ThemeProvider } from '@/utils/ThemeContext';
import { sysTitle, sysSubTitle } from '@/utils/constants';

export const metadata = {
  title: sysTitle,
  description: sysSubTitle,
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

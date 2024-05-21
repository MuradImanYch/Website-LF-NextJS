import "./globals.css";
import { Roboto } from 'next/font/google';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';

const roboto = Roboto({
  subsets: ['cyrillic'],
  weight: ['100', '300', '400', '500', '700', '900']
});

export const metadata = {
  title: 'ewf',
  description: 'w',
  keywords: 'wdw'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="container">
          <Navigation />
          <div className="headerMain">
            <Header />
            <main>
              <div className="wrap">
              {children}
              </div>
            </main>
          </div>
        </div>
        <script src="https://kit.fontawesome.com/5f439b4246.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}

import "./globals.css";
import { Roboto } from 'next/font/google';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';
import Providers from "@/redux/Provider";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  subsets: ['cyrillic'],
  weight: ['100', '300', '400', '500', '700', '900']
});

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <Providers>
          <div className="container">
            <Navigation />
            <div className="headerMain">
              <Header />
              <main>
                <div className="wrap">
                {children}
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </Providers>
        <script src="https://kit.fontawesome.com/5f439b4246.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}

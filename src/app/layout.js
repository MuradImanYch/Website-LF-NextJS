import "./globals.css";
import { Roboto } from 'next/font/google';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';
import Providers from "@/redux/Provider";

const roboto = Roboto({
  subsets: ['cyrillic'],
  weight: ['100', '300', '400', '500', '700', '900']
});

export const metadata = {
  title: 'Актуальные новости, турнирная таблица, прямые трансляции матчей, результаты встреч и много другое',
  description: 'Новости футбола, бесплатные трансляции матчей, подробные результаты и все, что нужно знать о мире футбола.',
  keywords: 'трансляции матчей, смотреть футбол, legfootball главная, ожидаемые матчи, завершенные матчи, таблица уефа, таблица фифа, новости футбола, онлайн трансляция, футбол снг',
  robots: 'noindex, nofollow'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
            </div>
          </div>
        </Providers>
        <script src="https://kit.fontawesome.com/5f439b4246.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}

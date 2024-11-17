import "./globals.css";
import { Roboto } from 'next/font/google';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';
import Providers from "@/redux/Provider";
import Footer from "@/components/Footer/Footer";
import Script from 'next/script';

export const metadata = {
  other: {
    'google-adsense-account': 'ca-pub-9748273078203330', // Google AdSense ID
  }
};

const roboto = Roboto({
  subsets: ['cyrillic'],
  weight: ['100', '300', '400', '500', '700', '900']
});

export default function RootLayout({ children }) {
  return (
    <html>
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

        {/* Подключение скрипта для FontAwesome */}
        <Script
          src="https://kit.fontawesome.com/5f439b4246.js"
          crossOrigin="anonymous"
          strategy="afterInteractive" 
        />

        {/* Подключение Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9748273078203330"
          crossOrigin="anonymous"
        />

        {/* Подключение Яндекс.Метрики */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){
                (m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,
                a.parentNode.insertBefore(k,a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(94533561, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
          }}
        />

        {/* Подключение Google Analytics через Google Tag Manager */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-WE50N9C89M"
          async
        />
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WE50N9C89M');
            `,
          }}
        />
      </body>
    </html>
  );
}
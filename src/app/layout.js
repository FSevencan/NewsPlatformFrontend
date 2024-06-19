import '@fortawesome/fontawesome-free/css/all.min.css';
import "@icon/themify-icons/themify-icons.css"
import { Cormorant_Garamond, Roboto, Source_Sans_3 } from 'next/font/google'

import ImportJs from '@/components/ltr/import-js/import-js';
import Providers from './theme-providers';
import StyleSelectors from '@/components/rtl/style-selector/style-selector';



{/* *** START FONT DECLARATION *** */ }
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant-garamond',
})
export const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900',],
  variable: '--font-roboto',
})
export const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source-sans',
})
export const metadata = {
  title: 'Haber Platformu',
  description: 'Güncel, doğru ve tarafsız haberler ',
  icons: {
      icon: ['/favicon-32x32.png'],
    apple: ['/apple-icon.png'],
    shortcut: ['/android-icon-192x192.png']
  }
}
{/*  END OF /. FONT DECLARATION */ }
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ImportJs />
      <body className={`${cormorant.variable} ${roboto.variable} ${sourceSans.variable}`}>
        <Providers>  
          {children}
          <StyleSelectors/>
        </Providers>


      </body>
    </html>
  )
}

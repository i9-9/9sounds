import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import { PiecesProvider } from "./context/PiecesContext";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-mono",
});

const helveticaNowDisplay = localFont({
  src: [
    {
      path: '../public/fonts/HelveticaNowDisplay-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/HelveticaNowDisplay-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/HelveticaNowDisplay-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/HelveticaNowDisplay-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/HelveticaNowDisplay-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/HelveticaNowDisplay-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/HelveticaNowDisplay-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/HelveticaNowDisplay-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-helvetica-now-display',
});

export const metadata: Metadata = {
  title: "Sounds",
  description: "A sound exploration app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.variable} ${helveticaNowDisplay.variable}`}>
        <PiecesProvider>
          {children}
        </PiecesProvider>
      </body>
    </html>
  );
}

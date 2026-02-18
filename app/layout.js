export const metadata = {
  title: "Gear Guide – Video Gear Reviews from a 15-Year Broadcast Engineer",
  description: "Honest video gear reviews by Andrew Disbrow — 15 years broadcast engineering, Blackmagic Design reseller. Cameras, lighting, audio, ATEM switchers. No fluff, no templates.",
  metadataBase: new URL('https://video-tools-affiliate.vercel.app'),
  alternates: {
    canonical: 'https://video-tools-affiliate.vercel.app',
  },
  openGraph: {
    title: 'Gear Guide – Video Gear Reviews from a 15-Year Broadcast Engineer',
    description: 'Honest video gear reviews by Andrew Disbrow — 15 years broadcast engineering, Blackmagic Design reseller. Cameras, lighting, audio, ATEM switchers. No fluff, no templates.',
    url: 'https://video-tools-affiliate.vercel.app',
    siteName: 'Gear Guide',
    images: [
      {
        url: 'https://video-tools-affiliate.vercel.app/images/blog/elgato-stream-deck-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Gear Guide – Video Gear Reviews',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gear Guide – Video Gear Reviews from a 15-Year Broadcast Engineer',
    description: 'Honest video gear reviews by Andrew Disbrow — 15 years broadcast engineering, Blackmagic Design reseller.',
    images: ['https://video-tools-affiliate.vercel.app/images/blog/elgato-stream-deck-hero.jpg'],
  },
};

import TrackingProvider from './components/TrackingProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body {
            margin: 0;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: #FFFFFF;
            color: #374151;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
          }
          a { color: #E84C3D; }
          img { max-width: 100%; }
          button { font-family: inherit; }
        `}</style>
      </head>
      <body>
        <TrackingProvider>{children}</TrackingProvider>
      </body>
    </html>
  );
}

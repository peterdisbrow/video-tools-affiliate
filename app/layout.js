export const metadata = {
  title: "Creator Gear – Honest Video Gear Reviews by Creators",
  description: "Honest reviews of video cameras, audio gear, lighting, and software from creators with 500K+ YouTube subscribers. No sponsored content, real-world testing, affiliate disclosures.",
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
          a { color: #2563EB; }
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

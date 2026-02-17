export const metadata = {
  title: "Video Tools Affiliate - Honest Gear Reviews by Creators (500K+ Subs)",
  description: "Honest reviews of video cameras, audio gear, lighting, and software from creators with 500K+ YouTube subscribers. No sponsored content, real-world testing, affiliate disclosures.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}

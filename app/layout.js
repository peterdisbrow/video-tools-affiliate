export const metadata = {
  title: "The Ultimate Video Creator's Toolkit | Level Up Your Content",
  description: "Discover the best video production tools, cameras, audio equipment, lighting, and software. Curated recommendations from a video production expert.",
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

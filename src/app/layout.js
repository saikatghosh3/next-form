export const metadata = {
  title: "Next Form App",
  description: "Simple Form with Server Component",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Arial", padding: "40px" }}>
        {children}
      </body>
    </html>
  );
}
import {Inter} from 'next/font/google'
const inter = Inter({
  subsets:['latin'],
  display: 'swap',
})

export const metadata = {
  title: "Next Form App",
  description: "Simple Form with Server Component",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={Inter.className}>
        {children}
      </body>
    </html>
  );
}
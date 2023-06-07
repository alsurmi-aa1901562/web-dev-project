import './globals.css'

export const metadata = {
  title: 'ConfiPlus',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[url('/main/api/public/images/bg.gif)]">{children}</body>
    </html>
  )
}

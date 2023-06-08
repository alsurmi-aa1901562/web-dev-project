import './globals.css'

export const metadata = {
  title: 'ConfiPlus',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {children}
    </html>
  )
}

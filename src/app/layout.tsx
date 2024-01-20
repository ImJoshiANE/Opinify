import '@/styles/globals.css'

export const metadata = {
  title: 'Opinify',
  description: 'Wait for the description'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}

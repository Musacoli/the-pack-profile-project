import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'The Pack Profile Project',
  description: 'By Collins Mbulakyalo',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-between p-5 lg:p-24 m-10 border-2 border-primary rounded-xl">
          {children}
        </main>
      </body>
    </html>
  )
}

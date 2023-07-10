import { Metadata } from 'next'
import { Providers } from './chakra-providers'

export const metadata: Metadata = {
  title: 'Radical-Sound Explorer',
  description: 'Collection of radical and kanji that has relationship with certain onyomi sounds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}


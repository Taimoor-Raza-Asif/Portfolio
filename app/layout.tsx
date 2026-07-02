import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Taimoor Raza Asif - Portfolio',
  description:
    'Personal portfolio of Taimoor Raza Asif, an AI Engineer specializing in RAG pipelines, AI agents, automation systems, and full-stack development based in Islamabad, Pakistan.',
  keywords: [
    'AI Engineer',
    'RAG Developer',
    'LangChain',
    'Automation',
    'Full Stack Developer',
    'Islamabad',
    'Pakistan',
    'Taimoor Raza Asif',
  ],
  authors: [{ name: 'Taimoor Raza Asif' }],
  openGraph: {
    title: 'Taimoor Raza Asif — AI Engineer & Software Developer',
    description: 'Building intelligent systems that automate the real world.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ backgroundColor: '#080b14', color: '#f1f5f9' }}>
        {children}
      </body>
    </html>
  )
}

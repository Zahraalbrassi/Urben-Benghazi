import { Inter } from 'next/font/google';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased" suppressHydrationWarning={true}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

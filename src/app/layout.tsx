import Footer from "./components/Footer";
import Header from "./components/Header";
import './globals.css';

export const metadata = {
  title: 'Restaurant App',
  description: 'A sample restaurant landing page built with Next.js',
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

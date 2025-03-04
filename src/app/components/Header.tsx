import Link from "next/link";
import './Header.css';
export default function Header() {
  return (
    <header className="bg-gray-100 py-4 header">
      <nav className="header-container mx-auto flex justify-between align-items">
        <Link href="/" className="text-xl font-bold">
          Restaurant App
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/home">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

// components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full px-4 py-4 pb-8 z-50 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
      <Link
        href="/"
        className="text-2xl font-black text-rose-500 tracking-tighter drop-shadow-[2px_2px_1.5px_rgba(0,0,0,0.4)]"
      >
        ItinerariVivi
      </Link>
    </nav>
  );
}
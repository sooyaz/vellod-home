"use client";

import Link from "next/link";
import Container from "../shared/Container";
import MobileMenu from "./MobileMenu";

const menus = [
  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Labs", href: "#labs" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0B1120]/80 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-wide"
          >
            SM.dev
          </Link>

          <nav className="hidden gap-8 md:flex">
            {menus.map((menu) => (
              <a
                key={menu.name}
                href={menu.href}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {menu.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:border-blue-500 md:block">
              GitHub
            </button>

            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
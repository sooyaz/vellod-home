"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const menus = [
  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Archive", href: "#archive" },
  { name: "Contact", href: "#contact" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 햄버거 버튼 */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center md:hidden"
        aria-label="메뉴"
      >
        {open ? (
          <X size={26} />
        ) : (
          <Menu size={26} />
        )}
      </button>

      {/* 오버레이 */}
      {open && (
        <div className="fixed inset-0 z-50 bg-[#0B1120]/95 backdrop-blur-xl">
          <div className="flex h-full flex-col items-center justify-center gap-10">
            {menus.map((menu) => (
              <Link
                key={menu.name}
                href={menu.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold"
              >
                {menu.name}
              </Link>
            ))}

            <button
              onClick={() => setOpen(false)}
              className="mt-10 rounded-lg border border-white/20 px-6 py-3"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
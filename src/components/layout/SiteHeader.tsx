"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen, Home } from "lucide-react";
import { useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Start", icon: Home },
  { href: "/courses", label: "Kurse", icon: BookOpen },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[200] border-b border-border bg-bg-card shadow-sm">
      <div className="container-app flex min-h-[4.5rem] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-lg font-bold text-white"
            aria-hidden="true"
          >
            D
          </span>
          <span className="text-lg font-semibold text-text-primary">
            Demenz-Schulungen
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Hauptnavigation">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={cn(
                "min-h-12 px-3 py-2 text-md font-medium transition-colors",
                pathname === href
                  ? "text-primary"
                  : "text-text-secondary hover:text-primary",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Button
            variant="icon"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {open && (
            <m.nav
              id="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border bg-bg-card md:hidden"
              aria-label="Mobile Navigation"
            >
              <ul className="container-app py-4">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center gap-3 px-2 py-3 text-md font-medium text-text-primary"
                    >
                      <Icon size={20} aria-hidden="true" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </m.nav>
          )}
        </AnimatePresence>
      </LazyMotion>
    </header>
  );
}

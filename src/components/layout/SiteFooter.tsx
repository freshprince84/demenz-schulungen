import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-bg-card">
      <div className="container-app flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-primary">Demenz-Schulungen</p>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-text-secondary">
            Barrierefreie Lernplattform für Pflege und Angehörige — entwickelt
            mit klaren Bildern, kurzen Texten und ruhigem Design.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-6 text-md font-medium">
            <li>
              <Link href="/courses" className="text-text-secondary hover:text-primary">
                Kurse
              </Link>
            </li>
            <li>
              <Link href="/api/health" className="text-text-secondary hover:text-primary">
                Systemstatus
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border py-4">
        <p className="container-app text-center text-sm text-text-secondary md:text-left">
          © {new Date().getFullYear()} Demenz-Schulungen
        </p>
      </div>
    </footer>
  );
}

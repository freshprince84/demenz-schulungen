import { cn } from "@/lib/utils";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
  children?: React.ReactNode;
}

export function PageHero({
  title,
  description,
  breadcrumb,
  children,
}: PageHeroProps) {
  return (
    <section className="hero-band -mx-4 mb-10 px-4 py-10 sm:-mx-6 sm:px-6 md:rounded-xl lg:-mx-8 lg:px-10">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav aria-label="Brotkrumen" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
            {breadcrumb.map((item, i) => (
              <li key={item.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-text-primary">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <h1 className="text-3xl font-semibold leading-tight tracking-tight text-text-primary md:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-content text-lg leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-border bg-bg-card p-6 shadow-sm">
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary-light text-primary"
        aria-hidden="true"
      >
        <Icon size={24} strokeWidth={1.75} />
      </div>
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-text-secondary">
        {description}
      </p>
    </div>
  );
}

interface StatPillProps {
  label: string;
  value: string;
  className?: string;
}

export function StatPill({ label, value, className }: StatPillProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col rounded-md border border-border bg-bg-card px-4 py-3 shadow-xs",
        className,
      )}
    >
      <span className="text-2xl font-semibold text-primary">{value}</span>
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  );
}

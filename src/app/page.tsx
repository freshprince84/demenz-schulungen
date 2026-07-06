import Link from "next/link";
import { BookOpen, HeartHandshake, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FeatureCard, PageHero, StatPill } from "@/components/layout/PageHero";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <PageHero
        title="Demenz verstehen — Schritt für Schritt"
        description="Kurze, bildgestützte Module für Pflege und Angehörige. Klar formuliert, gut lesbar und in Ihrem eigenen Tempo — ohne Überforderung."
      >
        <div className="flex flex-wrap gap-4">
          <Link href="/courses">
            <Button size="lg">Zu den Kursen</Button>
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <StatPill value="3" label="Pilotmodule" />
          <StatPill value="12" label="Min. pro Modul" />
          <StatPill value="AA" label="Barrierefrei geplant" />
        </div>
      </PageHero>

      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">
          Was Sie erwartet
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={BookOpen}
            title="Klar strukturiert"
            description="Ein Schritt pro Bildschirm — Piktogramm, kurzer Text, dann weiter. Kein Informationsüberfluss."
          />
          <FeatureCard
            icon={HeartHandshake}
            title="Für den Alltag"
            description="Hygiene, Medikamente, Ernährung — Themen, die in der Pflege täglich vorkommen."
          />
          <FeatureCard
            icon={Sparkles}
            title="Mit Quiz"
            description="Am Ende jedes Moduls prüfen Sie das Gelernte — mit verständlichem Feedback."
          />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-bg-card p-8 shadow-md md:p-10">
        <h2 className="text-2xl font-semibold text-text-primary">
          Pilotkurs: Alltag in der Demenzpflege
        </h2>
        <p className="mt-3 max-w-content text-lg leading-relaxed text-text-secondary">
          Starten Sie mit dem Modul „Hände waschen“ — vollständig mit Bildern,
          Storyboard und Quiz. Weitere Module folgen nach Freigabe.
        </p>
        <div className="mt-8">
          <Link href="/courses">
            <Button size="lg">Kurse ansehen</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

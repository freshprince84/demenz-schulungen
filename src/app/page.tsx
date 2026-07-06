import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-content space-y-10 text-center">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary md:text-4xl">
          Demenz verstehen — Schritt für Schritt
        </h1>
        <p className="mt-4 text-lg text-text-secondary">
          Kurze, bildgestützte Module für Pflege und Angehörige. Klar,
          barrierefrei und in Ihrem Tempo.
        </p>
      </div>

      <Card className="text-left">
        <CardTitle>Pilotkurse starten</CardTitle>
        <CardDescription>
          Drei Module zu Hygiene, Medikamenten und Ernährung — mit Quiz und
          Fortschrittsspeicherung.
        </CardDescription>
        <div className="mt-6">
          <Link href="/courses">
            <Button size="lg">Zu den Kursen</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

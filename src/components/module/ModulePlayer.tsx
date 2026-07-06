"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { StoryboardFrame } from "@/lib/content/loader";

interface ModulePlayerProps {
  slug: string;
  title: string;
  frames: StoryboardFrame[];
  moduleId?: string;
}

export function ModulePlayer({
  slug,
  title,
  frames,
  moduleId,
}: ModulePlayerProps) {
  const [index, setIndex] = useState(0);
  const frame = frames[index];
  const isLast = index >= frames.length - 1;

  async function saveProgress(completed: boolean) {
    if (!moduleId) return;
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId, completed, score: completed ? 100 : 0 }),
    });
  }

  function goNext() {
    if (isLast) {
      void saveProgress(true);
      return;
    }
    setIndex((i) => i + 1);
  }

  function goPrev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  if (!frame) {
    return (
      <p className="text-text-secondary">Keine Storyboard-Frames gefunden.</p>
    );
  }

  const pictogramSrc = frame.pictogram
    ? `/modules/${slug}/de/${frame.pictogram.replace(/^\/+/, "")}`
    : null;

  return (
    <article className="mx-auto max-w-content">
      <header className="mb-8 text-center">
        <p className="text-sm text-text-secondary">
          Schritt {index + 1} von {frames.length}
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-text-primary">
          {title}
        </h1>
      </header>

      <div className="flex flex-col items-center gap-8">
        {pictogramSrc ? (
          <div className="relative h-32 w-32">
            <Image
              src={pictogramSrc}
              alt=""
              fill
              className="object-contain"
              sizes="128px"
              unoptimized
            />
          </div>
        ) : (
          <div
            className="flex h-32 w-32 items-center justify-center rounded-lg bg-primary-light text-primary"
            aria-hidden="true"
          >
            <span className="text-4xl font-semibold">{index + 1}</span>
          </div>
        )}

        {frame.text && (
          <p className="max-w-content text-center text-xl leading-relaxed text-text-primary">
            {frame.text}
          </p>
        )}
      </div>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <Button
          variant="secondary"
          onClick={goPrev}
          disabled={index === 0}
          className="sm:min-w-[140px]"
        >
          Zurück
        </Button>
        {isLast ? (
          <Button
            onClick={() => {
              void saveProgress(true);
              window.location.href = `/learn/${slug}/quiz`;
            }}
            className="sm:min-w-[140px]"
          >
            Zum Quiz
          </Button>
        ) : (
          <Button onClick={goNext} className="sm:min-w-[140px]">
            Weiter
          </Button>
        )}
      </div>
    </article>
  );
}

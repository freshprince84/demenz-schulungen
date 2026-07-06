"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Quiz, QuizQuestion } from "@/lib/schemas/content";
import { cn } from "@/lib/utils";

interface QuizPlayerProps {
  quiz: Quiz;
  moduleId?: string;
  slug: string;
}

function getScore(answers: Record<string, string | boolean>, quiz: Quiz) {
  let correct = 0;
  for (const question of quiz.questions) {
    const answer = answers[question.id];
    if (question.type === "multiple_choice") {
      const option = question.options.find((o) => o.id === answer);
      if (option?.correct) correct += 1;
    } else if (question.type === "true_false" && answer === question.correct) {
      correct += 1;
    }
  }
  return Math.round((correct / quiz.questions.length) * 100);
}

export function QuizPlayer({ quiz, moduleId, slug }: QuizPlayerProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null,
  );
  const [finished, setFinished] = useState(false);
  const [attempts, setAttempts] = useState(1);

  const question = quiz.questions[index] as QuizQuestion | undefined;
  const maxAttempts = quiz.maxAttempts ?? 3;

  const score = useMemo(
    () => (finished ? getScore(answers, quiz) : 0),
    [answers, finished, quiz],
  );

  async function saveProgress(finalScore: number, passed: boolean) {
    if (!moduleId) return;
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        moduleId,
        completed: passed,
        score: finalScore,
      }),
    });
  }

  function checkAnswer(value: string | boolean) {
    if (!question) return;

    setAnswers((prev) => ({ ...prev, [question.id]: value }));

    let isCorrect = false;
    if (question.type === "multiple_choice") {
      const option = question.options.find((o) => o.id === value);
      isCorrect = Boolean(option?.correct);
    } else {
      isCorrect = value === question.correct;
    }

    setFeedback(isCorrect ? "correct" : "incorrect");
  }

  function nextQuestion() {
    setFeedback(null);
    if (index >= quiz.questions.length - 1) {
      const finalScore = getScore(answers, quiz);
      const passed = finalScore >= quiz.passingScore;
      setFinished(true);
      void saveProgress(finalScore, passed);
      return;
    }
    setIndex((i) => i + 1);
  }

  function retry() {
    if (attempts >= maxAttempts) return;
    setAttempts((a) => a + 1);
    setIndex(0);
    setAnswers({});
    setFeedback(null);
    setFinished(false);
  }

  if (finished) {
    const passed = score >= quiz.passingScore;
    return (
      <Card className="mx-auto max-w-content text-center">
        <h2 className="text-2xl font-semibold text-text-primary">
          {passed ? "Geschafft!" : "Noch nicht bestanden"}
        </h2>
        <p className="mt-4 text-lg text-text-secondary">
          Ihre Punktzahl: {score}% (Mindestens {quiz.passingScore}% nötig)
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          {!passed && attempts < maxAttempts && (
            <Button variant="secondary" onClick={retry}>
              Erneut versuchen ({attempts}/{maxAttempts})
            </Button>
          )}
          <Button onClick={() => (window.location.href = `/courses`)}>
            Zurück zu den Kursen
          </Button>
        </div>
      </Card>
    );
  }

  if (!question) return null;

  return (
    <div className="mx-auto max-w-content">
      <p className="mb-4 text-sm text-text-secondary">
        Frage {index + 1} von {quiz.questions.length}
      </p>

      <Card>
        <h2 className="text-xl font-semibold text-text-primary">
          {question.question}
        </h2>

        {question.type === "multiple_choice" && question.pictogram && (
          <div className="relative mx-auto mt-6 h-24 w-24">
            <Image
              src={question.pictogram}
              alt=""
              fill
              className="object-contain"
              sizes="96px"
              unoptimized
            />
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3" role="group" aria-label="Antworten">
          {question.type === "multiple_choice" &&
            question.options.map((option) => (
              <button
                key={option.id}
                type="button"
                disabled={feedback !== null}
                onClick={() => checkAnswer(option.id)}
                className={cn(
                  "min-h-12 rounded-md border border-border px-4 py-3 text-left text-md transition-colors",
                  answers[question.id] === option.id &&
                    feedback === "correct" &&
                    "border-success bg-success-bg",
                  answers[question.id] === option.id &&
                    feedback === "incorrect" &&
                    "border-error bg-error-bg",
                  feedback === null && "hover:bg-primary-light",
                )}
              >
                {option.text}
              </button>
            ))}

          {question.type === "true_false" && (
            <>
              {[
                { label: "Richtig", value: true },
                { label: "Falsch", value: false },
              ].map(({ label, value }) => (
                <button
                  key={label}
                  type="button"
                  disabled={feedback !== null}
                  onClick={() => checkAnswer(value)}
                  className={cn(
                    "min-h-12 rounded-md border border-border px-4 py-3 text-md",
                    feedback === null && "hover:bg-primary-light",
                  )}
                >
                  {label}
                </button>
              ))}
            </>
          )}
        </div>

        {feedback && (
          <p
            className={cn(
              "mt-6 rounded-md p-4 text-md",
              feedback === "correct"
                ? "bg-success-bg text-success"
                : "bg-error-bg text-error",
            )}
            role="status"
          >
            {feedback === "correct"
              ? question.feedback.correct
              : question.feedback.incorrect}
          </p>
        )}

        {feedback && (
          <div className="mt-8">
            <Button fullWidth onClick={nextQuestion}>
              {index >= quiz.questions.length - 1 ? "Ergebnis anzeigen" : "Weiter"}
            </Button>
          </div>
        )}
      </Card>

      <p className="mt-4 text-center text-sm text-text-secondary">
        Modul: {slug}
      </p>
    </div>
  );
}

import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { modules } from "@/db/schema";
import { loadModuleQuiz } from "@/lib/content/loader";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export default async function QuizPage({ params }: PageProps) {
  const { slug } = await params;

  let quiz;
  try {
    quiz = await loadModuleQuiz(slug);
  } catch {
    notFound();
  }

  const [moduleRow] = await db
    .select()
    .from(modules)
    .where(eq(modules.slug, slug))
    .limit(1);

  return (
    <QuizPlayer quiz={quiz} moduleId={moduleRow?.id} slug={slug} />
  );
}

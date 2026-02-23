import Link from "next/link";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 px-6 py-24">
      <Link href="/#projects" className="text-violet-600 dark:text-violet-400 text-sm hover:underline">
        ← Back to Projects
      </Link>
      <h1 className="mt-6 text-2xl font-bold capitalize">{slug.replace(/-/g, " ")}</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-xl">
        Full case study and transparency report coming soon. We’ll share what the client needed and how we did the work.
      </p>
    </div>
  );
}

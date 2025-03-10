import { SlackIcon } from "./components/SlackIcon";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { count } = await searchParams;

  const parsedCount = count ? parseInt(count as string) : undefined;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <SlackIcon count={parsedCount} />
    </main>
  );
}

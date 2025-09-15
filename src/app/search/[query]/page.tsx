import SearchResults from "@/components/features/searchFeature/searchResults";

export default async function Page({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const { query } = await params;

  return <SearchResults query={query} />;
}

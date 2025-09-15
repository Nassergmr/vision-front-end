import UserProfile from "@/components/userComponents/userProfile";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <UserProfile slug={slug} />;
}

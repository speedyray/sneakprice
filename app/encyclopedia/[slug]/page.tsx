import { notFound } from "next/navigation";
import SneakerEncyclopediaTemplate from "@/components/encyclopedia/SneakerEncyclopediaTemplate";
import { sneakers } from "@/lib/encyclopedia/sneakers";

export default async function SneakerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const sneaker = sneakers.find((s) => s.slug === slug);

  if (!sneaker) return notFound();

  return <SneakerEncyclopediaTemplate sneaker={sneaker} />;
}
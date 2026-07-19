import { notFound } from "next/navigation";

import { getTemplate } from "@/data/coloring";

import ColoringPlayer from "@/components/coloring/ColoringPlayer";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PlayPage({
  params,
}: Props) {

  const { id } = await params;

  const template = getTemplate(id);

  if (!template) {
    notFound();
  }

  return (
    <ColoringPlayer template={template} />
  );
}
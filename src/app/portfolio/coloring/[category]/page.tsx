import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getTemplates,
} from "@/data/coloring";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage(
  {
    params,
  }: Props
) {

  const { category } = await params;

  const templates = getTemplates(category);

  if (templates.length === 0) {
    notFound();
  }

  return (

    <main
      style={{
        padding: 40,
      }}
    >

      <h1>

        {category.toUpperCase()}

      </h1>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fill,220px)",

          gap: 24,

          marginTop: 30,
        }}
      >

        {templates.map(
          (item) => (

            <Link
              key={item.id}
              href={`/portfolio/coloring/play/${item.id}`}
            >

              <Image
                src={item.image}
                alt={item.title}
                width={220}
                height={220}
              />

              <h3>
                {item.title}

              </h3>
            </Link>
          )
        )}

      </div>
    </main>
  );
}
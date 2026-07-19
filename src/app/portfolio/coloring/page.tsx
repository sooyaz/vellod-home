import Image from "next/image";
import Link from "next/link";

import {
  coloringCategories,
} from "@/data/coloring";

export default function ColoringPage() {

  return (

    <main
      style={{
        padding: 40,
      }}
    >

      <h1>
        Coloring
      </h1>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fill, 220px)",

          gap: 24,

          marginTop: 30,
        }}
      >

        {coloringCategories.map(
          (category) => (

            <Link
              key={category.id}

              href={`/portfolio/coloring/${category.id}`}

              style={{
                textDecoration: "none",

                color: "inherit",
              }}
            >

              <div>

                <Image

                  src={category.thumbnail}

                  alt={category.title}

                  width={220}

                  height={220}

                />

                <h3>

                  {category.title}

                </h3>

                <p>

                  {category.description}

                </p>

              </div>

            </Link>

          )
        )}

      </div>

    </main>

  );

}
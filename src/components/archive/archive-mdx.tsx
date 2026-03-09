import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { archiveMdxComponents } from "./archive-mdx-components";

type ArchiveMdxProps = {
  source: string;
};

export async function ArchiveMdx({ source }: ArchiveMdxProps) {
  const mod = await evaluate(source, {
    ...runtime,
    development: process.env.NODE_ENV === "development",
  });

  const MDXContent = mod.default;

  return (
    <article className="archive-manuscript max-w-3xl">
      <MDXContent components={archiveMdxComponents} />
    </article>
  );
}
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const archiveMdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      {...props}
      className="mt-12 text-4xl font-light tracking-[-0.03em] text-neutral-950 md:text-5xl"
    />
  ),

  h2: (props) => (
    <h2
      {...props}
      className="mt-12 text-2xl font-light tracking-[-0.02em] text-neutral-950 md:text-3xl"
    />
  ),

  h3: (props) => (
    <h3
      {...props}
      className="mt-10 text-xl font-medium tracking-[-0.01em] text-neutral-900 md:text-2xl"
    />
  ),

  p: (props) => (
    <p
      {...props}
      className="mt-6 text-[1.04rem] leading-8 text-neutral-700 md:text-[1.08rem] md:leading-9"
    />
  ),

  ul: (props) => (
    <ul
      {...props}
      className="mt-6 space-y-3 pl-5 text-[1.02rem] leading-8 text-neutral-700 marker:text-neutral-400"
    />
  ),

  ol: (props) => (
    <ol
      {...props}
      className="mt-6 space-y-3 pl-5 text-[1.02rem] leading-8 text-neutral-700 marker:text-neutral-500"
    />
  ),

  li: (props) => <li {...props} className="pl-1" />,

  blockquote: (props) => (
    <blockquote
      {...props}
      className="mt-8 rounded-[1.5rem] border border-neutral-200 bg-white/60 px-6 py-5 italic text-neutral-700"
    />
  ),

  hr: (props) => <hr {...props} className="my-12 border-neutral-200" />,

  strong: (props) => <strong {...props} className="font-semibold text-neutral-950" />,

  em: (props) => <em {...props} className="italic text-neutral-800" />,

  a: ({ href = "", ...props }) => {
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link
          href={href}
          {...props}
          className="underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-800"
        />
      );
    }

    return (
      <a
        href={href}
        {...props}
        className="underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-800"
        target="_blank"
        rel="noreferrer"
      />
    );
  },

  code: (props) => (
    <code
      {...props}
      className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[0.95em] text-stone-800"
    />
  ),

  pre: (props) => (
    <pre
      {...props}
      className="mt-8 overflow-x-auto rounded-[1.5rem] border border-neutral-200 bg-stone-950 px-5 py-4 text-sm text-stone-100"
    />
  ),
};
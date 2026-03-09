import Link from "next/link";
import { notFound } from "next/navigation";
import { getStructurePageBySlug } from "@/lib/archive/get-archive";
import { ArchiveMdx } from "@/components/archive/archive-mdx";

export default async function ClosingPage() {
  const page = await getStructurePageBySlug("benediction");

  if (!page) {
    notFound();
  }

  return (
    <main className="archive-shell">
      <div className="archive-panel">
        <div className="archive-panel-inner">
          <header className="mb-14 max-w-3xl">
            <Link href="/archive" className="manuscript-breadcrumb">
              Archive
            </Link>

            <p className="mt-8 archive-header-kicker">Closing Benediction</p>
            <h1 className="archive-page-title">{page.title}</h1>
          </header>

          {await ArchiveMdx({ source: page.content })}
        </div>
      </div>
    </main>
  );
}
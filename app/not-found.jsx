import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap flex min-h-[80vh] flex-col items-start justify-center pt-[100px]">
      <p className="text-[15px] text-ink-3">Error 404</p>
      <h1 className="display mt-3 max-w-[18ch] t-h1 text-ink">This page doesn&apos;t exist.</h1>
      <p className="lede mt-5 max-w-[46ch]">It may have moved, or the link may be out of date.</p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-ink">Go to the home page</Link>
        <Link href="/view-details" className="btn btn-ghost">See the course</Link>
      </div>
    </main>
  );
}

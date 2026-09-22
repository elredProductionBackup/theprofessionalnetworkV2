import Link from "next/link";

const RED = "#C4122E";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-white px-5 py-20 text-center">
      <p className="font-inter text-[15px] font-bold uppercase tracking-wide" style={{ color: RED }}>
        404
      </p>
      <h1 className="font-inter mt-2 text-[28px] font-extrabold leading-[1.3] text-slate-900 sm:text-[36px]">
        This page could not be found
      </h1>
      <p className="font-inter mt-3 max-w-md text-[15px] leading-[1.6] text-[#67686B]">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        href="/"
        className="font-inter mt-8 inline-block cursor-pointer rounded-full border-2 px-8 py-2.5 text-[15px] font-semibold transition hover:bg-rose-50"
        style={{ borderColor: RED, color: RED }}
      >
        Back to Home
      </Link>
    </main>
  );
}

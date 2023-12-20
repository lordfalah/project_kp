import Link from "next/link";
import Image from "next/image";
import ErrNotFound from "@/assets/error/404.svg";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2 my-20">
      <Image
        src={ErrNotFound.src}
        width="200"
        height="200"
        className="w-1/2 max-w-2xl mt-20"
        priority
        alt="image error 404"
      />
      <div className="flex justify-center flex-col items-center gap-2.5">
        <h2 className="text-xl font-semibold">404 Not Found</h2>
        <p>Could not find the requested product.</p>
        <Link
          href="/products"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400 inline-block"
        >
          Go Back
        </Link>
      </div>
    </main>
  );
}

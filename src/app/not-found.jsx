import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl mt-4 text-gray-700">Page Not Found</p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
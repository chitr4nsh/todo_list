import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">TODO App</h1>
        <p className="text-gray-600 mb-6">Welcome to your authentication app</p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
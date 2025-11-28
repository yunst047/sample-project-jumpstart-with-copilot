import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <main className="flex flex-col items-center justify-center py-16 px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Asset Recording System
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
          Manage persons and their assets. Track ownership, values, and acquisition dates.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/persons"
            className="flex h-14 w-48 items-center justify-center rounded-lg bg-blue-600 px-6 text-white font-medium transition-colors hover:bg-blue-700"
          >
            Manage Persons
          </Link>
          <Link
            href="/assets"
            className="flex h-14 w-48 items-center justify-center rounded-lg bg-green-600 px-6 text-white font-medium transition-colors hover:bg-green-700"
          >
            Manage Assets
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Persons</h2>
            <p className="text-gray-600">
              Add, edit, and delete person records. Each person has a unique ID that links to their assets.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Assets</h2>
            <p className="text-gray-600">
              Record assets owned by persons. Track name, value, description, and acquisition date.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <Link
              href="/admin/design"
              className="inline-flex items-center px-1 pt-1 text-gray-700 hover:text-purple-600"
            >
              Manajemen Design
            </Link>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center px-1 pt-1 text-gray-700 hover:text-purple-600"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
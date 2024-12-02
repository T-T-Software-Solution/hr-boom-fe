import Link from 'next/link';

export const metadata = {
  title: 'Example',
  description: 'Example page',
};

export default function ExampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center">
          {metadata.title || 'Example'}
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 text-center">
        <Link href="/" className="text-blue-500 hover:underline">
          back to homepage 🏠
        </Link>
      </footer>
    </div>
  );
}

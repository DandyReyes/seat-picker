"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
          <p className="text-lg text-gray-600 mb-4">
            An unexpected error occurred.
          </p>
          <button
            className="text-blue-500 hover:underline"
            onClick={() => reset()}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

"use client";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">An Error Occurred</h1>
      <p className="text-lg text-gray-600">
        Sorry, something went wrong. Please try again later.
      </p>
      <a href="/" className="text-blue-500 hover:underline">
        Return
      </a>
    </div>
  );
}

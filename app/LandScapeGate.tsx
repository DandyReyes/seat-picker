import { useLandscapeOnly } from "./useLandScapeOnly";

export function LandscapeGate({ children }: { children: React.ReactNode }) {
  const isLandscape = useLandscapeOnly();

  if (!isLandscape) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white rotate-90 md:rotate-0">
        <p className="text-lg">Please rotate your device</p>
      </div>
    );
  }

  return <>{children}</>;
}

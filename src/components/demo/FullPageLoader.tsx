export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex flex-col items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-sky-400 opacity-70 animate-ping" />
        <div className="absolute inset-0 rounded-full border-4 border-sky-500" />
      </div>

      <p className="mt-10 text-sm text-sky-200 animate-pulse tracking-wide">
        Generating 3D model...
      </p>
    </div>
  );
}

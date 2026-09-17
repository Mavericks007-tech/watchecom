export function FrameSkeleton({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden
      className={`shimmer pointer-events-none absolute inset-0 overflow-hidden bg-panel transition-opacity duration-700 ease-out-expo ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

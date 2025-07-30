import { useRef, useState } from "react";

interface MergedStripProps {
  mergedStrip: string;
  setSelectedIndex: (index: number) => void;
  previewListLength: number;
}

export default function MergedStripPreview({
  mergedStrip,
  setSelectedIndex,
  previewListLength,
}: MergedStripProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [sliderX, setSliderX] = useState(0);
  const [hoverX, setHoverX] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = stripRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - rect.left;
    setHoverX(offsetX);
  };

  const handleMouseLeave = () => {
    setHoverX(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = stripRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - rect.left;
    const ratio = offsetX / rect.width;
    const index = Math.floor(ratio * previewListLength);

    if (index >= 0 && index < previewListLength) {
      setSelectedIndex(index);
      setSliderX(offsetX);
      setHoverX(null);
    }
  };

  return (
    <div className="relative bg-black rounded border text-white">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-bold text-orange-300">
        P
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-bold text-orange-300">
        D
      </div>

      <div
        className="relative overflow-hidden"
        ref={stripRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <img
          src={mergedStrip}
          alt="OCT Strip"
          className="w-full object-contain"
        />

        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white"
          style={{ left: `${sliderX}px` }}
        >
          <div className="w-3 h-3 bg-white rotate-45 absolute -top-2 left-1/2 -translate-x-1/2"></div>
        </div>

        {hoverX !== null && (
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white opacity-30"
            style={{ left: `${hoverX}px` }}
          />
        )}
      </div>
    </div>
  );
}

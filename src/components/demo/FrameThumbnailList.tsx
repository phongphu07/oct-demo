interface FrameThumbnailListProps {
  previewList: string[];
  selectedIndex: number;
  setSelectedIndex: (idx: number) => void;
}

export default function FrameThumbnailList({
  previewList,
  selectedIndex,
  setSelectedIndex,
}: FrameThumbnailListProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-2 h-28 w-max px-2">
        {previewList.map((url, idx) => (
          <img
            key={idx}
            src={url}
            className={`w-24 h-24 object-cover border-2 rounded cursor-pointer flex-shrink-0 ${idx === selectedIndex ? "border-blue-500" : "border-transparent"
              }`}
            onClick={() => setSelectedIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}

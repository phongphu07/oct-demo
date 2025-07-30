// components/SampleImagesSelector.tsx
import { Label } from "../ui/label";
import { toastError } from "../Toast";

export default function SampleImagesSelector({
  sampleImages,
  activeIndex,
  onSelect,
}: {
  sampleImages: string[];
  activeIndex: number | null;
  onSelect: (index: number, file: File) => void;
}) {
  return (
    <div className="space-y-2 mb-4">
      <Label className="text-md font-semibold">Example Images</Label>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sampleImages.map((src, index) => (
          <div
            key={index}
            onClick={async () => {
              try {
                const response = await fetch(src);
                const blob = await response.blob();
                const file = new File([blob], `sample-${index}.jpg`, {
                  type: blob.type,
                });
                onSelect(index, file);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
              } catch (err) {
                toastError("Failed to load sample image");
              }
            }}
            className={`
                  w-24 h-24 rounded overflow-visible cursor-pointer 
                  transition box-border 
                  ${
                    activeIndex === index
                      ? "ring-2 ring-blue-500 bg-white"
                      : "ring-0"
                  }
                  `}
            style={{ margin: "2px" }}
          >
            <img
              src={src}
              alt={`sample-${index}`}
              className="w-full h-full object-cover rounded pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

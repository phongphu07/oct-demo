import { X } from "lucide-react";
import { Label } from "../ui/label";

interface UploadBoxProps {
  file: File | null;
  previewUrl: string | null;
  previewLoading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (file: File) => void;
  onClear: () => void;
  model: string;
  extraContent?: React.ReactNode;
}

export default function UploadBox({
  file,
  previewUrl,
  previewLoading,
  fileInputRef,
  onFileChange,
  onClear,
  model,
  extraContent
}: UploadBoxProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onFileChange(file);
  };

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">
        {model === "model3" ? "Upload Angiography Image" : "Upload OCT Image"}
      </Label>

      <div>
        <div
          onDrop={!file ? handleDrop : undefined}
          onDragOver={!file ? (e) => e.preventDefault() : undefined}
          onClick={!file ? () => fileInputRef.current?.click() : undefined}
          className={`w-full aspect-[4/3] bg-white ${file ? "border border-gray-300" : "border-2 border-dashed"
            } rounded-md flex items-center justify-center overflow-hidden ${file ? "cursor-default" : "cursor-pointer hover:bg-gray-50"
            } relative`}
        >
          {previewLoading ? (
            <div className="flex flex-col items-center gap-1 text-sm text-gray-500">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
              <span>Uploading Image...</span>
            </div>
          ) : previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-gray-400 text-sm text-center px-4">
              Click or drag and drop image/Tif here
            </span>
          )}

          {file && (
            <button
              type="button"
              className="absolute top-1 right-1 bg-white rounded-full shadow p-1 hover:bg-gray-100 z-10 hover:cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <input
            id="file"
            ref={fileInputRef}
            type="file"
            accept=".dcm,image/*,.tif,.tiff"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        {extraContent && (
          <div className="mt-3">
            {extraContent}
          </div>
        )}
      </div>
    </div>
  );

}

import * as UTIF from "utif";
import { CloudUpload, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Upload3DBoxProps {
  onFileChange: (file: File) => void; 
  onClear: () => void;
  extraContent?: React.ReactNode;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function Upload3DBox({
  onFileChange,
  onClear,
  extraContent,
  inputRef,
}: Upload3DBoxProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    onFileChange(selectedFile);
    setLoading(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const ifds = UTIF.decode(arrayBuffer);

      if (!ifds.length) throw new Error("No IFDs found in TIFF");

      UTIF.decodeImage(arrayBuffer, ifds[0]);
      const rgba = UTIF.toRGBA8(ifds[0]);

      const width = ifds[0].width;
      const height = ifds[0].height;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Cannot get canvas context");

      const imageData = new ImageData(new Uint8ClampedArray(rgba), width, height);
      ctx.putImageData(imageData, 0, 0);

      setPreviewUrl(canvas.toDataURL());
    } catch (err) {
      console.error("❌ Failed to render TIFF preview:", err);
      setPreviewUrl(null);
    }

    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const clearAll = () => {
    setFile(null);
    setPreviewUrl(null);
    onClear();
  };

  useEffect(() => {
    if (inputRef?.current?.value === "") {
      setFile(null);
      setPreviewUrl(null);
    }
  }, [inputRef?.current?.value]);

  return (
    <div className="space-y-4 text-white">
      <div className="flex justify-center items-center h-full">
        <div
          onDrop={!file ? handleDrop : undefined}
          onDragOver={!file ? (e) => e.preventDefault() : undefined}
          onClick={!file ? () => inputRef.current?.click() : undefined}
          className={`min-w-[800px] min-h-[450px] rounded-lg flex items-center justify-center transition-all duration-300 ${
            file
              ? "cursor-default"
              : "border border-dashed border-gray-500 cursor-pointer hover:bg-[#f9f9f9]"
          } relative`}
        >
          {!file ? (
            <div className="flex flex-col items-center justify-center text-center">
              <CloudUpload className="w-12 h-12 text-sky-400 mb-2" />
              <p className="text-black font-semibold">
                Drag and drop TIF file here
              </p>
              <p className="text-sm text-sky-300">
                or <span className="underline text-amber-400">upload here</span>
              </p>
            </div>
          ) : previewUrl ? (
            <>
              {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                  <p className="text-sm text-white animate-pulse">Rendering preview...</p>
                </div>
              )}
              <img
                src={previewUrl}
                alt="TIFF Preview"
                className="h-full max-w-[800px] object-contain"
              />
            </>
          ) : (
            <p className="text-white">File selected: {file.name}</p>
          )}

          {file && (
            <button
              type="button"
              className="absolute top-2 right-2 bg-gray-800 rounded-full shadow p-1 hover:bg-gray-700 z-10"
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
            >
              <X className="w-4 h-4 text-white" />
            </button>
          )}

          <input
            ref={inputRef}
            type="file"
            accept=".tif,.tiff"
            style={{ display: "none" }}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {extraContent && <div className="mt-3">{extraContent}</div>}
    </div>
  );
}

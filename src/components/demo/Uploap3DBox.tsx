import colormap from "colormap";
import * as GeoTIFF from "geotiff";
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

  const colors = colormap({
    colormap: "hot",
    nshades: 256,
    format: "rgba",
    alpha: 1,
  });
  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    onFileChange(selectedFile);
    setLoading(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
      const image = await tiff.getImage(0);
      const raster = await image.readRasters({ interleave: true });
      const width = image.getWidth();
      const height = image.getHeight();

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const imageData = ctx.createImageData(width, height);

        const isArray = Array.isArray(raster);
        const data = raster as Uint8Array | number[];

        if (isArray || data.length / (width * height) === 3) {
          for (let i = 0; i < width * height; i++) {
            const r = data[i * 3 + 0];
            const g = data[i * 3 + 1];
            const b = data[i * 3 + 2];
            imageData.data[i * 4 + 0] = r;
            imageData.data[i * 4 + 1] = g;
            imageData.data[i * 4 + 2] = b;
            imageData.data[i * 4 + 3] = 255;
          }
        } else {
          for (let i = 0; i < width * height; i++) {
            const value = data[i]; // 0–255
            const [r, g, b, a] = colors[value];

            imageData.data[i * 4 + 0] = r;
            imageData.data[i * 4 + 1] = g;
            imageData.data[i * 4 + 2] = b;
            imageData.data[i * 4 + 3] = a * 255;
          }
        }

        ctx.putImageData(imageData, 0, 0);
        setPreviewUrl(canvas.toDataURL());
      }
    } catch (err) {
      console.error("Failed to preview TIF:", err);
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
      setPreviewUrl(null);
      setFile(null);
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
                Drag and drop Tif/DCM here
              </p>
              <p className="text-sm text-sky-300">
                or <span className="underline text-amber-400">upload here</span>
              </p>
            </div>
          ) : previewUrl ? (
            <>
              {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-400"></div>
                    <p className="mt-2 text-sm text-white animate-pulse">
                      Rendering preview...
                    </p>
                  </div>
                </div>
              )}
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full max-w-[800px] object-contain"
              />
            </>
          ) : (
            <p className="text-white">File ready</p>
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

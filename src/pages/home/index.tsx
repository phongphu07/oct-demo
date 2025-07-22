import { X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface ResultFrame {
  frame_index: number;
  url: string;
  summary?: string;
  num_boxes?: number;
  boxes?: any[];
  vessel_type?: string;
  class_distribution?: string;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [model, setModel] = useState<string>("");
  const [previewList, setPreviewList] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [resultLoading, setResultLoading] = useState(false);
  const [resultFrames, setResultFrames] = useState<ResultFrame[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;

    setPreviewLoading(true);
    setFile(uploaded);
    setPreviewList([]);
    setResultFrames([]);
    setSelectedIndex(0);

    const isTiff =
      uploaded.name.toLowerCase().endsWith(".tif") ||
      uploaded.name.toLowerCase().endsWith(".tiff");

    if (isTiff) {
      const formData = new FormData();
      formData.append("file", uploaded);

      try {
        const response = await fetch("http://localhost:8000/uploadImage", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        const baseUrl = "http://localhost:8000";
        const urls = data.image_urls.map((url: string) => baseUrl + url);
        setPreviewList(urls);
      } catch (error) {
        console.error("Tải file TIFF thất bại:", error);
      } finally {
        setPreviewLoading(false);
      }
    } else {
      const url = URL.createObjectURL(uploaded);
      setPreviewList([url]);
      setPreviewLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileChange({
        target: { files: [droppedFile] },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreviewList([]);
    setResultFrames([]);
    setSelectedIndex(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerate = async () => {
    if (!file || !model) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", model);
    setResultLoading(true);
    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const baseUrl = "http://localhost:8000";

      if (data.is_tif && Array.isArray(data.frames)) {
        const resultWithFullUrls = data.frames.map((frame: any) => ({
          ...frame,
          url: baseUrl + frame.url,
        }));
        setResultFrames(resultWithFullUrls);
      } else if (data.image_url) {
        setResultFrames([
          {
            frame_index: 0,
            url: baseUrl + data.image_url,
            summary: data.summary,
            num_boxes: data.num_boxes,
            boxes: data.boxes,
            vessel_type: data.vessel_type,
            class_distribution: data.class_distribution,
          },
        ]);
      }
    } catch (error) {
      console.error("Lỗi xử lý ảnh:", error);
    } finally {
      setResultLoading(false);
    }
  };

  const activePreview = previewList[selectedIndex] || null;
  const activeResult =
    resultFrames.find((frame) => frame.frame_index === selectedIndex)?.url ||
    null;

  return (
    <div className="w-screen min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-7xl shadow-lg border rounded-2xl ">
        <CardContent className="p-10 space-y-8">
          <h1 className="text-3xl font-bold text-center">Demo OCT Image AI</h1>

          <div className="space-y-2">
            <Label htmlFor="model">Select model</Label>
            <Select onValueChange={setModel}>
              <SelectTrigger id="model" className="w-full">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="model1">Predict Stent Guidewire</SelectItem>
                <SelectItem value="model2">
                  Segmentation Lumen SideBrand
                </SelectItem>
                <SelectItem value="model3">Angio FFR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">Upload OCT image</Label>
              <div
                onDrop={!file ? handleDrop : undefined}
                onDragOver={!file ? (e) => e.preventDefault() : undefined}
                onClick={
                  !file ? () => fileInputRef.current?.click() : undefined
                }
                className={`w-full aspect-[4/3] bg-white ${
                  file ? "border border-gray-300" : "border-2 border-dashed"
                } rounded-md flex items-center justify-center overflow-hidden ${
                  file ? "cursor-default" : "cursor-pointer hover:bg-gray-50"
                } relative`}
              >
                {previewLoading ? (
                  <div className="flex flex-col items-center gap-1 text-sm text-gray-500">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                    <span>Uploading Image...</span>
                  </div>
                ) : activePreview ? (
                  <img
                    src={activePreview}
                    alt="Preview"
                    className="object-contain max-h-full max-w-full"
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
                      handleClear();
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <input
                  id="file"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.tif,.tiff"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">
                Results after processing
              </Label>
              <div className="w-full aspect-[4/3] border rounded-md flex items-center justify-center overflow-hidden bg-white">
                {resultLoading ? (
                  <div className="flex flex-col items-center gap-1 text-sm text-gray-500">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : activeResult ? (
                  <img
                    src={activeResult}
                    alt="Result"
                    className="object-contain max-h-full max-w-full"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No results</span>
                )}
              </div>
              {resultFrames[selectedIndex] && (
                <div className="text-sm text-gray-600 mt-1 space-y-1">
                  {model === "model3" ? (
                    <>
                      <div>
                        <strong>Vessel type:</strong>{" "}
                        {resultFrames[selectedIndex].vessel_type || "Unknown"}
                      </div>
                      <div>
                        <strong>Detected classes:</strong>{" "}
                        {typeof resultFrames[selectedIndex]
                          .class_distribution === "object"
                          ? Object.entries(
                              resultFrames[selectedIndex].class_distribution
                            )
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(", ")
                          : resultFrames[selectedIndex].class_distribution ||
                            "None"}
                      </div>
                    </>
                  ) : (
                    resultFrames[selectedIndex].summary && (
                      <div>
                        <strong>Summary:</strong>{" "}
                        {resultFrames[selectedIndex].summary}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {previewList.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pt-2">
              {previewList.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  className={`w-24 h-24 object-cover border-2 rounded cursor-pointer ${
                    idx === selectedIndex
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedIndex(idx)}
                />
              ))}
            </div>
          )}

          {model === "model3" ? (
            <div className="flex flex-col md:flex-row gap-2 w-full mt-4">
              <Button
                className="md:w-1/2 w-full h-[40px]"
                onClick={handleGenerate}
                disabled={!file || !model || resultLoading}
              >
                {resultLoading ? "Processing..." : "Generate"}
              </Button>

              <Button
                className="md:w-1/2 w-full h-[40px]"
                variant="outline"
                // onClick={handleGenerate3D}
                // disabled={!file || resultLoading}
                disabled
              >
                Generate 3D
              </Button>
            </div>
          ) : (
            <Button
              className="w-full h-[40px] mt-4"
              onClick={handleGenerate}
              disabled={!file || !model || resultLoading}
            >
              {resultLoading ? "Processing..." : "Generate"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

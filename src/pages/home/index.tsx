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

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [model, setModel] = useState<string>("");
  const [previewList, setPreviewList] = useState<string[]>([]);
  const [resultList, setResultList] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;

    setFile(uploaded);
    setPreviewList([]);
    setResultList([]);
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
      }
    } else {
      const url = URL.createObjectURL(uploaded);
      setPreviewList([url]);
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
    setResultList([]);
    setSelectedIndex(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerate = async () => {
    if (!file || !model) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", model);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const baseUrl = "http://localhost:8000";

      if (data.is_tif && Array.isArray(data.results)) {
        setResultList(data.results.map((url: string) => baseUrl + url));
      } else if (data.image_url) {
        setResultList([baseUrl + data.image_url]);
      }
    } catch (error) {
      console.error("Lỗi xử lý ảnh:", error);
    }
  };

  const activePreview = previewList[selectedIndex] || null;
  const activeResult = resultList[selectedIndex] || null;

  return (
    <div className="w-screen min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-7xl shadow-lg border rounded-2xl">
        <CardContent className="p-10 space-y-8">
          <h1 className="text-3xl font-bold text-center">Demo OCT Image AI</h1>

          <div className="space-y-2">
            <Label htmlFor="model">Chọn mô hình</Label>
            <Select onValueChange={setModel}>
              <SelectTrigger id="model" className="w-full">
                <SelectValue placeholder="Chọn một mô hình" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="model1">Model 1</SelectItem>
                <SelectItem value="model2">Model 2</SelectItem>
                <SelectItem value="model3">Model 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">Tải ảnh OCT</Label>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-[4/3] bg-white border-2 border-dashed rounded-md flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-50 relative"
              >
                {activePreview ? (
                  <img
                    src={activePreview}
                    alt="Preview"
                    className="object-contain max-h-full max-w-full"
                  />
                ) : (
                  <span className="text-gray-400 text-sm text-center px-4">
                    Click hoặc kéo & thả ảnh vào đây
                  </span>
                )}
                {file && (
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white rounded-full shadow p-1 hover:bg-gray-100 z-10"
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
                Kết quả sau khi xử lý
              </Label>
              <div className="w-full aspect-[4/3] border rounded-md flex items-center justify-center overflow-hidden bg-white">
                {activeResult ? (
                  <img
                    src={activeResult}
                    alt="Result"
                    className="object-contain max-h-full max-w-full"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Chưa có kết quả</span>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnail selector */}
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

          <Button
            className="w-full h-[40px] mt-4"
            onClick={handleGenerate}
            disabled={!file || !model}
          >
            Generate
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

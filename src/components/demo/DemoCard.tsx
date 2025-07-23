import { useRef, useState } from "react";
import UploadBox from "./UploadBox";
import ResultPanel from "./ResultPanel";
import ModelSelector from "./ModelSelector";
import FrameThumbnailList from "./FrameThumbnailList";
import GenerateActions from "./GenerateActions";

export interface ResultFrame {
  frame_index: number;
  url: string;
  summary?: string;
  num_boxes?: number;
  boxes?: any[];
  vessel_type?: string;
  class_distribution?: string;
}

export default function DemoCard() {
  const [file, setFile] = useState<File | null>(null);
  const [model, setModel] = useState<string>("");
  const [previewList, setPreviewList] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [resultLoading, setResultLoading] = useState(false);
  const [resultFrames, setResultFrames] = useState<ResultFrame[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    setPreviewLoading(true);
    setFile(file);
    setPreviewList([]);
    setResultFrames([]);
    setSelectedIndex(0);

    const isTiff =
      file.name.toLowerCase().endsWith(".tif") ||
      file.name.toLowerCase().endsWith(".tiff");

    if (isTiff) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch(
          "https://levy-items-holly-learned.trycloudflare.com/uploadImage",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        const baseUrl = "https://levy-items-holly-learned.trycloudflare.com";
        const urls = data.image_urls.map((url: string) => baseUrl + url);
        setPreviewList(urls);
      } catch (err) {
        console.error("Failed to upload TIFF:", err);
      } finally {
        setPreviewLoading(false);
      }
    } else {
      setPreviewList([URL.createObjectURL(file)]);
      setPreviewLoading(false);
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
      const res = await fetch(
        "https://levy-items-holly-learned.trycloudflare.com/predict",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      const baseUrl = "https://levy-items-holly-learned.trycloudflare.com";

      if (data.is_tif && Array.isArray(data.frames)) {
        setResultFrames(
          data.frames.map((f: any) => ({ ...f, url: baseUrl + f.url }))
        );
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
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setResultLoading(false);
    }
  };

  const activePreview = previewList[selectedIndex] || null;
  const activeResult =
    resultFrames.find((f) => f.frame_index === selectedIndex)?.url || null;

  return (
    <div className="w-full max-w-7xl shadow-lg border rounded-2xl bg-white">
      <div className="p-10 space-y-8">
        <h1 className="text-3xl font-bold text-center">Demo OCT Image AI</h1>

        <ModelSelector setModel={setModel} setResultFrames={setResultFrames} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UploadBox
            file={file}
            previewUrl={activePreview}
            fileInputRef={fileInputRef}
            previewLoading={previewLoading}
            onFileChange={handleFileChange}
            onClear={handleClear}
          />
          <ResultPanel
            resultUrl={activeResult}
            resultLoading={resultLoading}
            resultFrame={resultFrames[selectedIndex]}
            model={model}
          />
        </div>

        {previewList.length > 1 && (
          <FrameThumbnailList
            previewList={previewList}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        )}

        <GenerateActions
          model={model}
          resultLoading={resultLoading}
          file={file}
          onGenerate={handleGenerate}
        />
      </div>
    </div>
  );
}

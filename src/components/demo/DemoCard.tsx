"use client";

import { useRef, useState } from "react";
import UploadBox from "./UploadBox";
import ResultPanel from "./ResultPanel";
import ModelSelector from "./ModelSelector";
import FrameThumbnailList from "./FrameThumbnailList";
import GenerateActions from "./GenerateActions";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  usePostPredict,
  useUploadImage,
} from "../../services/hooks/hookPredict";

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
  const [model, setModel] = useState<string>("model1");
  const [previewList, setPreviewList] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [resultLoading, setResultLoading] = useState(false);
  const [resultFrames, setResultFrames] = useState<ResultFrame[]>([]);
  const [task, setTask] = useState("predict");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { postPostPredict } = usePostPredict();
  const { postUploadImage } = useUploadImage();

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
        const res = await postUploadImage(formData);
        const data = res.data;
        const baseUrl = import.meta.env.VITE_API_BACKEND_DOMAIN;
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
    formData.append("task", task);
    setResultLoading(true);
    console.log(formData);
    try {
      const res = await postPostPredict(formData);
      const data = res.data;
      const baseUrl = import.meta.env.VITE_API_BACKEND_DOMAIN;

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
    <div className="flex w-full h-full gap-6">
      <div className="flex-1 shadow-lg border rounded-2xl bg-white p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="max-h-[70vh] overflow-auto">
            <UploadBox
              file={file}
              previewUrl={activePreview}
              fileInputRef={fileInputRef}
              previewLoading={previewLoading}
              onFileChange={handleFileChange}
              onClear={handleClear}
            />
          </div>
          <div className="max-h-[70vh] overflow-auto">
            <ResultPanel
              resultUrl={activeResult}
              resultLoading={resultLoading}
              resultFrame={resultFrames[selectedIndex]}
              model={model}
            />
          </div>
        </div>

        {previewList.length > 1 && (
          <div className="overflow-x-auto">
            <FrameThumbnailList
              previewList={previewList}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          </div>
        )}

        <GenerateActions
          model={model}
          resultLoading={resultLoading}
          file={file}
          onGenerate={handleGenerate}
        />
      </div>
      <div className="w-full min-w-[200px] max-w-[500px] p-4 md:p-6 bg-white shadow-lg border-r rounded-2xl space-y-4">
        <Label className="text-xl font-bold block">Select Model</Label>

        <ModelSelector
          model={model}
          setModel={(id) => {
            setModel(id);
            setResultFrames([]);
            if (id !== "model1") setTask("predict");
          }}
        />

        {model === "model1" && (
          <div className="space-y-2">
            <Label className="text-xl font-bold block">Select Task</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={task === "predict" ? "default" : "outline"}
                onClick={() => {
                  setTask("predict");
                  setResultFrames([]);
                }}
              >
                Predict Stent & GuideWire
              </Button>
              <Button
                variant={task === "segment" ? "default" : "outline"}
                onClick={() => {
                  setTask("segment");
                  setResultFrames([]);
                }}
              >
                Segment Lumen & SideBranch
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

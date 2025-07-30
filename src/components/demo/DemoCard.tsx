"use client";

import { useEffect, useRef, useState } from "react";
import {
  usePostPredict,
  useUploadImage,
} from "../../services/hooks/hookPredict";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { mergeFramesHorizontally } from "../utils/mergeFramesHorizontally";
import GenerateActions from "./GenerateActions";
import ModelSelector from "./ModelSelector";
import ResultPanel from "./ResultPanel";
import UploadBox from "./UploadBox";
import { toastSuccess, toastError } from "../Toast";

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
  const [mergedStrip, setMergedStrip] = useState<string | null>(null);
  const [task, setTask] = useState("predict");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { postPostPredict } = usePostPredict();
  const { postUploadImage } = useUploadImage();
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
    const index = Math.floor(ratio * previewList.length);

    if (index >= 0 && index < previewList.length) {
      setSelectedIndex(index);
      setSliderX(offsetX);
      setHoverX(null);
    }
  };
  useEffect(() => {
    if (previewList.length > 1) {
      mergeFramesHorizontally(previewList).then(setMergedStrip);
    } else {
      setMergedStrip(null);
    }
  }, [previewList]);

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
        const stripUrl = baseUrl + data.unrolled_url;

        setPreviewList(urls);
        setMergedStrip(stripUrl);
        toastSuccess("Uploaded and processed image successfully!");
      } catch (err) {
        console.error("Failed to upload TIFF:", err);
        toastError("Failed to upload image.");
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
      toastSuccess("Prediction complete!");
    } catch (err) {
      console.error("Error:", err);
      toastError("Prediction failed.");
    } finally {
      setResultLoading(false);
    }
  };

  const activePreview = previewList[selectedIndex] || null;
  const activeResult =
    resultFrames.find((f) => f.frame_index === selectedIndex)?.url || null;

  const sampleImages = [
    "/sample_images/1.png",
    "/sample_images/2.png",
    "/sample_images/3.png",
    "/sample_images/4.png",
    "/sample_images/5.png",
  ];

  return (
    <>
      <div className="w-full mt-8 mb-8 text-center space-y-2 max-w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900">
          An AI-powered assistant for OCT and Angiography image interpretation
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium">
          Fast. Accurate. Ready for clinical applications.
        </p>
      </div>
      <div className="flex w-full gap-6 items-start">
        <div className="flex-1 min-w-0 shadow-lg border rounded-2xl bg-white p-4 md:p-6 space-y-6">
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

          {mergedStrip && (
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
          )}
          <div className="space-y-2 mb-4">
            <Label className="text-md font-semibold">Example Images</Label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {sampleImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`sample-${index}`}
                  className="w-24 h-24 object-cover rounded cursor-pointer border hover:border-blue-500"
                  onClick={async () => {
                    try {
                      const response = await fetch(src);
                      const blob = await response.blob();
                      const file = new File([blob], `sample-${index}.jpg`, {
                        type: blob.type,
                      });
                      handleFileChange(file);
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (err) {
                      toastError("Failed to load sample image");
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <GenerateActions
            model={model}
            resultLoading={resultLoading}
            file={file}
            onGenerate={handleGenerate}
          />
        </div>

        {/* RIGHT PANEL: Model Selector */}
        <div className="w-[400px] flex-shrink-0 p-4 md:p-6 bg-white shadow-lg border rounded-2xl space-y-4">
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
          {model === "model2" && (
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
                  Segment Calcium
                </Button>
                <Button
                  variant={task === "segment" ? "default" : "outline"}
                  onClick={() => {
                    setTask("segment");
                    setResultFrames([]);
                  }}
                >
                  Detect EEL
                </Button>
              </div>
            </div>
          )}
          {model === "model3" && (
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
                  Segment Calcium
                </Button>
                <Button
                  variant={task === "predict" ? "default" : "outline"}
                  onClick={() => {
                    setTask("predict");
                    setResultFrames([]);
                  }}
                >
                  FFR Prediction
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

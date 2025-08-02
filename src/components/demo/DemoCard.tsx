"use client";

import { useRef, useState } from "react";
import {
  usePostPredict,
  useUploadImage,
} from "../../services/hooks/hookPredict";
import { getSampleImages } from "../data";
import { toastError, toastSuccess } from "../Toast";
import { Label } from "../ui/label";
import FeedbackDialog from "./FeedbackDialog";
import GenerateActions from "./GenerateActions";
import ModelSelector from "./ModelSelector";
import ResultPanel from "./ResultPanel";
import SampleImagesSelector from "./SampleImagesSelector ";
import MergedStripPreview from "./StripPreview";
import TaskSelector from "./TaskSelector";
import UploadBox from "./UploadBox";

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
  const [activeSampleIndex, setActiveSampleIndex] = useState<number | null>(
    null
  );
  const sampleImages = getSampleImages(model);


  async function fetchImageBlobUrl(url: string): Promise<string> {
    const res = await fetch(url, {
      headers: { "ngrok-skip-browser-warning": "1" },
    });
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }

  const handleFileChange = async (file: File) => {
    setPreviewLoading(true);
    setFile(file);
    setPreviewList([]);
    setResultFrames([]);
    setSelectedIndex(0);

    const ext = file.name.toLowerCase();
    const isMultiFrame = ext.endsWith(".tif") || ext.endsWith(".tiff") || ext.endsWith(".dcm");

    if (isMultiFrame) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await postUploadImage(formData);
        const data = res.data;
        const baseUrl = "https://flexible-bonefish-witty.ngrok-free.app";

        // ❗️Fetch qua blob để tránh ORB
        const urls = await Promise.all(
          data.image_urls.map((url: string) =>
            fetchImageBlobUrl(baseUrl + url)
          )
        );
        const stripUrl = await fetchImageBlobUrl(baseUrl + data.unrolled_url);

        setPreviewList(urls);
        setMergedStrip(stripUrl);
        toastSuccess("Uploaded and processed image successfully!");
      } catch (err) {
        console.error("Failed to upload image:", err);
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
    setMergedStrip("");
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
      const baseUrl = "https://flexible-bonefish-witty.ngrok-free.app";

      if (data.is_tif && Array.isArray(data.frames)) {
        const framesWithBlobs = await Promise.all(
          data.frames.map(async (f: any) => ({
            ...f,
            url: await fetchImageBlobUrl(baseUrl + f.url),
          }))
        );
        setResultFrames(framesWithBlobs);
      } else if (data.image_url) {
        const blobUrl = await fetchImageBlobUrl(baseUrl + data.image_url);
        setResultFrames([
          {
            frame_index: 0,
            url: blobUrl,
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
            <div className="max-h-[80vh] overflow-auto">
              <UploadBox
                file={file}
                previewUrl={activePreview}
                fileInputRef={fileInputRef}
                previewLoading={previewLoading}
                onFileChange={handleFileChange}
                onClear={handleClear}
                model={model}
                extraContent={
                  model !== "model3" && (
                    <SampleImagesSelector
                      sampleImages={sampleImages}
                      activeIndex={activeSampleIndex}
                      onSelect={async (index, file) => {
                        await handleFileChange(file);
                        setActiveSampleIndex(index);
                        setMergedStrip("");
                      }}
                    />
                  )
                }
              />
            </div>
            <div className="max-h-[80vh] overflow-auto">
              <ResultPanel
                resultUrl={activeResult}
                resultLoading={resultLoading}
                resultFrame={resultFrames[selectedIndex]}
                model={model}
              />
            </div>
          </div>

          {model !== "model3" && mergedStrip && (
            <MergedStripPreview
              mergedStrip={mergedStrip}
              setSelectedIndex={setSelectedIndex}
              previewListLength={previewList.length}
            />
          )}
          <GenerateActions
            model={model}
            resultLoading={resultLoading}
            file={file}
            onGenerate={handleGenerate}
          />
        </div>

        <div className="w-[400px] flex-shrink-0 p-4 md:p-6 bg-white shadow-lg border rounded-2xl space-y-4">
          <Label className="text-xl font-bold block">
            {" "}
            Select AI modules including:
          </Label>

          <ModelSelector
            model={model}
            setModel={(id) => {
              setModel(id);
              setResultFrames([]);
              setActiveSampleIndex(null);
              if (id !== "model1") setTask("predict");
            }}
          />
          <TaskSelector
            model={model}
            task={task}
            setTask={setTask}
            clearResults={() => setResultFrames([])}
          />
        </div>
      </div>

      <FeedbackDialog />
    </>
  );
}

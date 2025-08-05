import { useEffect, useRef, useState } from "react";
import { toastError, toastSuccess } from "../../components/Toast";
import Sidebar3DSettings from "../../components/demo/Sidebar3DForm";
import { useGenerate3DOBJ } from "../../services/hooks/hook3D";
import Canvas3d from "../../components/demo/Canvas3d";
import Upload3DBox from "../../components/demo/Uploap3DBox";
import FullPageLoader from "../../components/demo/FullPageLoader";

export default function ThreeD() {
  const [file, setFile] = useState<File | null>(null);
  const [objUrl, setObjUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { postUploadImage } = useGenerate3DOBJ();

  const handleFileChange = (newFile: File) => setFile(newFile);

  const handleClear = () => {
    setFile(null);
    setObjUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    document.body.style.overflow = objUrl ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [objUrl]);

  // async function fetchBlobUrl(url: string): Promise<string> {
  //   const res = await fetch(url, {
  //     headers: { "ngrok-skip-browser-warning": "1" },
  //   });
  //   const blob = await res.blob();
  //   return URL.createObjectURL(blob);
  // }

  const handleSubmit = async () => {
    if (!file) {
      toastError("Please upload a TIF file first.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await postUploadImage(formData);

      if (result?.data?.obj_url) {
        // const blobUrl = await fetchBlobUrl(result.data.obj_url);
        setObjUrl(result.data.obj_url);
        toastSuccess("3D model generated successfully.");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      toastError("Failed to process 3D file.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport3D = () => {
    if (!objUrl) {
      toastError("No 3D model to export.");
      return;
    }

    const filename = "model.obj";
    fetch(objUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        toastSuccess("3D model exported.");
      })
      .catch(() => {
        toastError("Failed to export 3D model.");
      });
  };

  return (
    <div className="w-full h-screen flex overflow-hidden pt-[65px]">
      <div className="relative h-full flex-grow">
        {objUrl ? (
          <Canvas3d src={objUrl} />
        ) : (
          <div className="flex justify-center items-center h-full">
            <Upload3DBox
              onFileChange={handleFileChange}
              onClear={handleClear}
              inputRef={inputRef}
            />
          </div>
        )}
      </div>

      <Sidebar3DSettings
        onGenerate={handleSubmit}
        onExport={handleExport3D}
        onClear={handleClear}
        disableGenerate={loading || !file}
        disableExport={!objUrl}
      />
      {loading && <FullPageLoader />}
    </div>
  );
}

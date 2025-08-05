import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

interface Sidebar3DSettingsProps {
  onGenerate: () => void;
  onExport: () => void;
  onClear: () => void;
  disableGenerate?: boolean;
  disableExport?: boolean;
}

export default function Sidebar3DSettings({
  onGenerate,
  onExport,
  onClear,
  disableGenerate,
  disableExport,
}: Sidebar3DSettingsProps) {
  const handleGenerateClick = () => {
    onGenerate();
  };

  return (
    <div className="w-[25rem] bg-gradient-to-r from-[#c3cfe2] to-[#f5f7fa] text-white p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-lg text-black font-bold text-center mb-4">
          DEMO 3D
        </h2>
        <div className="h-px bg-gradient-to-r from-sky-800 to-sky-600 mb-4" />

        <Alert className="mt-4 bg-white/70 border border-sky-300 text-gray-800 backdrop-blur-sm">
          <AlertTitle className="flex items-center gap-2 text-sky-800 font-semibold">
            <Info className="w-4 h-4 text-sky-500" />
            Usage Guide
          </AlertTitle>
          <AlertDescription className="text-gray-700 mt-2 text-sm space-y-1">
            <ul className="list-disc list-inside space-y-1">
              <li>
                Upload an OCT image file in <code>.tif</code> or{" "}
                <code>.dcm</code> format.
              </li>
              <li>
                Click <strong>Generate</strong> to create the 3D model.
              </li>
              <li>
                Once processed, the 3D model will appear on the left panel.
              </li>
              <li>
                Click <strong>Export</strong> to download the model as a{" "}
                <code>.obj</code> file.
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="secondary"
            onClick={onClear}
            className="bg-gray-500 hover:bg-gray-600 text-black"
          >
            CLEAR
          </Button>
          <Button
            onClick={handleGenerateClick}
            disabled={disableGenerate}
            className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-black"
          >
            GENERATE
          </Button>
        </div>
      </div>

      <div className="mt-6 text-right">
        <div className="w-full h-px bg-gradient-to-r from-sky-800 to-sky-600 mb-4" />
        <Button
          onClick={onExport}
          disabled={disableExport}
          className="bg-sky-500 hover:bg-sky-400 w-full disabled:opacity-50 text-black"
        >
          EXPORT
        </Button>
      </div>
    </div>
  );
}

import { Label } from "../ui/label";
import type { ResultFrame } from "./DemoCard";

interface ResultPanelProps {
  resultUrl: string | null;
  resultLoading: boolean;
  resultFrame: ResultFrame | undefined;
  model: string;
}

export default function ResultPanel({
  resultUrl,
  resultLoading,
  resultFrame,
  model,
}: ResultPanelProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Results after processing</Label>
      <div className="w-full aspect-[4/3] border rounded-md flex items-center justify-center overflow-hidden bg-white">
        {resultLoading ? (
          <div className="flex flex-col items-center gap-1 text-sm text-gray-500">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : resultUrl ? (
          <img
            src={resultUrl}
            alt="Result"
            className="object-contain max-h-full max-w-full"
          />
        ) : (
          <span className="text-gray-400 text-sm">No results</span>
        )}
      </div>

      {resultFrame && (
        <div className="text-sm text-gray-600 mt-1 space-y-1">
          {model === "model3" ? (
            <>
              <div>
                <strong>Vessel type:</strong>{" "}
                {resultFrame.vessel_type || "Unknown"}
              </div>
              <div>
                <strong>Detected classes:</strong>{" "}
                {typeof resultFrame.class_distribution === "object"
                  ? Object.entries(resultFrame.class_distribution)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(", ")
                  : resultFrame.class_distribution || "None"}
              </div>
            </>
          ) : (
            resultFrame.summary && (
              <div>
                <strong>Summary:</strong> {resultFrame.summary}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

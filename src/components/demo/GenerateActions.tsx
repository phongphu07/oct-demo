import { Button } from "../ui/button";

interface GenerateActionsProps {
  model: string;
  file: File | null;
  resultLoading: boolean;
  onGenerate: () => void;
}

export default function GenerateActions({
  model,
  file,
  resultLoading,
  onGenerate,
}: GenerateActionsProps) {
  if (model === "model3") {
    return (
      <div className="flex flex-col md:flex-row gap-2 w-full mt-4">
        <Button
          className="md:w-1/2 w-full h-[40px]"
          onClick={onGenerate}
          disabled={!file || !model || resultLoading}
        >
          {resultLoading ? "Processing..." : "Generate"}
        </Button>

        <Button className="md:w-1/2 w-full h-[40px]" variant="outline" disabled>
          Generate 3D (Coming Soon)
        </Button>
      </div>
    );
  }

  return (
    <Button
      className="w-full h-[40px] mt-4"
      onClick={onGenerate}
      disabled={!file || !model || resultLoading}
    >
      {resultLoading ? "Processing..." : "Generate"}
    </Button>
  );
}

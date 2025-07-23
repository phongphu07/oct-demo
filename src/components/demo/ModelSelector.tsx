import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { ResultFrame } from "./DemoCard";

interface ModelSelectorProps {
  setModel: (model: string) => void;
  setResultFrames: (frames: ResultFrame[]) => void;
}

export default function ModelSelector({
  setModel,
  setResultFrames,
}: ModelSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="model">Select model</Label>
      <Select
        onValueChange={(value) => {
          setModel(value);
          setResultFrames([]);
        }}
      >
        <SelectTrigger id="model" className="w-full">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="model1">Predict Stent Guidewire</SelectItem>
          <SelectItem value="model2">Segmentation Lumen SideBranch</SelectItem>
          <SelectItem value="model3">Angio FFR</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

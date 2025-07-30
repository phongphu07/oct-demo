import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface TaskSelectorProps {
  model: string;
  task: string;
  setTask: (task: string) => void;
  clearResults: () => void;
}

const taskOptions: Record<string, { key: string; label: string }[]> = {
  model1: [
    { key: "predict", label: "Predict Stent & GuideWire" },
    { key: "segment", label: "Segment Lumen & SideBranch" },
  ],
  model2: [
    { key: "predict", label: "Segment Calcium" },
    { key: "segment", label: "Detect EEL" },
  ],
  model3: [{ key: "predict", label: "FFR Prediction" }],
};

export default function TaskSelector({
  model,
  task,
  setTask,
  clearResults,
}: TaskSelectorProps) {
  const tasks = taskOptions[model] || [];

  if (tasks.length === 0) return null;

  return (
    <div className="space-y-2">
      <Label className="text-xl font-bold block">Select Task</Label>
      <div className="flex flex-wrap gap-2">
        {tasks.map((t) => (
          <Button
            key={t.key}
            variant={task === t.key ? "default" : "outline"}
            onClick={() => {
              setTask(t.key);
              clearResults();
            }}
          >
            {t.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

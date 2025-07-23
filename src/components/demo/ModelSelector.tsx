interface ModelCardProps {
  id: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

function ModelCard({
  id,
  title,
  description,
  selected,
  onSelect,
}: ModelCardProps) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`rounded-lg border-2 p-4 cursor-pointer transition-all hover:shadow-sm
        ${
          selected
            ? "border-black bg-white text-black"
            : "border-gray-200 bg-white text-gray-500"
        }`}
    >
      <h3
        className={`font-semibold text-base mb-1 ${
          selected ? "text-black" : "text-gray-800"
        }`}
      >
        {title}
      </h3>
      <p className="text-sm">{description}</p>
    </div>
  );
}

interface Props {
  model: string;
  setModel: (value: string) => void;
  clearResult?: () => void;
}

export default function ModelSelector({ model, setModel, clearResult }: Props) {
  const models = [
    {
      id: "model1",
      title: "Lumen + GuideWire + SideBranch + Stent",
      description:
        "Supports multi-task analysis: segmentation of lumen and side branch, prediction of stent and guidewire.",
    },
    {
      id: "model2",
      title: "Calcium + EEL Detection",
      description: "Detects calcium and external elastic lamina (EEL) regions.",
    },
    {
      id: "model3",
      title: "Angio OCT FFR Estimation",
      description:
        "Estimates fractional flow reserve (FFR) from Angio OCT images.",
    },
  ];

  const handleSelect = (id: string) => {
    setModel(id);
    if (clearResult) clearResult();
  };

  return (
    <div className="space-y-4">
      {models.map((m) => (
        <ModelCard
          key={m.id}
          id={m.id}
          title={m.title}
          description={m.description}
          selected={model === m.id}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}

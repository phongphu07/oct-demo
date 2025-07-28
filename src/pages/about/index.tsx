export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About This Project</h1>
      <p className="text-gray-700 mb-4">
        This OCT AI analysis web application was developed by a research team
        aiming to support medical imaging diagnosis using state-of-the-art deep
        learning models.
      </p>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>Built with React, TailwindCSS, ShadCN UI</li>
        <li>Backend: FastAPI + YOLOv8 Model</li>
        <li>Supports single and multi-frame image formats</li>
      </ul>
    </div>
  );
}

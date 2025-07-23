export default function DocsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">User Guide</h1>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>Supported formats: .png, .jpg, .jpeg, .tif, .tiff</li>
        <li>Click or drag & drop image to upload</li>
        <li>Select model before generating</li>
        <li>If uploading a TIF file, select frame before viewing result</li>
      </ul>
    </div>
  );
}

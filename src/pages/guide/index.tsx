import { UploadCloud, Brain, ImagePlus } from "lucide-react";

export default function GuidePage() {
  return (
    <div className="py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          How to Use the OCT AI Demo
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Follow the steps below to try our AI-powered OCT image analysis demo.
        </p>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <UploadCloud className="w-10 h-10 text-blue-500 shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-1">1. Upload an Image</h2>
              <p className="text-gray-600">
                Click the "Upload" button to select an OCT image in PNG/JPG
                format or a multi-frame TIF file. The system supports both
                single-frame and multi-frame input.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <Brain className="w-10 h-10 text-green-500 shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-1">2. Select a Model</h2>
              <p className="text-gray-600">
                Choose an AI model from the dropdown list to process your
                uploaded image. Each model may yield different results depending
                on its capability.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <ImagePlus className="w-10 h-10 text-yellow-500 shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-1">
                3. Generate & View Results
              </h2>
              <p className="text-gray-600">
                Click the "Generate" button to run the analysis. The system will
                display the processed image, detected regions of interest, and a
                summary of the results.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg"
          >
            Try the Demo Now
          </a>
        </div>
      </div>
    </div>
  );
}

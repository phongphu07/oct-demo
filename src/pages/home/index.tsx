import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Welcome to OCT Image AI</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        This web app allows you to upload OCT images and get intelligent
        predictions using AI models.
      </p>
      <Link to="/demo">
        <Button className="text-lg px-6 py-3">Go to Demo</Button>
      </Link>
    </div>
  );
}

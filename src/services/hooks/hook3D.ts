import { useGenerate3D } from "../apis/3d";
import { usePostAPI } from "./hookApi";

const useGenerate3DOBJ = () => {
  const {
    loading,
    post: postUploadImage,
    error,
    setError,
  } = usePostAPI(useGenerate3D);
  return {
    loading,
    postUploadImage,
    error,
    setError,
  };
};
export { useGenerate3DOBJ };

import { postPredict, uploadImage } from "../apis/predict";
import { usePostAPI } from "./hookApi";

const useUploadImage = () => {
  const {
    loading,
    post: postUploadImage,
    error,
    setError,
  } = usePostAPI(uploadImage);
  return {
    loading,
    postUploadImage,
    error,
    setError,
  };
};

const usePostPredict = () => {
  const {
    loading,
    post: postPostPredict,
    error,
    setError,
  } = usePostAPI(postPredict);
  return {
    loading,
    postPostPredict,
    error,
    setError,
  };
};

export { useUploadImage, usePostPredict };

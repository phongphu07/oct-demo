import { restTransport } from "../../lib/api";

const { post } = restTransport();

export const uploadImage = async (formData: FormData) => {
  return await post("/uploadImage", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const postPredict = async (formData: FormData) => {
  return await post("/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

import { restTransport } from "../../lib/api";

const { post } = restTransport();

export const useGenerate3D = async (formData: FormData) => {
  return await post("/generate3d", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

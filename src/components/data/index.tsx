export const sampleImagesByModel: Record<string, string[]> = {
  model1: ["/sample_images/model1/1.png", "/sample_images/model1/2.png"],
  model2: ["/sample_images/model2/1.png", "/sample_images/model2/2.png"],
  model3: ["/sample_images/model3/1.png", "/sample_images/model3/2.png"],
};

export function getSampleImages(model: string): string[] {
  return sampleImagesByModel[model] || [];
}

export const sampleImagesByModel: Record<string, string[]> = {
  model1: ["/sample_images/model1/1.png", "/sample_images/model1/2.png", "/sample_images/model1/3.png", "/sample_images/model1/4.png", "/sample_images/model1/5.png"],
  model2: ["/sample_images/model2/1.png", "/sample_images/model2/2.png", "/sample_images/model2/3.png", "/sample_images/model2/4.png", "/sample_images/model2/5.png"],
  // model3: ["/sample_images/model3/1.png", "/sample_images/model3/2.png"],
};

export function getSampleImages(model: string): string[] {
  return sampleImagesByModel[model] || [];
}

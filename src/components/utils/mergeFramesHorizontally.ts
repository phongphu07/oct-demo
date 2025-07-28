export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function mergeFramesHorizontally(urls: string[]): Promise<string> {
  const images = await Promise.all(urls.map(loadImage));

  const totalWidth = images.reduce((sum, img) => sum + img.width, 0);
  const maxHeight = Math.max(...images.map((img) => img.height));

  const canvas = document.createElement("canvas");
  canvas.width = totalWidth;
  canvas.height = maxHeight;

  const ctx = canvas.getContext("2d")!;
  let offsetX = 0;

  for (const img of images) {
    ctx.drawImage(img, offsetX, 0);
    offsetX += img.width;
  }

  return canvas.toDataURL(); // trả về base64 ảnh đã ghép
}

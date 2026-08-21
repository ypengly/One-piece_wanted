const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_BYTES = 30 * 1024 * 1024; // 30MB

export class ImageLoadError extends Error {}

export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      reject(new ImageLoadError("Please choose a JPG, PNG, or WEBP image."));
      return;
    }
    if (file.size > MAX_BYTES) {
      reject(new ImageLoadError("That image is too large. Please choose a file under 30MB."));
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new ImageLoadError("That file couldn't be read as an image."));
    };
    img.src = url;
  });
}

export function loadImageFromDataUrl(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new ImageLoadError("Couldn't process the captured photo."));
    img.src = dataUrl;
  });
}

export interface ImageTransform {
  /** 1 = image's cover-fit scale, >1 zooms in */
  zoom: number;
  /** horizontal pan in -1..1, relative to frame width */
  offsetX: number;
  /** vertical pan in -1..1, relative to frame height */
  offsetY: number;
  /** degrees */
  rotation: number;
  /** -100..100 */
  brightness: number;
  /** -100..100 */
  contrast: number;
  grayscale: boolean;
  sepia: boolean;
}

export interface PosterData {
  name: string;
  bounty: number;
  image: HTMLImageElement | null;
  transform: ImageTransform;
}

export const DEFAULT_TRANSFORM: ImageTransform = {
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  rotation: 0,
  brightness: 0,
  contrast: 0,
  grayscale: false,
  sepia: true,
};

export const DEFAULT_POSTER: PosterData = {
  name: "",
  bounty: 0,
  image: null,
  transform: { ...DEFAULT_TRANSFORM },
};

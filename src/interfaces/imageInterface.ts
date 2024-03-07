export interface IImage {
  id: number;
  image_url: string;
}

export interface IImageResponse {
  data: { [key: number]: IImage };
}

import { urls } from "../constants";
import { IImage, IImageResponse } from "../interfaces";
import { apiService, IRes } from "./apiServices";

const imagesService = {
  postAvatar: (userId: number, data: FormData): IRes<string> =>
    apiService.post(urls.avatar.byUserId(userId), data),
  deleteAvatar: (userId: number): IRes<void> =>
    apiService.delete(urls.avatar.byUserId(userId)),
  getGallery: (userId: number): IRes<IImageResponse> =>
    apiService.get(urls.gallery.all(userId)),
  getGalleryById: (userId: number, galleryId: number): IRes<IImage> =>
    apiService.get(urls.gallery.byId(userId, galleryId)),
  postPictureInGallery: (userId: number, data: FormData): IRes<IImage> =>
    apiService.post(urls.gallery.all(userId), data),
  deletePictureFromGalleryById: (
    userId: number,
    galleryId: number,
  ): IRes<void> => apiService.delete(urls.gallery.byId(userId, galleryId)),
};

export { imagesService };

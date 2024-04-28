import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { FC, PropsWithChildren } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IImage } from "../../../interfaces";
import { imagesActions } from "../../../redux";
import styles from "../Gallery.module.scss";

interface IProps extends PropsWithChildren {
  image: IImage;
}

const GalleryDetails: FC<IProps> = ({ image }) => {
  const { id, image_url } = image;
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const deleteImageFromGallery = async () => {
    await dispatch(
      imagesActions.deletePictureFromGalleryById({
        userId: user.data.id,
        galleryId: id,
      }),
    );
    dispatch(imagesActions.getGallery({ userId: user.data.id }));
  };

  return (
    <div className={styles.gallery__item}>
      <img
        className={styles.gallery__item__img}
        src={image_url}
        alt={`Image ${id}`}
      />
      <button
        className={styles.gallery__button__del}
        onClick={deleteImageFromGallery}
      >
        <DeleteForeverIcon />
      </button>
    </div>
  );
};

export { GalleryDetails };

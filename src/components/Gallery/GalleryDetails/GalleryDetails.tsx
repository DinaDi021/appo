import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { FC } from "react";

import { IImage } from "../../../interfaces";
import styles from "../Gallery.module.scss";

interface IProps {
  image: IImage;
  onDelete: () => void;
}

const GalleryDetails: FC<IProps> = ({ image, onDelete }) => {
  const { id, image_url } = image;

  return (
    <div className={styles.gallery__item}>
      <img
        className={styles.gallery__item__img}
        src={image_url}
        alt={`Image ${id}`}
      />
      <button className={styles.gallery__button__del} onClick={onDelete}>
        <DeleteForeverIcon />
      </button>
    </div>
  );
};

export { GalleryDetails };

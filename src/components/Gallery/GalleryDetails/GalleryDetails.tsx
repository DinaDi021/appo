import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { FC, PropsWithChildren, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IImage } from "../../../interfaces";
import { imagesActions } from "../../../redux";
import { Modal } from "../../Modal/Modal";
import styles from "../Gallery.module.scss";

interface IProps extends PropsWithChildren {
  image: IImage;
}

const GalleryDetails: FC<IProps> = ({ image }) => {
  const { id, image_url } = image;
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const deleteImageFromGallery = async () => {
    setShowModal(false);
    await dispatch(
      imagesActions.deletePictureFromGalleryById({
        userId: user.id,
        galleryId: id,
      }),
    );
    dispatch(imagesActions.getGallery({ userId: user.id }));
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
        onClick={() => {
          setShowModal(true);
        }}
      >
        <DeleteForeverIcon />
      </button>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={deleteImageFromGallery}
      />
    </div>
  );
};

export { GalleryDetails };

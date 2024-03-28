import React, { FC, PropsWithChildren, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IImage } from "../../../interfaces";
import { imagesActions } from "../../../redux";
import styles from "../../LoginPanel/Form/Form.module.scss";

interface IProps extends PropsWithChildren {
  image: IImage;
}

const GalleryDetails: FC<IProps> = ({ image }) => {
  const { id, image_url } = image;
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>(
    {
      width: 320,
      height: 320,
    },
  );

  const deleteImageFromGallery = async () => {
    await dispatch(
      imagesActions.deletePictureFromGalleryById({
        userId: user.data.id,
        galleryId: id,
      }),
    );
    dispatch(imagesActions.getGallery({ userId: user.data.id }));
  };

  const toggleImageSize = () => {
    setImageSize((prevSize) =>
      prevSize.width === 320
        ? { width: 750, height: 750 }
        : { width: 320, height: 320 },
    );
  };

  return (
    <div>
      <div>
        <img
          className={styles.image__container}
          src={image_url}
          alt={`Picture ${id}`}
          style={{ width: imageSize.width, height: imageSize.height }}
          onClick={() => toggleImageSize()}
        />
        <button onClick={deleteImageFromGallery}>delete photo</button>
      </div>
    </div>
  );
};

export { GalleryDetails };

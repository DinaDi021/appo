import React, { FC, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { imagesActions } from "../../redux";
import styles from "./Gallery.module.scss";
import { GalleryDetails } from "./GalleryDetails/GalleryDetails";

const GalleryForMaster: FC = () => {
  const { gallery, error } = useAppSelector((state) => state.images);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const fileInput = useRef<HTMLInputElement>();

  const addImage = async () => {
    const formData = new FormData();
    const files: FileList = fileInput.current.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("images[]", files[i]);
    }
    const result = await dispatch(
      imagesActions.addPicturesToGallery({
        userId: user.id,
        data: formData,
      }),
    );

    if (result.payload && result.meta.requestStatus === "fulfilled") {
      dispatch(imagesActions.getGallery({ userId: user.id }));
    }
  };

  return (
    <>
      <div className={styles.gallery__container}>
        <h3>Gallery</h3>
        <h4>
          Is a place where you can upload photos of your work that clients can
          view on the artist's profile.
        </h4>
        <div>{error && <p>{error.message}</p>}</div>
        <button
          className={styles.gallery__button_add}
          onClick={() => fileInput.current.click()}
        >
          Add new photos
        </button>
        <input
          type={"file"}
          accept={"image/jpeg, image/png"}
          style={{ display: "none" }}
          onChange={addImage}
          ref={fileInput}
          multiple
        />
      </div>
      <div className={styles.gallery__list}>
        {gallery.length > 0 ? (
          gallery.map((image) => (
            <GalleryDetails key={image.id} image={image} />
          ))
        ) : (
          <div>No photo yet.</div>
        )}
      </div>
    </>
  );
};

export { GalleryForMaster };

import React, { FC, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { imagesActions } from "../../redux";
import { IsLoading } from "../IsLoading";
import { Modal } from "../Modal/Modal";
import styles from "./Gallery.module.scss";
import { GalleryDetails } from "./GalleryDetails/GalleryDetails";

const GalleryForMaster: FC = () => {
  const { gallery, error } = useAppSelector((state) => state.images);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const fileInput = useRef<HTMLInputElement>();
  const [showModal, setShowModal] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const { isLoading } = useAppSelector((state) => state.progress);

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

  const deleteImageFromGallery = async () => {
    if (selectedImageId) {
      await dispatch(
        imagesActions.deletePictureFromGalleryById({
          userId: user.id,
          galleryId: selectedImageId,
        }),
      );
      dispatch(imagesActions.getGallery({ userId: user.id }));
      setShowModal(false);
    }
  };

  const openModal = (id: number) => {
    setSelectedImageId(id);
    setShowModal(true);
  };

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <div className={styles.gallery__container}>
            <h4 className={styles.gallery__container__title}>Gallery</h4>
            <h5 className={styles.gallery__container__description}>
              Is a place where you can upload photos of your work that clients
              can view on the artist's profile.
            </h5>
            <div>{error && <p>The file is too large</p>}</div>
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
                <GalleryDetails
                  key={image.id}
                  image={image}
                  onDelete={() => openModal(image.id)}
                />
              ))
            ) : (
              <div>No photo yet.</div>
            )}
          </div>
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={deleteImageFromGallery}
          />
        </>
      )}
    </>
  );
};

export { GalleryForMaster };

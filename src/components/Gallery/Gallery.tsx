import React, { FC, useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { imagesActions } from "../../redux";
import { GalleryDetails } from "./GalleryDetails/GalleryDetails";

const Gallery: FC = () => {
  const { gallery, error } = useAppSelector((state) => state.images);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const fileInput = useRef<HTMLInputElement>();

  useEffect(() => {
    dispatch(imagesActions.getGallery({ userId: user.data.id }));
  }, [dispatch]);

  const addImage = async () => {
    const formData = new FormData();
    const files: FileList = fileInput.current.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("images[]", files[i]);
    }
    const result = await dispatch(
      imagesActions.addPicturesToGallery({
        userId: user.data.id,
        data: formData,
      }),
    );

    if (result.payload && result.meta.requestStatus === "fulfilled") {
      dispatch(imagesActions.getGallery({ userId: user.data.id }));
    }
  };

  return (
    <>
      <div>
        <div>{error && <p>{error.message}</p>}</div>
        <button
          style={{ cursor: "pointer", width: "250px" }}
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
      <div>
        {gallery.length > 0 ? (
          gallery.map((image) => (
            <GalleryDetails key={image.id} image={image} />
          ))
        ) : (
          <p>No photo yet.</p>
        )}
      </div>
    </>
  );
};

export { Gallery };

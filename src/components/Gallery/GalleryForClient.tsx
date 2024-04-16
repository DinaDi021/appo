import React, { FC, PropsWithChildren, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IMaster } from "../../interfaces";
import { imagesActions } from "../../redux";
import { Slider } from "./Slider";

interface IProps extends PropsWithChildren {
  selectedMaster: IMaster;
}

const GalleryForClient: FC<IProps> = ({ selectedMaster }) => {
  const { gallery } = useAppSelector((state) => state.images);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedMaster) {
      dispatch(imagesActions.getGallery({ userId: selectedMaster.master_id }));
    }
  }, [dispatch, selectedMaster]);

  return (
    <>
      {gallery.length > 0 ? <Slider slides={gallery} /> : <p>No photo yet.</p>}
    </>
  );
};

export { GalleryForClient };

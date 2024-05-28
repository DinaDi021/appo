import React, { FC, useRef } from "react";

import styles from "./Modal.module.scss";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: FC<ModalProps> = ({ show, onClose, onConfirm }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      ref={modalRef}
    >
      <div className={styles.modal}>
        <div className={styles.modal__content}>
          <p>Are you sure you want to delete?</p>
          <div className={styles.modal__actions}>
            <button onClick={onClose} className={styles.modal__button}>
              Cancel
            </button>
            <button onClick={onConfirm} className={styles.modal__buttonConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Modal };

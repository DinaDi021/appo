import React from "react";

import styles from "./Modal.module.scss";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <p>Are you sure you want to delete?</p>
          <div className={styles.modalActions}>
            <button onClick={onClose} className={styles.modalButton}>
              Cancel
            </button>
            <button onClick={onConfirm} className={styles.modalButtonConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Modal };

import styles from "../CreateMaster/CreateMaster.module.scss";

const CreateStudio = () => {
  return (
    <div className={styles.addMaster__wrapper}>
      <h4 className={styles.addMaster__title}>
        Place for create studio in the future
      </h4>
      <div style={{ opacity: 0, height: "190px" }}>Soon</div>
    </div>
  );
};

export { CreateStudio };

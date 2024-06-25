import { CreateMasterForm } from "../../LoginPanel";
import styles from "./CreateMaster.module.scss";

const CreateMaster = () => {
  return (
    <div className={styles.addMaster__wrapper}>
      <h3 className={styles.addMaster__title}>
        To add a master - enter the details
      </h3>
      <CreateMasterForm />
    </div>
  );
};

export { CreateMaster };

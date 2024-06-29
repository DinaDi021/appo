import { CreateMasterForm } from "../../LoginPanel";
import styles from "./CreateMaster.module.scss";

const CreateMaster = () => {
  return (
    <div className={styles.addMaster__wrapper}>
      <h4 className={styles.addMaster__title}>
        To add a master - enter the details
      </h4>
      <CreateMasterForm />
    </div>
  );
};

export { CreateMaster };

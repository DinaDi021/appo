import styles from "../CreateMaster/CreateMaster.module.scss";
import { CreateServicesForm } from "./CreateServicesForm";

const CreateServices = () => {
  return (
    <div className={styles.addService__wrapper}>
      <h3 className={styles.addMaster__title}>
        To add new service - enter the details
      </h3>
      <CreateServicesForm />
    </div>
  );
};

export { CreateServices };

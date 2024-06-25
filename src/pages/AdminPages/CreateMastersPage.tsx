import { FC } from "react";

import { CreateMaster, CreateStudio } from "../../components";
import styles from "../../components/Admin/CreateMaster/CreateMaster.module.scss";

const CreateMastersPage: FC = () => {
  return (
    <div className={styles.addMaster__page}>
      <CreateMaster />
      <CreateStudio />
    </div>
  );
};

export { CreateMastersPage };

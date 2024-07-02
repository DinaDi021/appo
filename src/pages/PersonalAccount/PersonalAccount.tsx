import { AccountAdmin, AccountClient, AccountMaster } from "../../components";
import { useAppSelector } from "../../hooks";
import { LoginPage } from "../AuthPage/LoginPage";
import styles from "../pages.module.scss";

const PersonalAccount = () => {
  const { user } = useAppSelector((state) => state.auth);
  const userRole = user ? user.role : null;

  const renderAccountComponent = () => {
    if (userRole === "master") {
      return <AccountMaster />;
    } else if (userRole === "client") {
      return <AccountClient />;
    } else if (userRole === "admin") {
      return <AccountAdmin />;
    }
    if (!userRole) {
      return <LoginPage />;
    }
  };

  return (
    <div className={styles.personalAccount}>
      <>{renderAccountComponent()}</>
    </div>
  );
};

export { PersonalAccount };

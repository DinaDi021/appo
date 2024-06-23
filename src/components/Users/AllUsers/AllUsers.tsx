import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { FC, SyntheticEvent } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { filtersActions } from "../../../redux/slice/filtersSlice";
import { newTheme } from "../../Theme";
import styles from "../UsersInfo/UserInfo.module.scss";
import { AllUsersInfo } from "./AllUsersInfo/AllUsersInfo";

const AllUsers: FC = () => {
  const { users } = useAppSelector((state) => state.users);
  const { filterRole } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const roles: string[] = ["admin", "master", "client"];

  const handleRoleChange = (
    event: SyntheticEvent,
    selectedRole: string[] | null,
  ) => {
    dispatch(filtersActions.setRoleFilter(selectedRole));
  };

  const baseTheme = createTheme();

  return (
    <div className={styles.user__card__page}>
      <div className={styles.user__card__header}>
        <h2 className={styles.user__card__title}>List of users</h2>
        <ThemeProvider theme={newTheme(baseTheme)}>
          <Autocomplete
            multiple
            disablePortal
            id="role-autocomplete"
            size={"medium"}
            options={roles}
            value={filterRole || []}
            sx={{ width: 280 }}
            onChange={(event, value) => handleRoleChange(event, value)}
            renderInput={(params) => <TextField {...params} label="Roles" />}
          />
        </ThemeProvider>
      </div>
      <div className={styles.user__card}>
        {users.length > 0 ? (
          users.map((user) => <AllUsersInfo key={user.id} user={user} />)
        ) : (
          <div>No user yet.</div>
        )}
      </div>
    </div>
  );
};

export { AllUsers };

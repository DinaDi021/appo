import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { FC, SyntheticEvent } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IRoles } from "../../../interfaces";
import { filtersActions } from "../../../redux";
import { IsLoading } from "../../IsLoading";
import { newTheme } from "../../Theme";
import styles from "../../Users/UsersInfo/UserInfo.module.scss";
import { AllUsersInfo } from "./AllUsersInfo/AllUsersInfo";

const AllUsers: FC = () => {
  const { users } = useAppSelector((state) => state.users);
  const { roles } = useAppSelector((state) => state.admin);
  const { isLoading } = useAppSelector((state) => state.progress);
  const { filterRole } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const handleRoleChange = (event: SyntheticEvent, value: IRoles[]) => {
    const selectedRoleIds = value.map((role) => role.id);
    dispatch(filtersActions.setRoleFilter(selectedRoleIds));
  };
  const isOptionEqualToValue = (option: IRoles, value: IRoles) =>
    option.id === value.id;

  const baseTheme = createTheme();

  return (
    <div className={styles.user__card__page}>
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <div className={styles.user__card__header}>
            <h2 className={styles.user__card__title}>List of users</h2>
            <ThemeProvider theme={newTheme(baseTheme)}>
              <Autocomplete
                multiple
                disablePortal
                id="role-autocomplete"
                size={"medium"}
                value={roles.filter((role) => filterRole.includes(role.id))}
                options={roles}
                getOptionLabel={(role: IRoles) => role.role}
                onChange={handleRoleChange}
                isOptionEqualToValue={isOptionEqualToValue}
                sx={{
                  width: 280,
                  "@media (max-width: 550px)": {
                    width: "240px",
                  },
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Roles" />
                )}
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
        </>
      )}
    </div>
  );
};

export { AllUsers };

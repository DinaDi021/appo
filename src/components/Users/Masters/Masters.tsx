import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { usersActions } from "../../../redux";

const Masters = () => {
  const { users } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersActions.getAllUsers());
  }, [dispatch]);
  const masterUsers = users.filter((user) => user.data.role === "master");
  console.log(users);
  console.log(masterUsers);

  return (
    <div>
      <h1>All masters:</h1>
      <ul>
        {masterUsers.map((master) => (
          <div key={master.data.id}>
            <h3>{master.data.firstname} </h3>
            <h3>{master.data.lastname} </h3>
          </div>
        ))}
      </ul>
    </div>
  );
};

export { Masters };

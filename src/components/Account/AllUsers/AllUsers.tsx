import React, { FC, useEffect } from "react";

import { useAppDispatch } from "../../../hooks";
import { usersActions } from "../../../redux";

const AllUsers: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersActions.getAllUsers());
  }, [dispatch]);

  return <></>;
};

export { AllUsers };

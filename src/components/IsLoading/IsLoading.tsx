import { CircularProgress } from "@mui/material";
import React, { FC } from "react";

const IsLoading: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ color: "var(--green-jungle-crayola)" }} />
    </div>
  );
};

export { IsLoading };

import React, { FC, PropsWithChildren } from "react";

import { IMaster } from "../../../../interfaces";

interface IProps extends PropsWithChildren {
  availableSchedule: IMaster;
}
const AvailableSchedulesDetails: FC<IProps> = ({ availableSchedule }) => {
  const { master_firstname, master_lastname, categories } = availableSchedule;

  return (
    <div>
      <h4>{master_firstname}</h4>
      <h4>{master_lastname}</h4>
      <h4>{categories}</h4>
    </div>
  );
};

export { AvailableSchedulesDetails };

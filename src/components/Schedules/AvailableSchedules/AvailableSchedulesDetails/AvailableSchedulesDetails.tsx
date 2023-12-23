import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from "@mui/material/TextField/TextField";
import React, { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

import { IMaster } from "../../../../interfaces";

interface IProps extends PropsWithChildren {
  availableSchedule: IMaster;
}
const AvailableSchedulesDetails: FC<IProps> = ({ availableSchedule }) => {
  const { master_firstname, master_lastname, categories, schedules, prices } =
    availableSchedule;
  const navigate = useNavigate();
  const getSchedules = () => {
    navigate("/availableSchedules");
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const addToCard = () => {};
  return (
    <div>
      <h4>
        {master_firstname} {master_lastname}
      </h4>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={categories}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Categories" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={schedules}
        getOptionLabel={(schedule) => `${schedule.date} ${schedule.time}`}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Data and time" />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            {option.date} {option.time}
          </li>
        )}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={prices}
        getOptionLabel={(price) => `${price.title} ${price.price}`}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Title and price" />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            {option.title} - {option.price}
          </li>
        )}
      />
      <button onClick={addToCard}>Add to card</button>
      <button onClick={getSchedules}>Get all Masters available schedule</button>
    </div>
  );
};

export { AvailableSchedulesDetails };

import { Stack, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import React, { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { IMaster } from "../../../../interfaces";
import { IItem } from "../../../../interfaces/cartInterface";
import { cartsActions } from "../../../../redux";
import styles from "../../../LoginPanel/Form/Form.module.scss";

interface IProps extends PropsWithChildren {
  availableSchedule: IMaster;
}

const AvailableSchedulesDetails: FC<IProps> = ({ availableSchedule }) => {
  const { master_firstname, master_lastname, schedules, prices } =
    availableSchedule;
  const { user } = useAppSelector((state) => state.auth);
  const userId = user.data.id;
  const { selectedSchedule, selectedPrice, error } = useAppSelector(
    (state) => state.carts,
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getSchedules = () => {
    navigate("/availableSchedules");
  };

  const addToCart = async () => {
    if (userId && selectedSchedule && selectedPrice) {
      const data: IItem = {
        schedule_id: selectedSchedule.schedule_id,
        service_id: selectedPrice.service_id,
        price_id: selectedPrice.price_id,
        price: selectedPrice.price,
        title: selectedPrice.title,
        category: selectedPrice.category,
        master_firstname: master_firstname,
        master_lastname: master_lastname,
        date: selectedSchedule.date,
        time: selectedSchedule.time,
      };

      await dispatch(cartsActions.addItem({ userId, data }));
    }
  };

  return (
    <div>
      <h4>
        {master_firstname} {master_lastname}
      </h4>
      <br />
      <Stack spacing={1} sx={{ width: 300 }}>
        <Autocomplete
          id="auto-select"
          autoSelect
          options={schedules}
          getOptionLabel={(schedule) => `${schedule.date} ${schedule.time}`}
          sx={{ width: 300 }}
          value={selectedSchedule}
          onChange={(event, newValue) => {
            dispatch(cartsActions.setSelectedSchedule(newValue));
          }}
          isOptionEqualToValue={(option, value) =>
            option.schedule_id === value.schedule_id
          }
          renderInput={(params) => (
            <TextField {...params} label="Date and time" />
          )}
          renderOption={(props, option) => (
            <li {...props}>
              {option.date} {option.time}
            </li>
          )}
        />

        <Autocomplete
          id="auto-select"
          autoSelect
          options={prices}
          getOptionLabel={(price) => `${price.title} ${price.price}`}
          sx={{ width: 300 }}
          value={selectedPrice}
          onChange={(event, newValue) => {
            dispatch(cartsActions.setSelectedPrice(newValue));
          }}
          isOptionEqualToValue={(option, value) =>
            option.service_id === value.service_id &&
            option.price_id === value.price_id
          }
          renderInput={(params) => (
            <TextField {...params} label="Title and price" />
          )}
          renderOption={(props, option) => (
            <li {...props}>
              {option.title} - ${option.price}
            </li>
          )}
        />
      </Stack>
      <button onClick={addToCart}>Add to card</button>
      {error && <span className={styles.errMessage}>{error.message}</span>}
      <button onClick={getSchedules}>Get all Masters available schedule</button>
    </div>
  );
};

export { AvailableSchedulesDetails };

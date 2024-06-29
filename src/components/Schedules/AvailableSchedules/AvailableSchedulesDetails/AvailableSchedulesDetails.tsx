import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Stack, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { FC, PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router-dom";

import empty_person from "../../../../assets/img/empty_person.png";
import { useAppDispatch, useAppSelector, useToggle } from "../../../../hooks";
import { IMaster } from "../../../../interfaces";
import { IItem } from "../../../../interfaces/cartInterface";
import { cartsActions } from "../../../../redux";
import { newTheme } from "../../../Theme";
import styles from "../AvailableSchedules.module.scss";

interface IProps extends PropsWithChildren {
  availableSchedule: IMaster;
}

const AvailableSchedulesDetails: FC<IProps> = ({ availableSchedule }) => {
  const { master_firstname, master_lastname, master_image, schedules, prices } =
    availableSchedule;
  const { user } = useAppSelector((state) => state.auth);
  const successToggle = useToggle(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const userId = user?.id;
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
        date_time: selectedSchedule.date_time,
      };

      dispatch(cartsActions.addItem({ userId, data })).then((result) => {
        if (cartsActions.addItem.fulfilled.match(result)) {
          dispatch(cartsActions.setSelectedSchedule(null));
          dispatch(cartsActions.setSelectedPrice(null));
          successToggle.change();
          setIsSuccess(true);

          setTimeout(() => {
            setIsSuccess(false);
            successToggle.change();
          }, 8000);
          dispatch(cartsActions.getAllItem({ userId: user.id }));
        }
      });
    }
  };

  const baseTheme = createTheme();

  return (
    <div className={styles.master__container}>
      <div className={styles.master__avatar}>
        <img src={master_image || empty_person} alt={`Avatar ${userId}`} />
      </div>
      <div className={styles.master__info}>
        <h4 className={styles.master__info__name}>
          {master_firstname} {master_lastname}
        </h4>
        <Stack spacing={1}>
          <ThemeProvider theme={newTheme(baseTheme)}>
            <Autocomplete
              id="auto-select"
              autoSelect
              options={schedules}
              getOptionLabel={(schedule) => `${schedule.date_time}`}
              sx={{
                width: 300,
                marginBottom: "10px !important",
                "@media (max-width: 1050px)": {
                  width: "240px",
                },
              }}
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
                <li {...props}>{option.date_time}</li>
              )}
            />
          </ThemeProvider>
          <ThemeProvider theme={newTheme(baseTheme)}>
            <Autocomplete
              id="auto-select"
              autoSelect
              options={prices}
              getOptionLabel={(price) => `${price.title} ${price.price}`}
              sx={{
                width: 300,
                marginBottom: "10px !important",
                "@media (max-width: 1050px)": {
                  width: "240px",
                },
              }}
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
                  {option.title} - ₴{option.price}
                </li>
              )}
            />
          </ThemeProvider>
        </Stack>
        <div className={styles.master__button}>
          <button className={styles.master__button__add} onClick={addToCart}>
            <span
              className={`${styles.iconWrapper} ${isSuccess ? styles["cart-animation"] : ""}`}
            >
              {isSuccess ? (
                <ShoppingCartCheckoutOutlinedIcon />
              ) : (
                <ShoppingCartOutlinedIcon />
              )}
            </span>
            <p className={`${isSuccess ? styles["cart-animation-text"] : ""}`}>
              Add to cart
            </p>
          </button>
          {error && (
            <span className={styles.available__message__error}>
              {error.message}
            </span>
          )}
          {successToggle.value && (
            <span
              className={`${styles.available__message} ${
                successToggle.value
                  ? styles["available__message__success"]
                  : styles.hide
              }`}
            >
              The appointment has been successfully added to the cart
            </span>
          )}
          <button onClick={getSchedules}>
            Get all Masters available schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export { AvailableSchedulesDetails };

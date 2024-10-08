import { joiResolver } from "@hookform/resolvers/joi";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { IAddPrice, IServices } from "../../../../interfaces";
import { servicesActions } from "../../../../redux";
import { priceShema } from "../../../../validators";
import styles from "../../../Auth/Form/Form.module.scss";
import { newTheme } from "../../../Theme";
import css from "../../Services.module.scss";

const PriceForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddPrice>({ resolver: joiResolver(priceShema) });

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { services, allPrices } = useAppSelector((state) => state.services);
  const [selectedService, setSelectedService] = useState<IServices | null>(
    null,
  );

  const addPrice = async (data: IAddPrice) => {
    if (selectedService) {
      await dispatch(
        servicesActions.addPrice({
          userId: user.id,
          data: { service_id: selectedService.id, ...data },
        }),
      );
      reset();
      await dispatch(servicesActions.getAllPrices({ userId: user.id }));
    }
  };

  const baseTheme = createTheme();

  return (
    <div className={css.price__form}>
      <form
        className={css.price__form__addService}
        onSubmit={handleSubmit(addPrice)}
      >
        <div className={styles.form__container}>
          <label className={styles.form__autocomplete}>
            <ThemeProvider theme={newTheme(baseTheme)}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={services}
                sx={{
                  width: "100%",
                }}
                value={selectedService}
                onChange={(_, value) => setSelectedService(value)}
                getOptionDisabled={(option: IServices) =>
                  allPrices.some((price) => price.service_id === option.id)
                }
                getOptionLabel={(service) => service.title}
                renderInput={(params) => (
                  <TextField {...params} label="Services" />
                )}
              />
            </ThemeProvider>
          </label>
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <MonetizationOnOutlinedIcon className={css.price__svg} />
            <input
              className={css.price__form__input}
              type="number"
              placeholder={"cost"}
              required={true}
              {...register("price")}
            />
          </label>
          {errors.price && (
            <div className={styles.form__error}>
              {errors?.price && <span>invalid number for price</span>}
            </div>
          )}
        </div>
        <button className={css.price__form__button}>Add price</button>
      </form>
    </div>
  );
};

export { PriceForm };

import { joiResolver } from "@hookform/resolvers/joi";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { IAddPrice, IServices } from "../../../../interfaces";
import { servicesActions } from "../../../../redux";
import { priceShema } from "../../../../validators";
import styles from "../../../LoginPanel/Form/Form.module.scss";

const PriceForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddPrice>({ resolver: joiResolver(priceShema) });

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { services } = useAppSelector((state) => state.services);
  const [selectedService, setSelectedService] = useState<IServices | null>(
    null,
  );

  const addPrice = async (data: IAddPrice) => {
    if (selectedService) {
      await dispatch(
        servicesActions.addPrice({
          userId: user.data.id,
          data: { service_id: selectedService.id, ...data },
        }),
      );
      reset();
      await dispatch(servicesActions.getAllPrices({ userId: user.data.id }));
    }
  };

  return (
    <div>
      <form className={styles.form__login} onSubmit={handleSubmit(addPrice)}>
        <div className={styles.form__container}>
          <label className={styles.form__autocomplete}>
            <LockOutlinedIcon />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={services}
              sx={{ width: 280 }}
              value={selectedService}
              onChange={(_, value) => setSelectedService(value)}
              getOptionLabel={(service) => service.title}
              renderInput={(params) => (
                <TextField {...params} label="Services" />
              )}
            />
          </label>
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <LockOutlinedIcon />
            <input
              type="number"
              placeholder={"XXXX"}
              required={true}
              {...register("price")}
            />
          </label>
          {errors.price && (
            <div className={styles.form__error}>
              {errors?.price && <span>invalid password</span>}
            </div>
          )}
        </div>
        <button>Add price</button>
      </form>
    </div>
  );
};

export { PriceForm };

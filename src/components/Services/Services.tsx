import React, { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { servicesActions } from "../../redux";

const Services: FC = () => {
  const dispatch = useAppDispatch();
  const { services } = useAppSelector((state) => state.services);

  useEffect(() => {
    dispatch(servicesActions.getAllServices());
  }, [dispatch]);

  return (
    <div>
      {services.map((service) => (
        <p key={service.id}>
          {service.category} - {service.title}
        </p>
      ))}
    </div>
  );
};

export { Services };

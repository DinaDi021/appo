import AddIcon from "@mui/icons-material/Add";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { filtersActions, servicesActions } from "../../redux";
import styles from "./Services.module.scss";

interface CategoryState {
  [category: string]: boolean;
}

const Services: FC = () => {
  const dispatch = useAppDispatch();
  const { services, categories } = useAppSelector((state) => state.services);
  const [expandedCategories, setExpandedCategories] = useState<CategoryState>(
    {},
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(servicesActions.getAllServices());
  }, [dispatch]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleServiceClick = (servicesId: number[]) => {
    dispatch(filtersActions.setServiceFilter(servicesId));
    navigate("/availableSchedules");
  };

  return (
    <div className={styles.services__container}>
      <div className={styles.priceTable__column__header}>
        <h2>
          You can choose any of the available services on our website from our
          specialists
        </h2>
      </div>
      <div className={styles.services__table}>
        {categories.map((category) => (
          <div key={category} className={styles.services__table__header}>
            <div
              className={styles.services__table__title}
              onClick={() => toggleCategory(category)}
            >
              <AddIcon />
              <h3
                style={{
                  fontWeight: expandedCategories[category] ? "bold" : "normal",
                }}
              >
                {category}
              </h3>
            </div>
            <div
              className={`${styles.services__table__list} ${
                expandedCategories[category] ? styles.slideDown : styles.slideUp
              }`}
            >
              {services
                .filter((service) => service.category === category)
                .map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceClick([service.id])}
                    className={styles.services__table__item}
                  >
                    <h4 className={styles.services__table__item__title}>
                      {service.title}
                    </h4>
                    <p className={styles.services__table__item__description}>
                      {service.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Services };

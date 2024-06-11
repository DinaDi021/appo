// ServerDay.tsx

import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { format } from "date-fns";
import React from "react";

interface ServerDayProps extends PickersDayProps<Date> {
  highlightedDays?: string[];
}

const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    minWidth: "7px",
    height: "7px",
    top: "8%",
    right: "20%",
    padding: "0",
  },
});
const ServerDay: React.FC<ServerDayProps> = (props) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const dayFormatted = format(day, "yyyy-MM-dd");
  const isSelected =
    !outsideCurrentMonth && highlightedDays.includes(dayFormatted);

  return (
    <StyledBadge
      key={dayFormatted}
      overlap="circular"
      badgeContent={isSelected ? "💸" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </StyledBadge>
  );
};

export { ServerDay };

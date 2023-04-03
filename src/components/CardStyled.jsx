import { Card } from "@mui/material";
import { neutral } from "../theme/colors";

export default function CardStyled(props) {
  return (
    <Card
      variant="elevation"
      elevation={8}
      raised
      sx={{
        m: 3,
        minWidth: 275,
        bgcolor: neutral[200],
      }}
    >
      {props.children}
    </Card>
  );
}

import { useTheme } from "@emotion/react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Typography, styled } from "@mui/material";

export default function Infos({ infos }) {
  const { palette } = useTheme();

  const iconColor = palette.neutral[50];

  function IconSelect(type) {
    if (type === "location") {
      return (
        <LocationOnOutlinedIcon
          sx={{
            color: iconColor,
          }}
        />
      );
    } else if (type === "phone") {
      return (
        <LocalPhoneOutlinedIcon
          sx={{
            color: iconColor,
          }}
        />
      );
    } else if (type === "email") {
      return (
        <EmailOutlinedIcon
          sx={{
            color: iconColor,
          }}
        />
      );
    } else if (type === "date") {
      return (
        <EventOutlinedIcon
          sx={{
            color: iconColor,
          }}
        />
      );
    } else if (type === "time") {
      return (
        <AccessTimeOutlinedIcon
          sx={{
            color: iconColor,
          }}
        />
      );
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        flexDirection: { xs: "column", sm: "column", md: "row" },
      }}
    >
      {Object.entries(infos).map(([type, value]) => {
        if (value) {
          return (
            <Box
              key={type}
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <BoxIcon>{IconSelect(type)}</BoxIcon>
              <Typography variant="semiBold1" sx={{ flexShrink: 0 }}>
                {value}
              </Typography>
            </Box>
          );
        }
      })}
    </Box>
  );
}

const BoxIcon = styled(Box)(({ theme }) => ({
  height: 40,
  width: 40,
  padding: theme.spacing(1),
  backgroundColor: theme.palette.info.main,
  borderRadius: 40,
}));

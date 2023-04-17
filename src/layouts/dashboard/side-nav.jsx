import { Logo } from "@/src/components/logo";
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";

import { useAuth } from "@/src/hooks/use-auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { adminItems, studentItems } from "./config";
import { SideNavItem } from "./side-nav-item";

export const SideNav = (props) => {
  const { user } = useAuth();

  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [items, setItems] = useState([...studentItems]);

  useEffect(() => {
    if (user?.role === "admin") {
      setItems([...adminItems]);
    }
  }, [user?.role]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: 1,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            mt: 2,
            p: "12px",
            gap: "5px",
          }}
        >
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: "inline-flex",
              height: 32,
              width: 32,
            }}
          >
            <Logo />
          </Box>
          <Typography variant="subtitle1">Idioma 360</Typography>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "neutral.700" }} />
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
        }}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
          }}
        >
          {items.map((item) => {
            const active = item.path ? pathname === item.path : false;

            return (
              <SideNavItem
                active={active}
                disabled={item.disabled}
                external={item.external}
                icon={item.icon}
                key={item.title}
                path={item.path}
                title={item.title}
              />
            );
          })}
        </Stack>
      </Box>
      <Divider sx={{ borderColor: "neutral.700" }} />
      <Box
        sx={{
          px: 2,
          py: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            href={" https://github.com/victor-azevedo"}
            target="_blank"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="subtitle1">Sobre</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
            border: "none",
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

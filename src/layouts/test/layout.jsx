import { styled } from "@mui/material/styles";

import { withAuthGuard } from "@/src/hocs/with-auth-guard";

const LayoutRoot = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
});

const LayoutContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
  backgroundColor: theme.palette.neutral[200],
}));

export const Layout = withAuthGuard((props) => {
  const { children } = props;

  return (
    <>
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
});

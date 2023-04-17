import { Container } from "@mui/material";
import Animate from "react-smooth";

export default function ContainerEaseIn(props) {
  const { children } = props;
  return (
    <Container maxWidth="xl">
      <Animate
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        easing="ease-in"
        duration={600}
      >
        <div>{children}</div>
      </Animate>
    </Container>
  );
}

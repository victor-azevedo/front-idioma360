import { withAuthGuardAdmin } from "@/src/hocs/with-auth-guard-admin";
import { Layout } from "./layout";

export const LayoutAdmin = withAuthGuardAdmin((props) => {
  const { children } = props;

  return <Layout>{children}</Layout>;
});

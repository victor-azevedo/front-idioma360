import { withAuthGuardAdmin } from "@/src/hocs/with-auth-guard-admin";
import { Layout } from "./layout";

export const LayoutAdmin = withAuthGuardAdmin((props) => {
  const { children, pageTitle } = props;

  return (
    <>
      <Layout pageTitle={pageTitle}>{children}</Layout>;
    </>
  );
});

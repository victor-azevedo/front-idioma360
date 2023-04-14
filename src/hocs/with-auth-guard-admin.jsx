/* eslint-disable react/display-name */
import { AuthGuardAdmin } from "../guards/auth-guard-admin";

export const withAuthGuardAdmin = (Component) => (props) => {
  return (
    <AuthGuardAdmin>
      <Component {...props} />
    </AuthGuardAdmin>
  );
};

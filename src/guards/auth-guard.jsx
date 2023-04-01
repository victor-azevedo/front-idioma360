import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "../hooks/use-auth";

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (!isAuthenticated) {
      // eslint-disable-next-line no-console
      console.log("Not authenticated, redirecting");
      router
        .replace({
          pathname: "/auth/sign-in",
          query:
            router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    } else {
      setChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

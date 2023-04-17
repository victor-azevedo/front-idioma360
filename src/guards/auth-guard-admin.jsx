import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "../hooks/use-auth";

export const AuthGuardAdmin = (props) => {
  const { children } = props;
  const router = useRouter();
  const { user } = useAuth();
  const ignore = useRef(false);
  const [adminChecked, setAdminChecked] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (user?.role !== "admin") {
      // eslint-disable-next-line no-console
      console.log("Not authorized, redirecting");
      router
        .replace({
          pathname: "/app",
          query:
            router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    } else {
      setAdminChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (!adminChecked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authorized.

  return children;
};

AuthGuardAdmin.propTypes = {
  children: PropTypes.node,
};

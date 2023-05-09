/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { api } from "../services/api";

export default function withoutAuthGuard(Page) {
  return (props) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        api.get("/health").catch(() => {
          alert("Sorry, Server fault");
        });
      } else {
        router.push("/");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return <Page {...props} />;
  };
}

import OfferingCard from "@/src/components/OfferingCard";
import handleResponseError from "@/src/errors/handleResponseError";
import { configClient, server, tokenService } from "@/src/services";
import { useEffect, useRef, useState } from "react";

export default function Offerings() {
  const token = useRef(tokenService.get());
  const [offerings, setOfferings] = useState([]);

  useEffect(() => {
    async function getOfferings() {
      try {
        const { data } = await server.get(
          "/offerings",
          configClient(token.current)
        );
        setOfferings(data);
      } catch (error) {
        handleResponseError(error);
      }
    }
    getOfferings();
  }, []);

  if (offerings.length === 0) {
    return <>Loading</>;
  }

  return (
    <>
      {offerings.map((offering) => {
        return <OfferingCard key={offering.id} {...offering}></OfferingCard>;
      })}
    </>
  );
}

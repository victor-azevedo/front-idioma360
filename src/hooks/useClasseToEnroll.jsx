import { useContext } from "react";

import ClasseToEnrollContext from "../contexts/classeToEnroll-context";

export const useClasseToEnroll = () => useContext(ClasseToEnrollContext);

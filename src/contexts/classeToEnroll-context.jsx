import { createContext, useState } from "react";

const ClasseToEnrollContext = createContext({});

export const ClasseToEnrollProvider = (props) => {
  const { children } = props;
  const [classeToEnroll, setClasseToEnroll] = useState({});

  return (
    <ClasseToEnrollContext.Provider
      value={{ classeToEnroll, setClasseToEnroll }}
    >
      {children}
    </ClasseToEnrollContext.Provider>
  );
};

export default ClasseToEnrollContext;

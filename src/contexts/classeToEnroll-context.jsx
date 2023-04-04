import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const ClasseToEnrollContext = createContext({ undefined });

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

ClasseToEnrollProvider.propTypes = {
  children: PropTypes.node,
};

export const ClasseToEnrollConsumer = ClasseToEnrollContext.Consumer;

export const useClasseToEnrollContext = () => useContext(ClasseToEnrollContext);

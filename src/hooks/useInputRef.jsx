const { useRef, useEffect } = require("react");

export function useInputRef() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return inputRef;
}

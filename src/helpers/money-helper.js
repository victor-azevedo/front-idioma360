const ONLY_NUMBER_PATTERN = "^[0-9]*$";

export function parseMoneyToReal(value) {
  if (typeof value === "string") {
    const valueValidation = new RegExp(ONLY_NUMBER_PATTERN);

    if (!valueValidation.test(value)) {
      throw Error({
        name: "ErrorMoneyFormat",
        message: "Money must be only numbers",
      });
    }

    return `R$ ${value.slice(0, -2)},${value.slice(-2)}`;
  } else if (typeof value === "number") {
    const valueString = value.toString();
    return `R$ ${valueString.slice(0, -2)},${valueString.slice(-2)}`;
  }
}

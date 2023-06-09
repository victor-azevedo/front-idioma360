import { parseDateTimeValuesToAPI } from "./date-helper";

export const parseOfferingToAPI = (data) => {
  if (typeof data.enrollPrice === "string") {
    if (!data.enrollPrice.includes(",")) {
      data.enrollPrice = data.enrollPrice + "00";
    }
    data.enrollPrice = data.enrollPrice.replace(/\D/g, "");
    data.enrollPrice = parseInt(data.enrollPrice);
  } else {
    data.enrollPrice = data.enrollPrice * 100;
  }

  return {
    ...parseDateTimeValuesToAPI(data),
    enrollPrice: data.enrollPrice,
  };
};

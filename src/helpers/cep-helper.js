import handleError from "@/src/errors";
import { getAddressDataFromViaCEP } from "@/src/services/cep-service";

export const CEP_PATTERN = "^[0-9]{5}-[0-9]{3}$";

export async function getAddressDataByCEP(cep) {
  const cepValidation = new RegExp(CEP_PATTERN);

  try {
    if (!cepValidation.test(cep)) {
      throw Error({ name: "ErrorCEPFormat", message: "Error CEP format" });
    }
    const addressDataFromViaCEP = await getAddressDataFromViaCEP(cep);
    return parseAddressFromViaCEP(addressDataFromViaCEP);
  } catch (error) {
    handleError(error);
  }
}

function parseAddressFromViaCEP({ cep, logradouro, bairro, uf, ibge }) {
  return {
    postalCode: cep,
    street: logradouro,
    district: bairro,
    cityId: parseInt(ibge),
    uf,
  };
}

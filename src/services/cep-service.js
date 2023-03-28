import handleResponseError from "@/src/errors";
import axios from "axios";

export async function getAddressDataFromViaCEP(cepToFind) {
  try {
    const { data } = await axios.get(
      `https://viacep.com.br/ws/${cepToFind.replace("-", "")}/json/`
    );
    const { logradouro, cep, bairro, localidade, uf, ibge, erro } = data;

    if (erro) {
      throw new Error({ name: "InvalidCEP", message: "CEP does not exist" });
    }

    return { logradouro, cep, bairro, localidade, uf, ibge };
  } catch (error) {
    handleResponseError(error);
  }
}

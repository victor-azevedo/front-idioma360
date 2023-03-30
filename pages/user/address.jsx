import styled from "@emotion/styled";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { PatternFormat } from "react-number-format";

import handleResponseError from "@/src/errors/handleResponseError";
import { CEP_PATTERN, getAddressDataByCEP } from "@/src/helpers";
import useGetCitiesFromUF from "@/src/hooks/api/useGetCities";
import useGetStates from "@/src/hooks/api/useGetStates";
import usePostAddress from "@/src/hooks/api/usePostAddress";

const INITIAL_FORM_ADDRESS = {
  street: "",
  number: "",
  complement: "",
  district: "",
  postalCode: "",
  cityId: "",
  uf: "",
};

export default function Address() {
  const { postAddress, postAddressLoading } = usePostAddress();
  const { statesList, getStatesLoading } = useGetStates();
  const { citiesList, getCities, getCitiesLoading } = useGetCitiesFromUF();

  const [addressForm, setAddressForm] = useState(INITIAL_FORM_ADDRESS);

  const allowGetAddressDataByPostaCode = useRef(false);
  const inputNumberReference = useRef();
  const inputCityReference = useRef();
  const inputCEPReference = useRef();

  const router = useRouter();

  useEffect(() => {
    if (addressForm.uf) {
      getCities(addressForm.uf);
      if (!allowGetAddressDataByPostaCode.current) {
        inputCityReference.current.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressForm.uf]);

  useEffect(() => {
    async function getAddressDataByPostalCode() {
      try {
        if (allowGetAddressDataByPostaCode.current) {
          const responsePostalCode = await getAddressDataByCEP(
            addressForm.postalCode
          );
          setAddressForm({
            ...addressForm,
            ...responsePostalCode,
            number: "",
            cityId: "",
            complement: "",
          });
          inputNumberReference.current.focus();
        }
      } catch (error) {
        handleResponseError(error);
      }
    }
    getAddressDataByPostalCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressForm.postalCode]);

  function handleFormAddress(e) {
    const { name, value } = e.target;
    setAddressForm({ ...addressForm, [name]: value });
  }

  function handlePostaCode(newPostalCode) {
    const postalCodeValidation = new RegExp(CEP_PATTERN);
    if (postalCodeValidation.test(newPostalCode)) {
      allowGetAddressDataByPostaCode.current = true;
    } else {
      allowGetAddressDataByPostaCode.current = false;
    }

    setAddressForm({ ...addressForm, postalCode: newPostalCode });
  }

  function handleUfOrCity(e) {
    const { name, value } = e.target;
    setAddressForm({
      ...addressForm,
      cityId: name === "cityId" ? value : "",
      [name]: value,
    });
  }

  function sendAddressForm(event) {
    event.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const { uf, ...userAddressBody } = addressForm;
    postAddress(userAddressBody);
    allowGetAddressDataByPostaCode.current = false;
    setAddressForm(INITIAL_FORM_ADDRESS);
    router.push("/");
  }

  return (
    <div>
      <h1>CADASTRO ADDRESS PAGE</h1>
      <Form onSubmit={sendAddressForm}>
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          label="Rua"
          variant="outlined"
          id="street-input"
          name="street"
          type="text"
          value={addressForm.street}
          onChange={handleFormAddress}
          disabled={postAddressLoading || getStatesLoading || getCitiesLoading}
          required
        ></TextField>
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          label="Numero"
          variant="outlined"
          id="number-input"
          name="number"
          type="text"
          value={addressForm.number}
          onChange={handleFormAddress}
          disabled={postAddressLoading || getStatesLoading || getCitiesLoading}
          inputRef={inputNumberReference}
          required
        ></TextField>
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          label="Complemento"
          variant="outlined"
          id="complement-input"
          name="complement"
          type="text"
          value={addressForm.complement}
          onChange={handleFormAddress}
          disabled={postAddressLoading || getStatesLoading || getCitiesLoading}
          minLength="3"
        ></TextField>
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          label="Bairro"
          variant="outlined"
          id="district-input"
          name="district"
          type="text"
          value={addressForm.district}
          onChange={handleFormAddress}
          disabled={postAddressLoading || getStatesLoading || getCitiesLoading}
          required
        ></TextField>
        <PatternFormat
          sx={{ m: 1, minWidth: 120 }}
          label="CEP"
          variant="outlined"
          id="postalCode-input"
          name="postalCode"
          type="text"
          value={addressForm.postalCode}
          onChange={(e) => handlePostaCode(e.target.value)}
          disabled={postAddressLoading || getStatesLoading || getCitiesLoading}
          required
          format="#####-###"
          mask="_"
          inputRef={inputCEPReference}
          customInput={TextField}
        ></PatternFormat>
        <FormControl variant="outlined" sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="uf-label">UF</InputLabel>
          <Select
            label="UF"
            labelId="uf-label"
            id="uf-select"
            name="uf"
            value={addressForm.uf}
            onChange={(e) => {
              handleUfOrCity(e);
            }}
            disabled={
              postAddressLoading || getStatesLoading || getCitiesLoading
            }
            required
          >
            {statesList.map((state) => (
              <MenuItem key={state.id} value={state.uf}>
                {state.uf}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="cities-label">Cidades</InputLabel>
          <Select
            label="Cidades"
            labelId="cities-label"
            id="cities-select"
            name="cityId"
            value={addressForm.cityId}
            onChange={(e) => {
              handleUfOrCity(e);
            }}
            disabled={
              postAddressLoading || getStatesLoading || getCitiesLoading
            }
            required
            inputRef={inputCityReference}
          >
            {citiesList.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          sx={{ m: 1, minWidth: 120 }}
          type="submit"
          variant="contained"
          disabled={postAddressLoading || getStatesLoading || getCitiesLoading}
        >
          Cadastrar Endereço
        </Button>
      </Form>
      <Link
        href={"/"}
        disabled={postAddressLoading || getStatesLoading || getCitiesLoading}
      >
        Home
      </Link>
    </div>
  );
}

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

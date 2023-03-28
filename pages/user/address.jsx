import handleResponseError from "@/src/errors/handleResponseError";
import { CEP_PATTERN, getAddressDataByCEP } from "@/src/helpers";
import { configClient, server, tokenService } from "@/src/services";
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

const INITIAL_FORM_ADDRESS = {
  street: "",
  number: "",
  complement: "",
  district: "",
  postalCode: "",
  cityId: "",
  uf: "",
};

export const INITIAL_CITY_LIST = [];
export const INITIAL_STATE_LIST = [];

export default function Address() {
  const token = useRef(tokenService.get());

  const [addressForm, setAddressForm] = useState(INITIAL_FORM_ADDRESS);

  const [cityList, setCityList] = useState(INITIAL_CITY_LIST);
  const [stateList, setStateList] = useState(INITIAL_STATE_LIST);

  const [isLoading, setIsLoading] = useState(false);

  const allowGetAddressDataByPostaCode = useRef(false);
  const inputNumberReference = useRef();
  const inputCityReference = useRef();
  const inputCEPReference = useRef();

  const router = useRouter();

  useEffect(() => {
    async function getStateList() {
      try {
        const { data } = await server.get(
          "/address/states",
          configClient(token.current)
        );
        inputCEPReference.current.focus();
        setStateList(data);
      } catch (error) {
        handleResponseError(error);
      }
    }
    getStateList();
  }, []);

  useEffect(() => {
    async function getCities(uf) {
      try {
        if (uf) {
          const { data } = await server.get(
            `/address/cities?uf=${uf}`,
            configClient(token.current)
          );
          setCityList(data);
          if (!allowGetAddressDataByPostaCode.current) {
            inputCityReference.current.focus();
          }
        }
      } catch (error) {
        handleResponseError(error.response);
      }
    }
    getCities(addressForm.uf);
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
    if (name === "uf") {
      setCityList(INITIAL_CITY_LIST);
    }
  }

  async function sendAddressForm(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const { uf, ...userAddressBody } = addressForm;
      await server.post(
        "/user/address",
        userAddressBody,
        configClient(token.current)
      );
      setAddressForm(INITIAL_FORM_ADDRESS);
      router.push("/");
    } catch (error) {
      handleResponseError(error);
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
            disabled={isLoading}
            required
          >
            {stateList.map((state) => (
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
            disabled={isLoading}
            required
            inputRef={inputCityReference}
          >
            {cityList.map((city) => (
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
          disabled={isLoading}
        >
          Cadastrar Endereço
        </Button>
      </Form>
      <Link href={"/"} disabled={isLoading}>
        Home
      </Link>
    </div>
  );
}

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

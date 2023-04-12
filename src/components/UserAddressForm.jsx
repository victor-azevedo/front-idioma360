import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Unstable_Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { PatternFormat } from "react-number-format";
import handleResponseError from "../errors/handleResponseError";
import { CEP_PATTERN, getAddressDataByCEP } from "../helpers";
import useGetCitiesFromUF from "../hooks/api/useGetCities";
import useGetStates from "../hooks/api/useGetStates";
import usePostAddress from "../hooks/api/usePostAddress";

const INITIAL_FORM_ADDRESS = {
  street: "",
  number: "",
  complement: "",
  district: "",
  postalCode: "",
  cityId: "",
  uf: "",
};

export default function UserAddressForm({
  street,
  number,
  complement,
  district,
  postalCode,
  city,
  cityId,
}) {
  const { postAddress, postAddressLoading } = usePostAddress();
  const { statesList, getStatesLoading } = useGetStates();
  const { citiesList, getCities, getCitiesLoading } = useGetCitiesFromUF();

  const [addressForm, setAddressForm] = useState(INITIAL_FORM_ADDRESS);
  const [allowEdition, setAllowEdition] = useState(true);
  const [disableInput, setDisableInput] = useState(true);

  const allowGetAddressDataByPostaCode = useRef(false);
  const inputCEPReference = useRef();

  const router = useRouter();

  useEffect(() => {
    if (street) {
      setAllowEdition(false);
      setAddressForm({
        street,
        number,
        complement,
        district,
        postalCode,
        cityId,
        uf: city.state.uf,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getCitiesAsync() {
      try {
        await getCities(addressForm.uf);
      } catch (error) {
        handleResponseError(error);
      }
    }
    if (addressForm.uf) {
      getCitiesAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressForm.uf]);

  useEffect(() => {
    async function getAddressDataByPostalCode() {
      try {
        const responsePostalCode = await getAddressDataByCEP(
          addressForm.postalCode
        );
        setAddressForm({
          ...addressForm,
          ...responsePostalCode,
        });
      } catch (error) {
        handleResponseError(error);
      }
    }
    if (allowGetAddressDataByPostaCode.current) {
      allowGetAddressDataByPostaCode.current = false;
      getAddressDataByPostalCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressForm.postalCode]);

  useEffect(() => {
    setDisableInput(
      postAddressLoading ||
        getStatesLoading ||
        getCitiesLoading ||
        !allowEdition
    );
  }, [postAddressLoading, getStatesLoading, getCitiesLoading, allowEdition]);

  const handleFormAddress = useCallback((event) => {
    setAddressForm((prevAddressForm) => ({
      ...prevAddressForm,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handlePostaCode = useCallback((event) => {
    const newPostalCode = event.target.value;
    const postalCodeValidation = new RegExp(CEP_PATTERN);
    if (postalCodeValidation.test(newPostalCode)) {
      allowGetAddressDataByPostaCode.current = true;
    } else {
      allowGetAddressDataByPostaCode.current = false;
    }

    setAddressForm((prevAddressForm) => ({
      ...prevAddressForm,
      postalCode: newPostalCode,
    }));
  }, []);

  const handleUfOrCity = useCallback((event) => {
    const { name, value } = event.target;
    setAddressForm((prevAddressForm) => ({
      ...prevAddressForm,
      postalCode: "",
      cityId: name === "cityId" ? value : "",
      [name]: value,
    }));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const { uf, ...userAddressBody } = addressForm;
    try {
      await postAddress(userAddressBody);
      // allowGetAddressDataByPostaCode.current = false;
      setAddressForm({ ...INITIAL_FORM_ADDRESS });
      router.push("/");
    } catch (error) {
      handleResponseError(error);
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit} disabled={allowEdition}>
      <Card>
        <CardHeader title="Endereço" subheader="Informe seu endereço" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Rua"
                  id="street-input"
                  name="street"
                  value={addressForm.street}
                  onChange={handleFormAddress}
                  disabled={disableInput}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Numero"
                  id="number-input"
                  name="number"
                  value={addressForm.number}
                  onChange={handleFormAddress}
                  disabled={disableInput}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Complemento"
                  id="complement-input"
                  name="complement"
                  value={addressForm.complement}
                  onChange={handleFormAddress}
                  disabled={disableInput}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Bairro"
                  id="district-input"
                  name="district"
                  value={addressForm.district}
                  onChange={handleFormAddress}
                  disabled={disableInput}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <PatternFormat
                  fullWidth
                  label="CEP"
                  id="postalCode-input"
                  name="postalCode"
                  value={addressForm.postalCode}
                  onChange={handlePostaCode}
                  disabled={disableInput}
                  required
                  format="#####-###"
                  mask="_"
                  inputRef={inputCEPReference}
                  customInput={TextField}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="uf-label">UF</InputLabel>
                  <Select
                    labelId="uf-label"
                    id="uf-select"
                    name="uf"
                    value={addressForm.uf}
                    onChange={handleUfOrCity}
                    disabled={disableInput}
                    required
                  >
                    {statesList.map((state) => (
                      <MenuItem key={state.id} value={state.uf}>
                        {state.uf}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="cities-label">Cidade</InputLabel>
                  <Select
                    labelId="cities-label"
                    id="cities-select"
                    name="cityId"
                    value={addressForm.cityId}
                    onChange={(e) => {
                      handleUfOrCity(e);
                    }}
                    disabled={disableInput}
                    required
                  >
                    <MenuItem value={addressForm.cityId} disabled></MenuItem>
                    {citiesList.map((city) => (
                      <MenuItem key={city.id} value={city.id}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => setAllowEdition(true)}
            disabled={allowEdition}
          >
            Editar
          </Button>
          <Button variant="contained" type="submit" disabled={!allowEdition}>
            Salvar
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

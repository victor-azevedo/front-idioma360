import handleResponseError from "@/src/errors/handleResponseError";
import { server, tokenService } from "@/src/services";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";

const INITIAL_FORM_SIGN_UP = {
  name: "",
  fullName: "",
  birthday: "",
  cpf: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  const [formSignUp, setFormSignUp] = useState(INITIAL_FORM_SIGN_UP);
  const [isLoading, setIsLoading] = useState(false);
  const [isLandlinePhone, setIsLandlinePhone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const firstDigit = parseInt(formSignUp.phone[4]);
    if (firstDigit >= 6) {
      setIsLandlinePhone(false);
    } else {
      setIsLandlinePhone(true);
    }
  }, [formSignUp.phone]);

  function handleFormSignUp(e) {
    const { name, value } = e.target;
    setFormSignUp({ ...formSignUp, [name]: value });
  }

  function handleDateInput(date) {
    setFormSignUp({
      ...formSignUp,
      birthday: dayjs(date).format("YYYY-MM-DD"),
    });
  }

  function validatePasswordsMatch(password, confirmPassword) {
    if (password !== confirmPassword) throw Error("As senhas devem ser iguais");
  }

  async function sendFormSignUp(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      validatePasswordsMatch(formSignUp.password, formSignUp.confirmPassword);
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...sigUpBody } = formSignUp;
      const { data } = await server.post("/sign-up", sigUpBody);
      tokenService.save(data.token);
      setFormSignUp(INITIAL_FORM_SIGN_UP);
      router.push("/");
    } catch (error) {
      handleResponseError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1>CADASTRO PAGE</h1>
      <Form onSubmit={sendFormSignUp}>
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          label="Nome"
          variant="outlined"
          id="name-input"
          name="name"
          type="text"
          value={formSignUp.name}
          onChange={handleFormSignUp}
          disabled={isLoading}
          minLength="3"
          required
          autoFocus
        ></TextField>
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          label="Nome Completo"
          variant="outlined"
          id="fullName-input"
          name="fullName"
          type="text"
          value={formSignUp.fullName}
          onChange={handleFormSignUp}
          disabled={isLoading}
          minLength="3"
          required
        ></TextField>
        <DateField
          sx={{ m: 1, minWidth: 120 }}
          label="Data de Aniversario"
          variant="outlined"
          id="birthday-input"
          name="birthday"
          value={dayjs(formSignUp.birthday)}
          onChange={handleDateInput}
          disabled={isLoading}
          required
        ></DateField>
        <PatternFormat
          sx={{ m: 1, minWidth: 120 }}
          label="CPF"
          variant="outlined"
          id="cpf-input"
          name="cpf"
          type="text"
          value={formSignUp.cpf}
          onChange={handleFormSignUp}
          disabled={isLoading}
          required
          format="###.###.###-##"
          mask="_"
          customInput={TextField}
        ></PatternFormat>
        <PatternFormat
          sx={{ m: 1, minWidth: 120 }}
          label="Telefone"
          variant="outlined"
          id="phone-input"
          name="phone"
          type="text"
          value={formSignUp.phone}
          onChange={handleFormSignUp}
          disabled={isLoading}
          required
          format={isLandlinePhone ? "(##)####-####" : "(##)#####-####"}
          mask="_"
          customInput={TextField}
        ></PatternFormat>
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          label="E-mail"
          variant="outlined"
          id="email-input"
          name="email"
          type="email"
          value={formSignUp.email}
          onChange={handleFormSignUp}
          disabled={isLoading}
          required
        ></TextField>
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          label="Senha"
          variant="outlined"
          id="password-input"
          name="password"
          type="password"
          value={formSignUp.password}
          onChange={handleFormSignUp}
          disabled={isLoading}
          minLength="6"
          maxLength="16"
          required
        ></TextField>
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          label="Confirme a senha"
          variant="outlined"
          id="confirmPassword-input"
          name="confirmPassword"
          type="password"
          value={formSignUp.confirmPassword}
          onChange={handleFormSignUp}
          disabled={isLoading}
          required
        ></TextField>
        <Button
          sx={{ m: 1, minWidth: 120 }}
          type="submit"
          variant="contained"
          disabled={isLoading}
        >
          Cadastrar
        </Button>
      </Form>
      <Link href={"/sign-in"} disabled={isLoading}>
        Realizar Login
      </Link>
      <br />
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
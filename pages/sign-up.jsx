import handleResponseError from "@/src/errors/handleResponseError";
import { server, tokenService } from "@/src/services";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

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
    console.log("phone change");
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

  function validatePasswordsMatch(password, confirmPassword) {
    if (password !== confirmPassword) throw Error("As senhas devem ser iguais");
  }

  async function sendFormSignUp(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      validatePasswordsMatch(formSignUp.password, formSignUp.confirmPassword);
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
        <StyledTextField
          name="name"
          type="text"
          placeholder="Nome"
          value={formSignUp.name}
          onChange={handleFormSignUp}
          disabled={isLoading}
          minLength="3"
          required
          autoFocus
        ></StyledTextField>
        <StyledTextField
          name="fullName"
          type="text"
          placeholder="Nome Completo"
          value={formSignUp.fullName}
          onChange={handleFormSignUp}
          disabled={isLoading}
          minLength="3"
          required
        ></StyledTextField>
        <StyledTextField
          name="birthday"
          type="date"
          placeholder="Data de Nascimento"
          value={formSignUp.birthday}
          onChange={handleFormSignUp}
          disabled={isLoading}
          required
        ></StyledTextField>
        <InputMask
          name="cpf"
          type="text"
          placeholder="CPF"
          value={formSignUp.cpf}
          onChange={handleFormSignUp}
          disabled={isLoading}
          required
          mask="999.999.999-99"
        >
          {(inputProps) => <StyledTextField {...inputProps} />}
        </InputMask>
        <InputMask
          name="phone"
          type="text"
          placeholder="Telefone"
          value={formSignUp.phone}
          onChange={handleFormSignUp}
          disabled={isLoading}
          required
          mask={isLandlinePhone ? "(99)9999-9999" : "(99)99999-9999"}
        >
          {(inputProps) => <StyledTextField {...inputProps} />}
        </InputMask>
        <StyledTextField
          name="email"
          type="email"
          placeholder="E-mail"
          value={formSignUp.email}
          onChange={handleFormSignUp}
          disabled={isLoading}
          required
        ></StyledTextField>
        <StyledTextField
          name="password"
          type="password"
          placeholder="Senha"
          value={formSignUp.password}
          onChange={handleFormSignUp}
          disabled={isLoading}
          minLength="6"
          maxLength="16"
          required
        ></StyledTextField>
        <StyledTextField
          name="confirmPassword"
          type="password"
          placeholder="Confirme a Senha"
          value={formSignUp.confirmPassword}
          onChange={handleFormSignUp}
          disabled={isLoading}
          required
        ></StyledTextField>
        <StyledButton type="submit" variant="contained" disabled={isLoading}>
          Cadastrar
        </StyledButton>
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

const StyledButton = styled(Button)``;
const StyledTextField = styled(TextField)`
  flex-basis: 200px;
  flex-shrink: 0;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

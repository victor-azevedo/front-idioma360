import handleResponseError from "@/src/errors/handleResponseError";
import { server, tokenService } from "@/src/services";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const INITIAL_FORM_SIGN_IN = { email: "", password: "" };

export default function SignIn() {
  const [formSignIn, setFormSignIn] = useState(INITIAL_FORM_SIGN_IN);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleForm(e) {
    const { name, value } = e.target;
    setFormSignIn({ ...formSignIn, [name]: value });
  }

  async function sendForm(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await server.post("/sign-in", formSignIn);
      tokenService.save(data.token);
      setFormSignIn(INITIAL_FORM_SIGN_IN);
      router.push("/");
    } catch (error) {
      handleResponseError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1>LOGIN PAGE</h1>
      <form onSubmit={sendForm}>
        <TextField
          name="email"
          type="email"
          placeholder="E-mail"
          value={formSignIn.email}
          onChange={handleForm}
          disabled={isLoading}
          required
          autoFocus
        ></TextField>
        <TextField
          name="password"
          type="password"
          placeholder="Password"
          value={formSignIn.password}
          onChange={handleForm}
          disabled={isLoading}
          required
        ></TextField>
        <Button type="submit" variant="contained" disabled={isLoading}>
          Login
        </Button>
      </form>
      <Link href={"/sign-up"} disabled={isLoading}>
        Nao tem cadastro? Cadastre-se
      </Link>
      <br />
      <Link href={"/"} disabled={isLoading}>
        Home
      </Link>
    </div>
  );
}

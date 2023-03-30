import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import useSignIn from "@/src/hooks/api/useSignIn";

const INITIAL_FORM_SIGN_IN = { email: "", password: "" };

export default function SignIn() {
  const { postSignIn, signInLoading, signInError } = useSignIn();

  const [formSignIn, setFormSignIn] = useState(INITIAL_FORM_SIGN_IN);

  const router = useRouter();

  function handleForm(e) {
    const { name, value } = e.target;
    setFormSignIn({ ...formSignIn, [name]: value });
  }

  function sendForm(event) {
    event.preventDefault();
    postSignIn(formSignIn);
    setFormSignIn(INITIAL_FORM_SIGN_IN);
    if (!signInError) {
      router.push("/");
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
          disabled={signInLoading}
          required
          autoFocus
        ></TextField>
        <TextField
          name="password"
          type="password"
          placeholder="Password"
          value={formSignIn.password}
          onChange={handleForm}
          disabled={signInLoading}
          required
        ></TextField>
        <Button type="submit" variant="contained" disabled={signInLoading}>
          Login
        </Button>
      </form>
      <Link href={"/sign-up"} disabled={signInLoading}>
        Nao tem cadastro? Cadastre-se
      </Link>
      <br />
      <Link href={"/"} disabled={signInLoading}>
        Home
      </Link>
    </div>
  );
}

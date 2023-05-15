import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import handleResponseError from "@/src/errors/handleResponseError";
import useSignInUserTest from "@/src/hooks/api/useSignInUserTest";
import { useAuth } from "@/src/hooks/use-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const SignInTestForm = ({ isLoading, setIsLoading }) => {
  const router = useRouter();

  const { signIn } = useAuth();

  const { postSignInUserTest } = useSignInUserTest();

  const [testLogin, setTesteLogin] = useState("admin");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { token } = await postSignInUserTest({ userRole: testLogin });
      signIn(token);
      toast.success("Login realizado como usuário teste");
      router.push("/app");
    } catch (err) {
      handleResponseError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Stack spacing={1}>
        <Typography variant="h6">Ou</Typography>
        <Typography variant="h6">Login como usuário teste</Typography>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl sx={{ m: 3 }} error={false} variant="standard">
            <FormLabel>Escolha o tipo de usuário de teste</FormLabel>
            <RadioGroup
              aria-labelledby="login-test-group"
              name="testLogin"
              value={testLogin}
              onChange={(e) => {
                setTesteLogin(e.target.value);
              }}
              row
              required
              disabled={isLoading}
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Estudante"
              disabled={isLoading}

              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Administrador"
              disabled={isLoading}

              />
            </RadioGroup>
            <Button
              sx={{ mt: 1, mr: 1 }}
              type="submit"
              variant="outlined"
              disabled={isLoading}
            >
              Continue como usuário de teste
            </Button>
          </FormControl>
        </Box>
      </form>
    </Box>
  );
};

export default SignInTestForm;

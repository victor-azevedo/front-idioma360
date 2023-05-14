import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

import SignInTestForm from "@/src/components/forms/SignInTestForm";
import handleResponseError from "@/src/errors/handleResponseError";
import useSignIn from "@/src/hooks/api/useSignIn";
import { useAuth } from "@/src/hooks/use-auth";
import { Layout as AuthLayout } from "@/src/layouts/auth/layout";

const INITIAL_FORM_SIGN_IN = { email: "", password: "" };

const Page = () => {
  const router = useRouter();

  const { signIn } = useAuth();

  const { postSignIn } = useSignIn();

  const formik = useFormik({
    initialValues: INITIAL_FORM_SIGN_IN,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Deve ser um email válido")
        .max(255)
        .required("Email é obrigatório"),
      password: Yup.string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .max(16, "Senha deve ter no máximo 16 caracteres")
        .required("Senha é obrigatória"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const { token } = await postSignIn(values);
        signIn(token);
        toast.success("Login realizado com sucesso");
        router.push("/app");
      } catch (err) {
        handleResponseError(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Login | Idioma 360</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Não possui conta? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/sign-up"
                  underline="hover"
                  variant="subtitle2"
                >
                  Cadastra-se
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit} autoComplete="off">
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
          <SignInTestForm />
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;

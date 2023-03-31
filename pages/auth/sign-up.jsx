import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import { default as Link, default as NextLink } from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import useSignUp from "@/src/hooks/api/useSignUp";
import { useInputRef } from "@/src/hooks/useInputRef";
import { Layout as AuthLayout } from "@/src/layouts/auth/layout";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { PatternFormat } from "react-number-format";
import { toast } from "react-toastify";

const INITIAL_FORM_SIGN_UP = {
  name: "",
  fullName: "",
  birthday: "",
  cpf: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  submit: null,
};

const Page = () => {
  const router = useRouter();

  const { postSignUp } = useSignUp();

  const [isLandlinePhone, setIsLandlinePhone] = useState(false);

  const inputNameRef = useInputRef();

  const formik = useFormik({
    initialValues: INITIAL_FORM_SIGN_UP,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Deve possuir mais do que 3 caracteres")
        .required("Nome é obrigatório"),
      fullName: Yup.string()
        .min(3, "Deve possuir mais do que 3 caracteres")
        .required("Nome Completo é obrigatório"),
      birthday: Yup.date().required("Data de Nascimento é obrigatório"),
      cpf: Yup.string()
        .length(14, "CPF deve possuir 14 caracteres")
        .required("CPF é obrigatório"),
      phone: Yup.string()
        .min(13, "Telefone deve possuir no mínimo 13 caracteres")
        .max(14, "Telefone deve possuir no máximo 14 caracteres")
        .required("Telefone é obrigatório"),
      email: Yup.string()
        .email("Deve ser um email válido")
        .max(255)
        .required("Email é obrigatório"),
      password: Yup.string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .max(16, "Senha deve ter no máximo 16 caracteres")
        .required("Senha é obrigatória"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Senhas devem ser iguais")
        .required("Senha é obrigatória"),
    }),
    onSubmit: async (values, helpers) => {
      validatePasswordsMatch(values.password, values.confirmPassword);

      try {
        // eslint-disable-next-line no-unused-vars
        const { submit, confirmPassword, birthday, ...formSignUp } = values;
        await postSignUp({
          ...formSignUp,
          birthday: dayjs(birthday).format("YYYY-MM-DD"),
        });
        toast.success("Cadastro realizado com sucesso");
        router.push("/auth/sign-in");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  function validatePasswordsMatch(password, confirmPassword) {
    if (password !== confirmPassword) throw Error("As senhas devem ser iguais");
  }

  useEffect(() => {
    const firstDigit = parseInt(formik.values.phone[4]);
    if (firstDigit >= 6) {
      setIsLandlinePhone(false);
    } else {
      setIsLandlinePhone(true);
    }
  }, [formik.values.phone]);

  return (
    <>
      <Head>
        <title>Cadastro | Idioma 360</title>
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
              <Typography variant="h4">Cadastro</Typography>
              <Typography color="text.secondary" variant="body2">
                Ja possui conta? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/sign-in"
                  underline="hover"
                  variant="subtitle2"
                >
                  Login
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Nome Social"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.name}
                  inputRef={inputNameRef}
                />
                <TextField
                  error={!!(formik.touched.fullName && formik.errors.fullName)}
                  fullWidth
                  helperText={formik.touched.fullName && formik.errors.fullName}
                  label="Nome Completo"
                  name="fullName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.fullName}
                />
                <DateField
                  error={!!(formik.touched.birthday && formik.errors.birthday)}
                  fullWidth
                  helperText={formik.touched.birthday && formik.errors.birthday}
                  label="Data de Aniversario"
                  name="birthday"
                  onBlur={formik.handleBlur}
                  value={formik.values.birthday}
                  onChange={(value) => {
                    formik.setFieldValue("birthday", value);
                  }}
                />
                <PatternFormat
                  error={!!(formik.touched.cpf && formik.errors.cpf)}
                  fullWidth
                  helperText={formik.touched.cpf && formik.errors.cpf}
                  label="CPF"
                  name="cpf"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.cpf}
                  format="###.###.###-##"
                  mask="_"
                  customInput={TextField}
                />
                <PatternFormat
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Telefone"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.phone}
                  format={isLandlinePhone ? "(##)####-####" : "(##)#####-####"}
                  mask="_"
                  customInput={TextField}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
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
                  label="Senha"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  error={
                    !!(
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    )
                  }
                  fullWidth
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  label="Confirme a senha"
                  name="confirmPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.confirmPassword}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Cadastre-se
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;

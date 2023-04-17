import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Unstable_Grid2 as Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as Yup from "yup";

import handleResponseError from "@/src/errors/handleResponseError";
import usePostTest from "@/src/hooks/api/usePostTest";
import { useState } from "react";
import AdminEditSaveBox from "../AdminEditSaveBox";

export default function TestForm({
  id,
  name,
  courseId,
  courses,
  type,
  disabled,
}) {
  const router = useRouter();

  const [allowEdition, setAllowEdition] = useState(!disabled);

  const { postTest } = usePostTest();

  // TODO: add patchTest
  // const { patchTest } = usePatchTest();

  const formik = useFormik({
    initialValues: {
      name: name || "",
      courseId: courseId || 0,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Deve possuir mais do que 1 carácter")
        .required("Título para a prova é obrigatório"),
      courseId: Yup.number()
        .min(1, "Escolha de um curso é obrigatória")
        .required("Escolha de um curso é obrigatória"),
    }),
    onSubmit: async (values, helpers) => {
      const testBody = { ...values, courseId: parseInt(values.courseId) };

      try {
        if (id) {
          // TODO: add patchTest
          // await patchTest(id, testBody);
          // toast.success("Prova atualizada com sucesso");
          toast.warning("Recurso ainda nao implementado");
          router.back();
        } else {
          const { testId } = await postTest(testBody);
          toast.success("Prova cadastrada com sucesso");
          toast.success("Redirecionando para inserir as Questões");
          router.push(`/app/admin/tests/${testId}/edit`);
        }
      } catch (err) {
        handleResponseError(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit} noValidate>
      <Card>
        <CardHeader title="Dados da Prova:" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={9}>
                <TextField
                  fullWidth
                  error={!!(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  label="Nome da Prova"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.name}
                  id="name-input"
                  disabled={!allowEdition}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl sx={{ m: 3 }}>
                  <FormLabel id="courses-group">
                    Escolha o Curso relacionado a Prova
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="courses-group"
                    name="courseId"
                    value={formik.values.courseId}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "courseId",
                        parseInt(e.target.value)
                      );
                    }}
                    required
                  >
                    {courses.map((course) => (
                      <FormControlLabel
                        disabled={!allowEdition}
                        key={course.id}
                        value={course.id}
                        control={<Radio />}
                        label={course.name}
                      />
                    ))}
                  </RadioGroup>
                  <FormHelperText
                    error={
                      !!(formik.touched.courseId && formik.errors.courseId)
                    }
                  >
                    {formik.touched.courseId && formik.errors.courseId}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <AdminEditSaveBox
          allowEdition={allowEdition}
          setAllowEdition={setAllowEdition}
          type={type}
        />
      </Card>
    </form>
  );
}

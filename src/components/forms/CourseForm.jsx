import handleResponseError from "@/src/errors/handleResponseError";
import usePatchCourse from "@/src/hooks/api/usePatchCourse";
import usePostCourse from "@/src/hooks/api/usePostCourse";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function CourseForm({
  id,
  name,
  description,
  creditHours,
  imageUrl,
}) {
  const router = useRouter();

  const { postCourse } = usePostCourse();
  const { patchCourse } = usePatchCourse();

  const formik = useFormik({
    initialValues: {
      name: name || "",
      description: description || "",
      creditHours: creditHours || "",
      imageUrl: imageUrl || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Deve possuir mais do que 3 caracteres")
        .required("Nome é obrigatório"),
      description: Yup.string()
        .min(3, "Deve possuir mais do que 3 caracteres")
        .required("Descrição é obrigatório"),
      creditHours: Yup.number("Deve possuir ser número")
        .min(0, "Deve ser maior que 0")
        .required("Carga horária é obrigatória"),
      imageUrl: Yup.string()
        .url("Deve ser uma URL válida")
        .required("Imagem é obrigatória"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (id) {
          await patchCourse(id, values);
          toast.success("Curso atualizado com sucesso");
        } else {
          await postCourse(values);
          toast.success("Curso cadastrado com sucesso");
        }
        router.push("/app/admin/courses");
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
        <CardHeader title="Dados do curso:" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  error={!!(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  label="Nome do Idioma"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.name}
                  id="name-input"
                  required
                />
              </Grid>
              <Grid xs={12} md={9}>
                <TextField
                  fullWidth
                  error={
                    !!(formik.touched.description && formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  label="Descrição"
                  name="description"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.description}
                  id="description-input"
                  required
                />
              </Grid>
              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  error={
                    !!(formik.touched.creditHours && formik.errors.creditHours)
                  }
                  helperText={
                    formik.touched.creditHours && formik.errors.creditHours
                  }
                  label="Carga horária"
                  name="creditHours"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.creditHours}
                  id="credit-hour-input"
                  required
                />
              </Grid>
              <Grid xs={12} md={9}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    sx={{ width: 0.8 }}
                    error={
                      !!(formik.touched.imageUrl && formik.errors.imageUrl)
                    }
                    helperText={
                      formik.touched.imageUrl && formik.errors.imageUrl
                    }
                    label="URL da imagem"
                    name="imageUrl"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.imageUrl}
                    id="image-url-input"
                    required
                  />
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {formik.values.imageUrl && !formik.errors.imageUrl && (
                      <Avatar
                        src={formik.values.imageUrl}
                        alt="bandeira"
                        sx={{ backgroundColor: "whites" }}
                      ></Avatar>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={() => router.back()}>Cancela</Button>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

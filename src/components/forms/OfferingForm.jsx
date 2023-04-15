import handleResponseError from "@/src/errors/handleResponseError";
import { parseOfferingToAPI } from "@/src/helpers";
import usePatchOffering from "@/src/hooks/api/usePatchOffering";
import usePostOffering from "@/src/hooks/api/usePostOffering";
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
import { DatePicker, DesktopTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function OfferingForm({
  id,
  name,
  startDate,
  endDate,
  testDate,
  testStartTime,
  testEndTime,
  resultDate,
  enrollPrice,
  status,
}) {
  const router = useRouter();

  const { postOffering } = usePostOffering();
  const { patchOffering } = usePatchOffering();

  const formik = useFormik({
    initialValues: {
      name: name || "",
      startDate: startDate ? dayjs(startDate) : null,
      endDate: endDate ? dayjs(endDate) : null,
      testDate: testDate ? dayjs(testDate) : null,
      testStartTime:
        testStartTime && testDate
          ? dayjs(`${testDate}T${testStartTime}`)
          : null,
      testEndTime:
        testEndTime && testDate ? dayjs(`${testDate}T${testEndTime}`) : null,
      resultDate: resultDate ? dayjs(resultDate) : null,
      enrollPrice: enrollPrice || null,
      status: status || "blocked",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Deve possuir mais do que 3 caracteres")
        .required("Nome é obrigatório"),
      startDate: Yup.date().required(
        "Data inicial das inscrições é obrigatória"
      ),
      endDate: Yup.date().required("Data final das inscrições é obrigatória"),
      testDate: Yup.date().required("Data da prova é obrigatória"),
      testStartTime: Yup.date().required("Hora inicial da prova é obrigatória"),
      testEndTime: Yup.date().required("Hora final da prova é obrigatória"),
      resultDate: Yup.date().required("Data do resultado é obrigatória"),
      enrollPrice: Yup.string()
        .min(3)
        .required("Valor da inscrição é obrigatória"),
      status: Yup.string().required("Definir um status é obrigatório"),
    }),
    onSubmit: async (values, helpers) => {
      const dataParsed = parseOfferingToAPI({ ...values });
      try {
        if (id) {
          await patchOffering(id, dataParsed);
          toast.success("Seleção atualizada com sucesso");
        } else {
          await postOffering(dataParsed);
          toast.success("Seleção cadastrada com sucesso");
        }
        router.push("/app/admin/offerings");
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
        <CardHeader title="Dados da seleção:" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  error={!!(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  label="Nome da Seleção"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.name}
                  id="name-input"
                  required
                />
              </Grid>
              <Grid xs={12} md={3}>
                <DatePicker
                  error={
                    !!(formik.touched.startDate && formik.errors.startDate)
                  }
                  fullWidth
                  helperText={
                    formik.touched.startDate && formik.errors.startDate
                  }
                  label="Início das Inscrições"
                  name="startDate"
                  onBlur={formik.handleBlur}
                  value={formik.values.startDate}
                  onChange={(value) => {
                    formik.setFieldValue("startDate", value);
                  }}
                  id="start-date-input"
                  required
                />
              </Grid>
              <Grid xs={12} md={3}>
                <DatePicker
                  error={!!(formik.touched.endDate && formik.errors.endDate)}
                  fullWidth
                  helperText={formik.touched.endDate && formik.errors.endDate}
                  label="Término das Inscrições"
                  name="endDate"
                  onBlur={formik.handleBlur}
                  value={formik.values.endDate}
                  onChange={(value) => {
                    formik.setFieldValue("endDate", value);
                  }}
                  id="end-date-input"
                  required
                />
              </Grid>
              <Grid xs={12} md={3}>
                <DatePicker
                  error={!!(formik.touched.testDate && formik.errors.testDate)}
                  fullWidth
                  helperText={formik.touched.testDate && formik.errors.testDate}
                  label="Data da Prova"
                  name="testDate"
                  onBlur={formik.handleBlur}
                  value={formik.values.testDate}
                  onChange={(value) => {
                    formik.setFieldValue("testDate", value);
                  }}
                  id="test-date-input"
                  required
                />
              </Grid>
              <Grid xs={12} md={3}>
                <DesktopTimePicker
                  ampm={false}
                  error={
                    !!(
                      formik.touched.testStartTime &&
                      formik.errors.testStartTime
                    )
                  }
                  fullWidth
                  helperText={
                    formik.touched.testStartTime && formik.errors.testStartTime
                  }
                  label="Hora de início da prova"
                  name="testStartTime"
                  onBlur={formik.handleBlur}
                  value={formik.values.testStartTime}
                  onChange={(value) => {
                    formik.setFieldValue("testStartTime", value);
                  }}
                  id="test-start-time-input"
                  required
                />
              </Grid>
              <Grid xs={12} md={3}>
                <DesktopTimePicker
                  ampm={false}
                  error={
                    !!(formik.touched.testEndTime && formik.errors.testEndTime)
                  }
                  fullWidth
                  helperText={
                    formik.touched.testEndTime && formik.errors.testEndTime
                  }
                  label="Hora de término da prova"
                  name="testEndTime"
                  onBlur={formik.handleBlur}
                  value={formik.values.testEndTime}
                  onChange={(value) => {
                    formik.setFieldValue("testEndTime", value);
                  }}
                  id="test-end-time-input"
                  required
                />
              </Grid>
              <Grid xs={12} md={3}>
                <DatePicker
                  error={
                    !!(formik.touched.resultDate && formik.errors.resultDate)
                  }
                  fullWidth
                  helperText={
                    formik.touched.resultDate && formik.errors.resultDate
                  }
                  label="Data do Resultado"
                  name="resultDate"
                  onBlur={formik.handleBlur}
                  value={formik.values.resultDate}
                  onChange={(value) => {
                    formik.setFieldValue("resultDate", value);
                  }}
                  id="result-date-input"
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <NumericFormat
                  customInput={TextField}
                  prefix={"R$ "}
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  thousandsGroupStyle="thousand"
                  thousandSeparator="."
                  error={
                    !!(formik.touched.enrollPrice && formik.errors.enrollPrice)
                  }
                  helperText={
                    formik.touched.enrollPrice && formik.errors.enrollPrice
                  }
                  label="Preço da Inscrição"
                  name="enrollPrice"
                  onBlur={formik.handleBlur}
                  value={formik.values.enrollPrice}
                  onChange={(e) => {
                    formik.setFieldValue("enrollPrice", e.target.value);
                  }}
                  id="enroll-price-input"
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status-select"
                    name="status"
                    onBlur={formik.handleBlur}
                    value={formik.values.status}
                    onChange={(e) => {
                      formik.setFieldValue("status", e.target.value);
                    }}
                    required
                  >
                    <MenuItem value={"open"}>Aberto para Inscrição</MenuItem>
                    <MenuItem value={"closed"}>Fechado para Inscrição</MenuItem>
                    <MenuItem value={"blocked"}>
                      Bloqueado para os usuários
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end", gap: 2 }}>
          <Button type="submit" onClick={() => router.back()}>
            Cancela
          </Button>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

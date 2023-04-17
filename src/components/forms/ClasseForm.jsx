import handleResponseError from "@/src/errors/handleResponseError";
import { parseDateTimeValuesToAPI, weekDayPtBR } from "@/src/helpers";
import usePatchClasse from "@/src/hooks/api/usePatchClasse";
import usePostClasse from "@/src/hooks/api/usePostClasse";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Unstable_Grid2 as Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DatePicker, DesktopTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function ClasseForm({
  id,
  name,
  days,
  startTime,
  endTime,
  startDate,
  endDate,
  courseId,
  vacancies,
  offeringId,
  courses,
  setOpenClasseForm,
  setOfferClasses,
  offerClasses,
}) {
  const router = useRouter();

  const { postClasse } = usePostClasse();
  const { patchClasse } = usePatchClasse();

  const [weekDaysCheckBox, setWeekDaysCheckBox] = useState(() => {
    const initialWeekDaysCheckBox = {
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    };
    days?.forEach((day) => (initialWeekDaysCheckBox[day] = true));
    return initialWeekDaysCheckBox;
  });

  const formik = useFormik({
    initialValues: {
      name: name || "",
      startDate: startDate ? dayjs(startDate) : null,
      endDate: endDate ? dayjs(endDate) : null,
      startTime: startTime ? dayjs(startTime) : null,
      endTime: endTime ? dayjs(endTime) : null,
      vacancies: vacancies || null,
      courseId: courseId || null,
      offeringId: offeringId || null,
      days: days || [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Deve possuir mais do que 1 carácter")
        .required("Nome é obrigatório"),
      startDate: Yup.date().required(
        "Data do inicio das aulas da turma é obrigatória"
      ),
      endDate: Yup.date().required(
        "Data do término das aulas da turma é obrigatória"
      ),
      startTime: Yup.date().required("Hora de inicio das aulas é obrigatória"),
      endTime: Yup.date().required("Hora de término das aula é obrigatória"),
      vacancies: Yup.number().min(1).required("Numero de vagas é obrigatória"),
      courseId: Yup.number()
        .min(1, "Escolha de um curso é obrigatória")
        .required("Escolha de um curso é obrigatória"),
      offeringId: Yup.number()
        .min(1)
        .required("Escolha de um Processo Seletivo é obrigatória"),
      days: Yup.array()
        .of(Yup.string())
        .min(1, "Deve selecionar ao menos 1 dia")
        .max(7)
        .required(),
    }),
    onSubmit: async (values, helpers) => {
      const classeBody = {
        ...parseDateTimeValuesToAPI(values),
        courseId: parseInt(values.courseId),
        vacancies: parseInt(values.vacancies),
      };
      try {
        if (id) {
          await patchClasse(id, classeBody);
          toast.success("Turma atualizada com sucesso");
          router.back();
        } else {
          const newClasse = await postClasse(classeBody);
          setOfferClasses([...offerClasses, newClasse]);
          setOpenClasseForm(false);
          toast.success("Turma cadastrada com sucesso");
        }
      } catch (err) {
        handleResponseError(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleDays = useCallback(
    (dayName, checked) => {
      if (checked && !formik.values.days.includes(dayName)) {
        formik.setFieldValue("days", [...formik.values.days, dayName]);
      } else if (!checked) {
        formik.setFieldValue(
          "days",
          formik.values.days.filter((day) => day !== dayName)
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [weekDaysCheckBox]
  );

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit} noValidate>
      <Card>
        <CardHeader title="Dados da Turma:" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={9}>
                <TextField
                  fullWidth
                  error={!!(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  label="Nome da Turma"
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
                <NumericFormat
                  customInput={TextField}
                  decimalScale={0}
                  decimalSeparator=","
                  fixedDecimalScale
                  error={
                    !!(formik.touched.vacancies && formik.errors.vacancies)
                  }
                  helperText={
                    formik.touched.vacancies && formik.errors.vacancies
                  }
                  label="Vagas"
                  name="vacancies"
                  onBlur={formik.handleBlur}
                  value={formik.values.vacancies}
                  onChange={(e) => {
                    formik.setFieldValue("vacancies", e.target.value);
                  }}
                  id="vacancies-input"
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
                  label="Início das Aulas"
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
                  label="Término das Aulas"
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
                <DesktopTimePicker
                  ampm={false}
                  error={
                    !!(formik.touched.startTime && formik.errors.startTime)
                  }
                  fullWidth
                  helperText={
                    formik.touched.startTime && formik.errors.startTime
                  }
                  label="Hora de início das aulas"
                  name="startTime"
                  onBlur={formik.handleBlur}
                  value={formik.values.startTime}
                  onChange={(value) => {
                    formik.setFieldValue("startTime", value);
                  }}
                  id="start-time-input"
                  required
                />
              </Grid>
              <Grid xs={12} md={3}>
                <DesktopTimePicker
                  ampm={false}
                  fullWidth
                  error={!!(formik.touched.endTime && formik.errors.endTime)}
                  helperText={formik.touched.endTime && formik.errors.endTime}
                  label="Hora de término das aulas"
                  name="endTime"
                  onBlur={formik.handleBlur}
                  value={formik.values.endTime}
                  onChange={(value) => {
                    formik.setFieldValue("endTime", value);
                  }}
                  id="end-time-input"
                  required
                />
              </Grid>

              <Grid xs={12} md={6}>
                <FormControl sx={{ m: 3 }}>
                  <FormLabel id="weekdays-group">Dias das Aula</FormLabel>
                  <FormGroup
                    aria-labelledby="weekdays-group"
                    id="weekdays-checkbox"
                  >
                    {Object.entries(weekDayPtBR).map(([day, dayPT]) => (
                      <FormControlLabel
                        key={day}
                        label={dayPT}
                        control={
                          <Checkbox
                            name={day}
                            checked={weekDaysCheckBox[day]}
                            onChange={(e) => {
                              const { name, checked } = e.target;
                              setWeekDaysCheckBox({
                                ...weekDaysCheckBox,
                                [name]: checked,
                              });
                              handleDays(name, checked);
                            }}
                          />
                        }
                      />
                    ))}
                  </FormGroup>
                  <FormHelperText
                    error={!!(formik.touched.days && formik.errors.days)}
                  >
                    {formik.touched.days && formik.errors.days}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl sx={{ m: 3 }}>
                  <FormLabel id="courses-group">Escolha o Curso</FormLabel>
                  <RadioGroup
                    aria-labelledby="courses-group"
                    name="courseId"
                    value={formik.values.courseId}
                    onChange={(e) => {
                      formik.setFieldValue("courseId", e.target.value);
                    }}
                  >
                    {courses.map((course) => (
                      <FormControlLabel
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
        <CardActions sx={{ justifyContent: "flex-end", gap: 2 }}>
          <Button
            onClick={() => (id ? router.back() : setOpenClasseForm(false))}
          >
            Cancela
          </Button>
          <Button variant="contained" type="submit">
            Salvar Turma
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

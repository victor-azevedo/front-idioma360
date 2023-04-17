import handleResponseError from "@/src/errors/handleResponseError";
import { questionOptionsList } from "@/src/helpers";
import usePostQuestion from "@/src/hooks/api/usePostQuestion";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
// import makeStyles from "@mui/styles/makeStyles";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function QuestionForm({
  id,
  title,
  optionA,
  optionB,
  optionC,
  optionD,
  correctAnswer,
  testId,
  setOpenQuestionForm,
  setTestQuestions,
  testQuestions,
}) {
  const router = useRouter();

  const { postQuestion } = usePostQuestion();
  // const { patchQuestion } = usePatchQuestion();

  const formik = useFormik({
    initialValues: {
      title: title || "",
      optionA: optionA || "",
      optionB: optionB || "",
      optionC: optionC || "",
      optionD: optionD || "",
      correctAnswer: correctAnswer || "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Deve possuir mais do que 3 carácter")
        .required("Enunciado da é obrigatório"),
      optionA: Yup.string()
        .min(1, "Deve possuir mais do que 1 carácter")
        .required("Opção é obrigatório"),
      optionB: Yup.string()
        .min(1, "Deve possuir mais do que 1 carácter")
        .required("Opção é obrigatório"),
      optionC: Yup.string()
        .min(1, "Deve possuir mais do que 1 carácter")
        .required("Opção é obrigatório"),
      optionD: Yup.string()
        .min(1, "Deve possuir mais do que 1 carácter")
        .required("Opção é obrigatório"),
      correctAnswer: Yup.string()
        .min(1, "Deve selecionar qual a opção correta")
        .required("Selecionar a opção correta é obrigatório"),
    }),
    onSubmit: async (values, helpers) => {
      const questionBody = { ...values, testId };
      try {
        if (id) {
          // await patchQuestion(id, questionBody);
          toast.success("Questão atualizada com sucesso");
          router.back();
        } else {
          const newQuestion = await postQuestion(questionBody);
          setTestQuestions([...testQuestions, newQuestion]);
          setOpenQuestionForm(false);
          toast.success("Questão cadastrada com sucesso");
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
        <CardHeader title="Dados da Questão:" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                error={!!(formik.touched.title && formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                label="Enunciado da questão"
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.title}
                id="title-input"
                required
              />
              <TextField
                fullWidth
                error={!!(formik.touched.optionA && formik.errors.optionA)}
                helperText={formik.touched.optionA && formik.errors.optionA}
                label="Opção A"
                name="optionA"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.optionA}
                id="optionA-input"
                required
              />
              <TextField
                fullWidth
                error={!!(formik.touched.optionB && formik.errors.optionB)}
                helperText={formik.touched.optionB && formik.errors.optionB}
                label="Opção B"
                name="optionB"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.optionB}
                id="optionB-input"
                required
              />
              <TextField
                fullWidth
                error={!!(formik.touched.optionC && formik.errors.optionC)}
                helperText={formik.touched.optionC && formik.errors.optionC}
                label="Opção C"
                name="optionC"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.optionC}
                id="optionC-input"
                required
              />
              <TextField
                fullWidth
                error={!!(formik.touched.optionD && formik.errors.optionD)}
                helperText={formik.touched.optionD && formik.errors.optionD}
                FormHelperTextProps="color=primary"
                label="Opção D"
                name="optionD"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.optionD}
                id="optionD-input"
                required
              />

              <FormControl sx={{ m: 3 }}>
                <FormLabel id="options-group" color="primary">
                  Qual a opção correta?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="options-group"
                  name="correctAnswer"
                  value={formik.values.correctAnswer}
                  onChange={(e) => {
                    formik.setFieldValue("correctAnswer", e.target.value);
                  }}
                >
                  {questionOptionsList.map((option) => (
                    <FormControlLabel
                      key={option.id}
                      value={option.id}
                      control={<Radio />}
                      label={option.name}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText
                  error={
                    !!(
                      formik.touched.correctAnswer &&
                      formik.errors.correctAnswer
                    )
                  }
                >
                  {formik.touched.correctAnswer && formik.errors.correctAnswer}
                </FormHelperText>
              </FormControl>
            </Stack>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end", gap: 2 }}>
          <Button
            onClick={() => (id ? router.back() : setOpenQuestionForm(false))}
          >
            Cancela
          </Button>
          <Button variant="contained" type="submit">
            Salvar Questão
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

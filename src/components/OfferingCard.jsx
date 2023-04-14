import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import { Avatar, Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { parseMoneyToReal } from "../helpers";
import { getDayFromISOdate, getTimeFromISOdate } from "../helpers/date-helper";

export default function OfferingCard({
  id,
  startDate,
  endDate,
  testDate,
  testStartTime,
  testEndTime,
  resultDate,
  enrollPrice,
  status,
  classes,
  admin,
}) {
  const router = useRouter();

  return (
    <Card sx={{ m: 3, width: 450 }} variant="elevation">
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" textAlign="center">
            Processo seletivo 23/1
          </Typography>
          <Box
            sx={{
              width: 1,
              display: "inline-flex",
              color: "text.secondary",
              justifyContent: "center",
              gap: 2,
              p: 2,
            }}
          >
            {classes.map((classe) => (
              <Avatar
                key={classe.course.id}
                src={classe.course.imageUrl}
                alt="bandeira"
              ></Avatar>
            ))}
          </Box>
          <Box>
            <Typography variant="body1" textAlign="center">
              Período das Inscrições:
            </Typography>
            <Box
              sx={{
                width: 1,
                display: "inline-flex",
                color: "text.secondary",
                justifyContent: "center",
              }}
            >
              <TodayRoundedIcon />
              <Typography variant="body1" marginLeft={1}>
                {` ${getDayFromISOdate(startDate)} à ${getDayFromISOdate(
                  endDate
                )}`}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="body1" textAlign="center">
              Valor da Inscrição:
            </Typography>
            <Box
              sx={{
                width: 1,
                display: "inline-flex",
                color: "text.secondary",
                justifyContent: "center",
              }}
            >
              <LocalAtmRoundedIcon />
              <Typography variant="body1" marginLeft={1}>
                {parseMoneyToReal(enrollPrice)}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="body1" textAlign="center">
              Dia e horário da Prova:
            </Typography>
            <Box
              sx={{
                width: 1,
                display: "inline-flex",
                color: "text.secondary",
                justifyContent: "center",
              }}
            >
              <TodayRoundedIcon />
              <Typography variant="body1" marginLeft={1}>
                {` ${getDayFromISOdate(testDate)}`}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 1,
                display: "inline-flex",
                color: "text.secondary",
                justifyContent: "center",
              }}
            >
              <AccessTimeRoundedIcon />
              <Typography variant="body1" marginLeft={1}>
                {` ${getTimeFromISOdate(testStartTime)} às ${getTimeFromISOdate(
                  testEndTime
                )}`}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="body1" textAlign="center">
              Resultado dia:
            </Typography>
            <Box
              sx={{
                width: 1,
                display: "inline-flex",
                color: "text.secondary",
                justifyContent: "center",
              }}
            >
              <TodayRoundedIcon />
              <Typography variant="body1" marginLeft={1}>
                {` ${getDayFromISOdate(resultDate)}`}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
      <CardActions
        sx={{
          w: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {status === "open" && !admin ? (
          <Button size="large" onClick={() => router.push(`/app/classes/`)}>
            Confira as turmas disponíveis
          </Button>
        ) : (
          ""
        )}
        {admin && (
          <Button
            size="large"
            onClick={() => router.push(`/app/admin/offerings/${id}/edit`)}
          >
            <EditNoteRoundedIcon />
            Editar
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

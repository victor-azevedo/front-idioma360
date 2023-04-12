import { Box, Typography } from "@mui/material";
import { getDayFromISOdate } from "../helpers";

export default function UserInfo({ fullName, birthday, cpf, email, phone }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Confirme seus dados pessoais antes de confirmar sua inscrição:
      </Typography>
      <Typography variant="body1" gutterBottom>
        Nome Completo: {fullName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Data de Nascimento: {getDayFromISOdate(birthday)}
      </Typography>
      <Typography variant="body1" gutterBottom>
        CPF: {cpf}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Telefone: {phone}
      </Typography>
    </Box>
  );
}

import { Box, Typography } from "@mui/material";

export default function UserAddressInfo({
  street,
  number,
  complement,
  district,
  postalCode,
  city,
}) {
  return (
    <Box>
      <Typography variant="body1" gutterBottom>
        Rua: {street}, N: {number}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Complemento: {complement}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Bairro: {district}
      </Typography>
      <Typography variant="body1" gutterBottom>
        CEP: {postalCode}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Cidade: {city.name} - {city.state.uf}
      </Typography>
    </Box>
  );
}

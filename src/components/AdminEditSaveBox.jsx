import { Button, CardActions } from "@mui/material";
import { useRouter } from "next/router";

const AdminEditSaveBox = ({ allowEdition, setAllowEdition, type }) => {
  const router = useRouter();

  return (
    <CardActions sx={{ justifyContent: "flex-end", gap: 2 }}>
      {allowEdition && (
        <Button
          onClick={() =>
            type !== "create" ? setAllowEdition(false) : router.back()
          }
          disabled={!allowEdition}
        >
          Cancela
        </Button>
      )}
      {type !== "create" && (
        <Button
          variant="contained"
          disabled={allowEdition}
          onClick={() => setAllowEdition(true)}
        >
          Editar
        </Button>
      )}
      <Button variant="contained" type="submit" disabled={!allowEdition}>
        Salvar
      </Button>
    </CardActions>
  );
};

export default AdminEditSaveBox;

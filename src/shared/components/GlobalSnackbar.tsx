import { Snackbar, Alert, Button } from "@mui/material";
import { useSnackbarStore } from "@/shared/store/snackbar";

export const GlobalSnackbar = () => {
  const { open, loading, message, type, mode, hideSnackbar, confirm, cancel } =
    useSnackbarStore();
  return (
    <Snackbar
      open={open}
      autoHideDuration={mode === "auto" ? 2000 : null}
      onClose={(_, reason) => {
        if (reason === "clickaway") return;
        if (mode === "auto") hideSnackbar();
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert
        style={{ alignItems: "center" }}
        severity={type}
        variant="filled"
        action={
          mode === "confirm" ? (
            <>
              <Button onClick={cancel} color="inherit" size="small">
                Отмена
              </Button>
              <Button
                onClick={confirm}
                color="inherit"
                size="small"
                loading={loading}
              >
                Подтвердить
              </Button>
            </>
          ) : undefined
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

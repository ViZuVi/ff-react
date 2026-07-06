import { createPortal } from "react-dom";
import { Divider, IconButton, Paper, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./modal.module.css";

interface ModalProps {
  open: boolean;
  divider?: boolean;
  closeIcon?: boolean;
  title?: string;
  content?: string;
  children?: React.ReactNode;
  onClose: (reason?: "backdropClick" | "escapeKeyDown") => void;
}

export const UModal = ({
  open,
  divider,
  closeIcon = true,
  title,
  content,
  children,
  onClose,
}: ModalProps) => {
  return createPortal(
    <Modal open={open} onClose={(_, reason) => onClose(reason)}>
      <Paper className={styles["u-modal"]}>
        <Typography
          sx={{ margin: "16px auto", textAlign: "center" }}
          variant="h6"
          className={styles["u-modal__title"]}
        >
          {title}
        </Typography>
        {divider && <Divider />}
        {closeIcon && (
          <IconButton
            className={styles["u-modal__close-btn"]}
            size="small"
            aria-label="закрыть"
            onClick={() => onClose()}
          >
            <CloseIcon />
          </IconButton>
        )}
        <>{content || children}</>
      </Paper>
    </Modal>,
    document.body,
  );
};

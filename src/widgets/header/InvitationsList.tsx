import {
  statusTranslationKeys,
  type Invitation,
  type InvitationsType,
} from "@/entities/invitation";
import { Box, Button, CircularProgress, Divider } from "@mui/material";
import dayjs from "dayjs";
import { useMe } from "@/entities/user";
import styles from "./invitations.module.css";
import { useTranslation } from "react-i18next";

export const InvitationsList = ({
  invitations,
  type,
  loading,
}: {
  invitations: Invitation[];
  type: InvitationsType;
  loading?: boolean;
}) => {
  const { data: user } = useMe();
  // TODO: check inbox inv, separate logic?

  const { t } = useTranslation("profile");

  return (
    <div>
      <h3 className={styles["invitations-list__title"]}>
        {t("invitationsList")}
      </h3>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress aria-label="Loading…" />
        </Box>
      ) : invitations.length ? (
        <ul className={styles["invitations-list"]}>
          {invitations.map((inv, i) => (
            <div key={inv.id}>
              <li className={styles["invitations-item"]}>
                <span className={styles["invitations-item__date"]}>
                  {dayjs(inv.created_at).format("DD.MM.YYYY HH:mm")}
                </span>
                <p className={styles["invitations-item__data"]}>
                  {type === "inbox" && (
                    <span>
                      {inv.user.name} &nbsp;
                      {inv.status === "new"
                        ? t("youAreInvited")
                        : t("youWereInvited")}{" "}
                      {t("invitedToSpace")} {inv.space.name}
                    </span>
                  )}
                  {type === "outbox" && (
                    <span>
                      {t("youInvited")} {inv.user.name} {t("invitedToSpace")}{" "}
                      {inv.space.name}
                    </span>
                  )}
                  <span className={styles["invitations-item__message"]}>
                    {t("message")}: {inv.message || "отсутствует"}
                  </span>
                </p>
                {inv.status === "new" ? (
                  <div className={styles["invitations-item__actions"]}>
                    {user?.data.id === inv.user.id && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          sx={{ marginLeft: "auto" }}
                        >
                          {t("aceptBtn")}
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          sx={{ marginLeft: "auto" }}
                        >
                          {t("declineBtn")}
                        </Button>
                      </>
                    )}
                  </div>
                ) : (
                  <Button
                    sx={(theme) => ({
                      marginLeft: "auto",
                      [theme.breakpoints.down(768)]: { marginRight: "auto" },
                    })}
                    disabled
                  >
                    {t(statusTranslationKeys[inv.status])}
                  </Button>
                )}
              </li>
              {i < invitations.length - 1 && <Divider />}
            </div>
          ))}
        </ul>
      ) : (
        <p className={styles["invitations-list__empty"]}>{t("empty")}</p>
      )}
    </div>
  );
};

import {
  statuses,
  type Invitation,
  type InvitationsType,
} from "@/shared/types/Invitation";
import { Box, Button, CircularProgress, Divider } from "@mui/material";
import dayjs from "dayjs";
import styles from "./invitations.module.css";
import { useMe } from "@/entities/user/hooks/use-me";

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

  return (
    <div>
      <h3 className="invitations-list__title">Список приглашений</h3>
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
                      {inv.user.name}
                      {inv.status === "new" ? "приглашает" : "пригласил"} вас в
                      пространство {inv.space.name}
                    </span>
                  )}
                  {type === "outbox" && (
                    <span>
                      Вы пригласили {inv.user.name} в пространство{" "}
                      {inv.space.name}
                    </span>
                  )}
                  <span className={styles["invitations-item__message"]}>
                    Сообщение: {inv.message || "отсутствует"}
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
                          Принять
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          sx={{ marginLeft: "auto" }}
                        >
                          Отклонить
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
                    {statuses[inv.status]}
                  </Button>
                )}
              </li>
              {i < invitations.length - 1 && <Divider />}
            </div>
          ))}
        </ul>
      ) : (
        <p className="invitations-list__empty">
          Список {type} приглашений пуст
        </p>
      )}
    </div>
  );
};

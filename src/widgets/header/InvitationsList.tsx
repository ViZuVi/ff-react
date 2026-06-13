import type { Invitation } from "@/shared/types/Invitation"

export const InvitationsList = ({invitations, type}: {invitations: Invitation[], type: string}) => {
    return (
        <div className="invitations-list">
            <h3 className="invitations-list__title">Список приглашений</h3>
            {invitations.length ? <div>list</div> : <p className="invitations-list__empty">Список {type} приглашений пуст</p>}
        </div>
    )
}
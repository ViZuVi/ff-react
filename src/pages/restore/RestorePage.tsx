import { useNavigate } from "react-router"

export const RestorePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>RestorePage</h1>
            <button onClick={() => navigate(-1)}>back</button>
        </div>
    )
}
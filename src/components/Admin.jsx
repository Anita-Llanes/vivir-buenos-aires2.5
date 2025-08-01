import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function Admin() {
    const {admin} = useAuthContext();

    if(!admin){
        return(
            <Navigate to="/login" replace/>
        )
    }
    return(
        <div>
            <p>Bienvenido a Vivir Buenos Aires</p>
            <p>Ingresa tus datos</p>
        </div>
    )
}
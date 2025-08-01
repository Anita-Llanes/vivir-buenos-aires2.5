import { useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext, CarritoProvider } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { FaShoppingCart } from "react-icons/fa";

function Nav({}) {

    const {toursCarrito} = useContext(CarritoContext)
    const {user, admin} = useAuthContext();
    return ( 
        <nav style={{ backgroundColor: "green", color: "green", padding: "10px", width:"100%" }}>
            <ul style={{ listStyle: "none", display: "flex", justifyContent: "space-around", margin: 0 }}>  
                <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Inicio</Link></li>  
                <li><Link to="/tours" style={{ color: "white", textDecoration: "none" }}>Tours</Link></li>   
                <li><Link to="/nosotros" style={{ color: "white", textDecoration: "none" }}>Nosotros</Link></li>  
                <li><Link to="/contacto" style={{ color: "white", textDecoration: "none" }}>Contacto</Link></li>  
                <li><Link to="/carrito" style={{ color: "white", textDecoration: "none" }}> <FaShoppingCart/> <span>{toursCarrito.length > 0 ? toursCarrito.length : ""}</span></Link></li> 
                {admin ? <li><Link to="/admin" style={{ color: "white", textDecoration: "none" }}>Admin</Link></li> : <></> }
                <li><Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link></li>
                {admin ? <li><Link to="/admin/agregarTours" style={{ color: "white", textDecoration: "none" }}>Agregar tours</Link></li> : <></>}  
            </ul>
        </nav>
    );
}


export default Nav; 
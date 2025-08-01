import "../styles/Carrito.css"
import { useContext, useEffect, useState } from "react";
import CarritoCard from "./CarritoCard.jsx";
import { Navigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function Carrito() {
    const {user} = useAuthContext();
    const {toursCarrito, vaciarCarrito, borrarTourCarrito} = useContext(CarritoContext);
    console.log("Tours: " + toursCarrito)

    const total = toursCarrito.reduce(
        (subTotal, tour) => subTotal + tour.precio * tour.cantidad, 0
    )

    function funcionDisparadora(id){
        borrarTourCarrito(id)
    }

    function funcionDisparadora2(){
        vaciarCarrito()
    }

    console.log("Total: " + total)

    if(!user){
        return(
            <Navigate to="/login" replace/>
        )
    }

    return(
        <div className="carrito-conteiner">
            <button onClick={funcionDisparadora2}>Vaciar carrito</button>
            <div className="carrito-titulos" >
                <h2 className="carrito-titulo-tour"> Tour </h2>
                <h2 className="carrito-titulo-descripcion">Descripción</h2>
                <h2>  </h2>
                <h2> Cantidad </h2>
                <h2> Precio unitario </h2>
                <h2> Sub total </h2>
                <h2>  </h2>
            </div>
            {toursCarrito.length > 0 ? toursCarrito.map((tour) => (
                <CarritoCard 
                    tour={tour}
                    funcionDisparadora={funcionDisparadora}
                />
            ))
            : <p>Carrito vacio</p>}
            {total > 0 ? <span>Total a pagar: {total.toFixed(2)} $</span>: <></>}
        </div>
    )
}
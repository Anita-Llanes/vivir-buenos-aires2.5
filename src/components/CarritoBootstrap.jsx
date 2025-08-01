import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { AuthContext, useAuthContext } from "../contexts/AuthContext.jsx";
import CarritoCardBootstrap from "./CarritoCardBootstrap";

function CarritoBootstrap() {
    const {user} = useContext(AuthContext);
    const { toursCarrito, vaciarCarrito, borrarTourCarrito } = useContext(CarritoContext);

    const total = toursCarrito.reduce(
        (subTotal, tour) => subTotal + tour.precio * tour.cantidad,
        0
    );

    function funcionDisparadora(id) {
        borrarTourCarrito(id);
    }

    function funcionDisparadora2() {
        vaciarCarrito();
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <Container className="my-4">
        <h2 className="mb-3">Carrito de compras</h2>
        <Button variant="warning" className="mb-4" onClick={funcionDisparadora2}>
            Vaciar carrito
        </Button>

        {toursCarrito.length > 0 ? (
            toursCarrito.map((tour) => (
            <CarritoCardBootstrap
                key={tour.id}
                tour={tour}
                funcionDisparadora={funcionDisparadora}
            />
            ))
        ) : (
            <p>Carrito vacío</p>
        )}

        {total > 0 && (
            <h4 className="mt-4 text-end">Total a pagar: {total.toFixed(2)} $</h4>
        )}
        </Container>
    );
}

export default CarritoBootstrap;

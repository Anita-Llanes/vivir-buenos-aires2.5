import React, { createContext, useState } from 'react';
// Crear el contexto
export const CarritoContext = createContext();
// Proveedor del contexto
export function CarritoProvider({ children }) {
    const [toursCarrito, setToursCarrito] = useState([]);

    const agregarAlCarrito = (tour) => {
        console.log("test")
        const existe = toursCarrito.find(p => p.id === tour.id);
        if (existe) {
            const carritoActualizado = toursCarrito.map((p) => {
                if (p.id === tour.id){
                    const tourActualizado = {...p, cantidad: p.cantidad + tour.cantidad}
                    return tourActualizado
                }else{
                    return p
                }
            })
            setToursCarrito(carritoActualizado)
        }else{
            // Si no existe, lo agregamos con su cantidad
            const nuevoCarrito = [...toursCarrito, tour];
            setToursCarrito(nuevoCarrito)
        }
    };

    const vaciarCarrito = () => {
        setToursCarrito([]);
    };

    function borrarTourCarrito(id){
        console.log(id)
        const nuevoCarrito = toursCarrito.filter((p) => p.id !== id);
        setToursCarrito(nuevoCarrito);
    }

    return (
        <CarritoContext.Provider value={{ toursCarrito, agregarAlCarrito, vaciarCarrito, borrarTourCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}
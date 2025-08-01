import React, { createContext, useState, useContext } from 'react';
// Crear el contexto de de los tours
const ToursContext = createContext();
export function ToursProvider({ children }) {
    const [tours, setTours] = useState([])
    const [toursOriginales, setToursOriginales] = useState([])
    const [tourEncontrado, setTourEncontrado] = useState([])

    function obtenerTours() {
        return(
            new Promise((res, rej) => {
                fetch('https://6833c72e464b499636004c2e.mockapi.io/tours')
                    .then((respuesta) =>
                        respuesta.json()
                    )
                    .then((datos) => {
                        console.log(datos)
                        setTours(datos)
                        setToursOriginales(datos)
                        res(datos)
                    })
                    .catch((error) => {
                        console.log("Error", error)
                        rej(error)
                    })
                ;
            })
        )
    }

    const agregarTour = (tour) => {
        return(
            new Promise(async (res, rej) => {
                try {
                    const respuesta = await fetch('https://6833c72e464b499636004c2e.mockapi.io/tours', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(tour),
                    });

                    if (!respuesta.ok) {
                            throw new Error('Error al agregar el tour.');
                    }
                    const data = await respuesta.json();
                            console.log('Tour agregado:', data);
                            res(data)
                            //alert('Tour agregado correctamente');
                    } catch (error) {
                        console.error(error.message);
                        //alert('Hubo un problema al agregar el tour.');
                        rej(error.message)
                    }
            })
        )
    };

    function obtenerTour(id){
        return(
            new Promise((res, rej) => {
               fetch("https://6833c72e464b499636004c2e.mockapi.io/tours")
                .then((res) => res.json())
                .then((datos) => {
                    const tourEncontrado = datos.find((item) => item.id === id);
                    if (tourEncontrado) {
                    setTourEncontrado(tourEncontrado);
                    res(datos)
                    } else {
                        rej("Tour no encontrado")
                    }
                })
                .catch((err) => {
                    console.log("Error:", err);
                    rej("Hubo un error al obtener el tour.");
                }); 
            })
        )
    }

    function editarTour(tour){
        return(
            new Promise(async(res, rej) => {
            try {
                const respuesta = await fetch(`https://6833c72e464b499636004c2e.mockapi.io/tours/${tour.id}`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(tour),
                });
                if (!respuesta.ok) {
                    throw new Error('Error al actualizar el tour.');
                }
                const data = await respuesta.json();
                res(data)
            } catch (error) {
                console.error(error.message);
                rej(error)
            }
            })
        )
    }

    const eliminarTour = (id) => {
        const confirmar = window.confirm('¿Estás seguro de eliminar?');
        if (confirmar) {
            return(
                new Promise(async (res, rej) => {
                    try {
                        const respuesta = await fetch(`https://6833c72e464b499636004c2e.mockapi.io/tours/${id}`, {
                        method: 'DELETE',
                        });
                        if (!respuesta.ok) throw new Error('Error al eliminar');
                        alert('Tour eliminado correctamente.');
                        res()
                    } catch (error) {
                        console.error(error.message);
                        alert('Hubo un problema al eliminar el tour.');
                        rej(error)
                    }
                })
            )
        }
    }

    function filtrarTours(filtro){
        if(filtro.length < 0){
            setTours(toursOriginales)
            return;
        }

        const toursFiltrados = toursOriginales.filter((tour) =>
            tour.nombre.toLowerCase().includes(filtro.toLowerCase())
        );
        setTours(toursFiltrados)
    }

    return (
        <ToursContext.Provider value={{ filtrarTours, obtenerTours, tours, agregarTour, obtenerTour, tourEncontrado, editarTour, eliminarTour }}>
        {children}
        </ToursContext.Provider> 
    );
}
export const useToursContext = () => useContext(ToursContext);
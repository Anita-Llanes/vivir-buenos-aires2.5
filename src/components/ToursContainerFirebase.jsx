import { useEffect, useState } from "react"
import "../styles/Tours.css"
import Card from "./Card"

function ToursContainerFirebase({}){
    const [tours, setTours] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    {useEffect(() => {
        fetch('https://6833c72e464b499636004c2e.mockapi.io/tours')
            .then((respuesta) =>
                respuesta.json()
            )
            .then((datos) => {
                console.log(datos)
                setTours(datos)
                setCargando(false);
            })
            .catch((error) => {
                console.log("Error", error)
                setError('Hubo un problema al cargar los tours.');
                setCargando(false);
            });
    }, []);}

    if (cargando) {
        return <p>Cargando tours...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div className="tours-conteiner">
                {tours.map((tour) => (
                    <Card
                        tour={tour}
                    />
                ))}
            </div>
        )
    }

    
}

export default ToursContainerFirebase


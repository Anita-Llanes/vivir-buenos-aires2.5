import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Tours.css";
import { dispararSweetBasico } from "../assets/SweetAlert";
import Card from "./Card"
import Carrito from "./Carrito"

function ToursContainer1({functionCarrito} ){
    const { id } = useParams();
    const [tours, setTours] = useState([])
    const [cantidad, setCantidad] = useState(1);
    //const [toursCarrito, setToursCarrito] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    //const [total, setTotal] = useState(0)

    {useEffect(() =>{
        fetch('https://6833c72e464b499636004c2e.mockapi.io/tours')
        .then((res) => res.json())
            .then((datos) => {
                console.log(datos)
                setTours(datos)
                setCargando(false);
            })
            .catch((error) => {
                console.log("Error", error)
                setError('Hubo un error al cargar los tours.');
                setCargando(false);
            });
    }, []);}

    if (cargando) {
        return <p>Cargando tours...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{

        return(

            <div className="tours-container">
                 {tours.map((tour) => (
                     <Card
                        tour={tour}
                    />
                 ))}
            </div>

    // <div>
//     <Carrito
//         toursCarrito={toursCarrito}
//         total={total}
//     />
// </div>


        )
    }
}

export default ToursContainer1
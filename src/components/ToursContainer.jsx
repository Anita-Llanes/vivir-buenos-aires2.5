import { useEffect, useState } from "react"
import "../styles/Tours.css"
import { useToursContext } from "../contexts/ToursContext"
import { useAuthContext } from "../contexts/AuthContext"
import { Helmet } from "react-helmet";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardTour from "./Card"
import { FaSearch } from "react-icons/fa";


function ToursContainer({}){
    const {tours, obtenerTours, filtrarTours} = useToursContext();

    //inicio paginación
    const toursPorPagina = 4;
    const [paginaActual, setPaginaActual] = useState(1);
    // Calcular el índice de los tours a mostrar en la página actual
    
    const indiceUltimoTour = paginaActual * toursPorPagina;
    const indicePrimerTour = indiceUltimoTour - toursPorPagina;
    const toursActuales = tours.slice(indicePrimerTour, indiceUltimoTour);
    const totalPaginas = Math.ceil(tours.length / toursPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);
    
    //fin paginación



    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState("")

    
    {useEffect(() => {
        obtenerTours().then((tours) => {
            setCargando(false);
        }).catch((error) => {
            setError('Hubo un problema al cargar los tours.');
            setCargando(false);
        })
    }, []);}
    

    
    useEffect(() => {
        filtrarTours(filtro)
    },[filtro])
    


    if (cargando) {
        return <p>Cargando tours...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div>
                <Helmet>
                    <title>Tours | Vivir Buenos Aires</title>
                    <meta nombre="descripcion" content="Explora nuestra variedad de tours." />
                </Helmet>
                <div className="input-group mb-3 mt-3">
                    <span className="input-group-text">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar tours..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>
                <Row xs={1} md={2} lg={4} className="g-4">{/*Grid nde boostrap*/ }
                    {toursActuales.length > 0 ? toursActuales.map((tour) => (
                        <Col>
                            <CardTour
                                tour={tour}
                            />
                        </Col>
                    )): <></>}
                </Row>
                <div className="d-flex justify-content-center my-4"> {/*Componente de paginacion*/ }
                    {Array.from({ length: totalPaginas }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => cambiarPagina(index + 1)}
                    >
                        {index + 1}
                    </button>
                    ))}
                </div>
            </div>
        )
    }

    
}

export default ToursContainer


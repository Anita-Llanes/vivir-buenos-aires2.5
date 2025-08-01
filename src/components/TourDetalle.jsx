import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/TourDetalle.css";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useToursContext } from "../contexts/ToursContext";
import Tour from "./BotonCompra";
import { Button } from "react-bootstrap";

function TourDetalle({}) {

  const navegar = useNavigate();

  const {admin} = useAuthContext();
  const {agregarAlCarrito} = useContext(CarritoContext);
  const {tourEncontrado, obtenerTour, eliminarTour} = useToursContext();

  const { id } = useParams();
  //const [tour, setTour] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerTour(id).then(() => {
      setCargando(false);
    }).catch((error) => {
      if(error == "Tour no encontrado"){
        setError("Tour no encontrado")
      }
      if(error == "Hubo un error al obtener el tour."){
        setError("Hubo un error al obtener el tour.");
      }
      setCargando(false);
    })
  }, [id]);


  function funcionCarrito() {
    if (cantidad < 1) return;

    console.log("Agregar al carrito")
    agregarAlCarrito({ ...tourEncontrado, cantidad });
    dispararSweetBasico("Tour Agregado", "El tour fue agregado al carrito con éxito", "success", "Cerrar");
  }

  function dispararEliminar(){
    eliminarTour(id).then(() => {
      navegar("/tours")
    }).catch((error) => {
      dispararSweetBasico("Hubo un problema al agregar el tour", error, "error", "Cerrar")
    })
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  if (cargando) return <p>Cargando tour...</p>;
  if (error) return <p>{error}</p>;
  if (!tourEncontrado) return null;

  return (
    <div className="detalle-container">
      <img className="detalle-imagen" src={tourEncontrado.imagen} alt={tourEncontrado.nombre} />
      <div className="detalle-info">
        <h2>{tourEncontrado.nombre}</h2>
        <p>{tourEncontrado.descripcion}</p>
        <p>{tourEncontrado.precio} $</p>
        <div className="detalle-contador">
          <button onClick={restarContador}>-</button>
          <span>{cantidad}</span>
          <button onClick={sumarContador}>+</button>
        </div>
        {admin ? <Link to={"/admin/editarTour/" + id}> <Button >Editar Tour</Button></Link> : <Button onClick={funcionCarrito}>Agregar al carrito</Button> }
        {admin ? <button onClick={dispararEliminar} >Eliminar Tour</button> : <></>}
      </div>
    </div>
  );
}

export default TourDetalle;

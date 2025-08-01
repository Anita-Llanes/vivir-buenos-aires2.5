import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToursContext } from "../contexts/ToursContext";
import { useAuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

function FormularioEdicion({ }) {
  const {admin} = useAuthContext();
  const {obtenerTour, tourEncontrado, editarTour} = useToursContext();
  const { id } = useParams();
  const [tour, setTour] = useState(tourEncontrado);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  if(!admin){
    return(
      <Navigate to="/login" replace/>
    )
  }

  useEffect(() => {
    obtenerTour(id).then(() => {
      //setTour(tourEncontrado)
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

  const handleChange = (e) => {
    const { nombre, value } = e.target;
    setTour({ ...tour, [nombre]: value });
  };

  const validarFormulario = () => {
    if (!tour.nombre.trim()) {
      return("El nombre es obligatorio.")
    }
    if (!tour.precio || tour.precio <= 0) {
      return("El precio debe ser mayor a 0.")
    }
    console.log(tour.descripcion.trim())
    if (!tour.descripcion.trim() || tour.descripcion.length < 10) {
      return("La descripción debe tener al menos 10 caracteres.")
    }
    if(!tour.imagen.trim()){
      return("La url de la imgaen no debe estar vacía")
    }
    else{
      return true
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario()
    if(validarForm == true){
      editarTour(tour).then((prod) => {
        toast.success("Tour editado correctamente!");
      }).catch((error) => {
        toast.error("Hubo un problema al actualizar el tour. " + error.message);
      })
    }else{
      dispararSweetBasico("Error en la carga de tour", validarForm, "error", "Cerrar")
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Tour</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          nombre="nombre"
          value={tour.nombre || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>URL de la Imagen</label>
        <input
          type="text" nombre="imagen" value={tour.imagen} onChange={handleChange} required/>
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          nombre="precio"
          value={tour.precio || ''}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          nombre="descripcion"
          value={tour.descripcion || ''}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Actualizar Tour</button>
      <ToastContainer />
    </form>
  );
}

export default FormularioEdicion

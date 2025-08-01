import React, { useState } from 'react';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { agregarTour } from '../assets/requests';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function FormularioTourFirebase({}) {

  const {admin} = useAuthContext();

  const [tour, setTour] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: ""
  });

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

  const handleChange = (e) => {
    const { nombre, value } = e.target;
    setTour({ ...tour, [nombre]: value });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const validarForm = validarFormulario()
    if (validarForm == true) {
      agregarTour(tour).then((data) => {
        setTour({ nombre: '', precio: '', descripcion: '', imagen: ""});
      }).catch((error) => {
        dispararSweetBasico("Hubo un problema al agregar el tour", error, "error", "Cerrar")
      })
    } else{
      dispararSweetBasico("Error en la carga de tour", validarForm, "error", "Cerrar")
    }
  }

  if(!admin){
    return(
      <Navigate to="/login" replace/>
    )
  }

  return ( 
    <form onSubmit={handleSubmit2}>
      <h2>Agregar Tour</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text" nombre="nombre" value={tour.nombre} onChange={handleChange} required/>
      </div>
      <div>
        <label>URL de la Imagen</label>
        <input
          type="text" nombre="imagen" value={tour.imagen} onChange={handleChange} required/>
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" nombre="precio" value={tour.precio} onChange={handleChange} required
          min="0"/>
      </div>
       <div>
        <label>Descripción:</label>
        <textarea
          nombre="descripcion"
          value={tour.descripcion}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Agregar Tour</button>
    </form>
  );
}

export default FormularioTourFirebase;
  
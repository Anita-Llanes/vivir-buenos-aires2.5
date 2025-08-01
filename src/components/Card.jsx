import { useState } from "react";
import "../styles/Tours.css"
import { dispararSweetBasico } from "../assets/SweetAlert";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardTour({tour}){
    console.log(tour)

    return(
        <Card>
            <Card.Img variant="top" src={tour.imagen} style={{ maxHeight: "200px", objectFit: "cover" }} />
            <Card.Body>
              <Card.Title>{tour.nombre}</Card.Title>
                <Link to={"/tours/" + tour.id}><Button variant="primary">Ver detalles del tour</Button></Link>
            </Card.Body>
          </Card>
        
    )
}

export default CardTour
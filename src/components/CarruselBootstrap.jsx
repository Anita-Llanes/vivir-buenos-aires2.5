import { useToursContext } from "../contexts/ToursContext";
import { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";

function CarruselBootstrap() {
    const { tours, obtenerTours } = useToursContext();
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (tours.length === 0) {
            obtenerTours().then(() => setCargando(false));
        } else {
            setCargando(false);
        }
    }, []);

    const primerosCuatro = tours.slice(0, 4);

    if (cargando) return <p>Cargando carrusel...</p>;
    if (primerosCuatro.length === 0) return <p>No hay tours para mostrar.</p>;

    return (
        <Container className="my-4">
            <Carousel>
                {primerosCuatro.map((tour) => (
                <Carousel.Item key={tour.id}>
                    <img
                    className="d-block w-100"
                    src={tour.imagen}
                    alt={tour.nombre}
                    style={{ height: "400px", objectFit: "cover" }}
                    />
                    <Carousel.Caption>
                    <h3>{tour.nombre}</h3>
                    <p>{tour.descripcion}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
}

export default CarruselBootstrap;

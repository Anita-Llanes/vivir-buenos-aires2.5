import { Card, Row, Col, Button } from "react-bootstrap";

function CarritoCardBootstrap({ tour, funcionDisparadora }) {
    function borrarDelCarrito() {
        funcionDisparadora(tour.id);
    }

    return (
        <Card className="mb-3">
        <Card.Body>
            <Row className="align-items-center">
            <Col md={3}>
                <Card.Img
                variant="top"
                src={tour.imagen}
                style={{ maxHeight: "100px", objectFit: "cover", width: "100%" }}
                />
            </Col>
            <Col md={2}>
                <Card.Title>{tour.nombre}</Card.Title>
                <Card.Text className="text-muted">{tour.descripcion}</Card.Text>
            </Col>
            <Col md={1}>
                <span>Cant: {tour.cantidad}</span>
            </Col>
            <Col md={2}>
                <span>Precio: {tour.precio} $</span>
            </Col>
            <Col md={2}>
                <span>Subtotal: {tour.cantidad * tour.precio} $</span>
            </Col>
            <Col md={2}>
                <Button variant="danger" onClick={borrarDelCarrito}>
                X
                </Button>
            </Col>
            </Row>
        </Card.Body>
        </Card>
    );
}

export default CarritoCardBootstrap;

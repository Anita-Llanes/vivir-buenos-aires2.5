import { Container, Row, Col, Image } from "react-bootstrap";

function MainBootstrap() {
  return (
    <Container className="my-4">
      <Row className="align-items-center">
        <Col xs={12} md={2} lg={2}>
          <Image
            src="https://i.postimg.cc/c484BDL5/logo-AL.jpg"
            alt="Imagen logo"
            fluid
            rounded
          />
        </Col>
        <Col xs={12} md={10} lg={10}>
          <h2>Buenos Aires te espera</h2>
            <p></p>
            <p></p>
            <p>¡Te damos la bienvenida a <span class="fw-bold">VIVIR BUENOS AIRES</span> , el sitio donde, en un par de clics, vas a poder consultar y adquirir, visitas guiadas, experencias, paseos y tours!</p>
            <p>Conoce todo lo que no podés dejar de ver, hacer y experimentar en esta ciudad que nunca duerme.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default MainBootstrap;

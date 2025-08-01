import "../styles/Carrito.css"

function CarritoCard({tour, funcionDisparadora}){
    
    function borrarDelCarrito() {
        console.log("Paso 1")
        funcionDisparadora(tour.id)
    }

    return(
        <div className="carrito-card" >
            <h3 className="carrito-tour" style={{color:"black"}}>{tour.nombre}</h3>
            {<p className="descripcion-carrito" style={{color:"black"}}>{tour.descripcion}</p>}
            <img className="carrito-image" src={tour.imagen}></img>
            <span style={{color:"black"}}>{tour.cantidad}</span>
            <div className="carrito-unitario">
                <span style={{color:"black"}}>{tour.precio} $</span>
            </div>
            <div className="carrito-sub">
                <span style={{color:"black"}}>{tour.cantidad * tour.precio} $</span>
            </div>
            <button className="boton-carrito" onClick={borrarDelCarrito} style={{backgroundColor: "red" ,color:"black"}}>X</button>
        </div>
    )
}

export default CarritoCard
export const agregarTour = (tour) => {
    return(
        new Promise(async (res, rej) => {
            try {
                const respuesta = await fetch('https://6833c72e464b499636004c2e.mockapi.io/tours', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(tour),
                });

                if (!respuesta.ok) {
                        throw new Error('Error al agregar el tour.');
                }
                const data = await respuesta.json();
                        console.log('Tour agregado:', data);
                        res(data)
                        //alert('Tour agregado correctamente');
                } catch (error) {
                    console.error(error.message);
                    //alert('Hubo un problema al agregar el tour.');
                    rej(error.message)
                }
        })
    )
};

export const eliminarTour = (id) => {
 const confirmar = window.confirm('¿Estás seguro de eliminar?');
 if (confirmar) {
    return(
        new Promise(async (res, rej) => {
            try {
                const respuesta = await fetch(`https://mockapi.io/api/v1/tours/${id}`, {
                method: 'DELETE',
                });
                if (!respuesta.ok) throw new Error('Error al eliminar');
                alert('Tour eliminado correctamente.');
                res()
            } catch (error) {
                console.error(error.message);
                alert('Hubo un problema al eliminar el tour.');
                rej()
            }
        })
    )
 }
};

import React, {useState, useRef} from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

function EditarProducto (props) {

    // destructuring de props
    const {producto, history, guardarRecargarProductos} = props

    // generar los refs
    const precioPlatilloRef = useRef('');
    const nombrePlatilloRef = useRef('');


    const [error, guardarError ] = useState(false);
    const [ categoriaPlatillo, guardarCategoria ] = useState('');

    const editarProducto = async e => {
        e.preventDefault();

        // validacion

        const nuevoNombrePlatillo = nombrePlatilloRef.current.value,
                nuevoPrecioPlatillo = precioPlatilloRef.current.value;
        
        if( nuevoNombrePlatillo === '' || nuevoPrecioPlatillo === '' || categoriaPlatillo === ''){
            guardarError(true);
            return;
        }

        guardarError(false);
        // Revisar si cambio la categoria de lo contrario asignar
        // el mismo valor
        let categoriaPlatilloAsignado = (categoriaPlatillo === '') ? producto.categoriaPlatillo : categoriaPlatillo;

        // obtener los valores del formulario

        const editarPlatillo = {
            precioPlatillo: nuevoPrecioPlatillo,
            nombrePlatillo: nuevoNombrePlatillo,
            categoriaPlatillo: categoriaPlatilloAsignado
        }

        // Enviar el Request
        const url = `http://localhost:4000/restaurant/${producto.id}`;

        try{
            const resultado = await axios.put(url, editarPlatillo);

            if(resultado.status === 200){
                Swal.fire(
                    'Producto Editado',
                    'El producto se ha editó correctamente',
                    'success'
                  )
            }

        }catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Error...',
                text: 'Hubo un error, vuelve a intentarlo',
              })
        }

        // redirigir al usuario, consultar api
        guardarRecargarProductos(true);
        history.push('/productos');
    }

    const leerValorRadio =  e => {
        guardarCategoria(e.target.value)
    }

    return (
        <div className="col-md-8 mx-auto ">
        <h1 className="text-center">Editar Producto</h1>

        {(error) ? <Error mensaje='Todos los campos son obligatorios' /> : null}

        <form
            className="mt-5"
            onSubmit={editarProducto}
        >
            <div className="form-group">
                <label>Nombre Platillo</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="nombre" 
                    placeholder="Nombre Platillo"
                    ref={nombrePlatilloRef}
                    defaultValue={producto.nombrePlatillo}
                />
            </div>

            <div className="form-group">
                <label>Precio Platillo</label>
                <input 
                    type="number" 
                    className="form-control" 
                    name="precio"
                    placeholder="Precio Platillo"
                    ref={precioPlatilloRef}
                    defaultValue={producto.precioPlatillo}
                />
            </div>

            <legend className="text-center">Categoría:</legend>
            <div className="text-center">
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="postre"
                    onChange={leerValorRadio}
                    defaultChecked={(producto.categoriaPlatillo === 'postre')}
                />
                <label className="form-check-label">
                    Postre
                </label>
            </div>
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="bebida"
                    onChange={leerValorRadio}
                    defaultChecked={(producto.categoriaPlatillo === 'bebida')}
                />
                <label className="form-check-label">
                    Bebida
                </label>
            </div>

            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="cortes"
                    onChange={leerValorRadio}
                    defaultChecked={(producto.categoriaPlatillo === 'cortes')}
                />
                <label className="form-check-label">
                    Cortes
                </label>
            </div>

            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="ensalada"
                    onChange={leerValorRadio}
                    defaultChecked={(producto.categoriaPlatillo === 'ensalada')}
                />
                <label className="form-check-label">
                    Ensalada
                </label>
            </div>
            </div>

            <input type="submit" 
                    className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" 
                    value="Editar Producto" />
        </form>
    </div>
    )
};
export default  withRouter(EditarProducto);
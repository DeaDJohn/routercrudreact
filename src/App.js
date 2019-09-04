import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import axios from 'axios';

import AgregarProducto from './componentes/AgregarProducto';
import EditarProducto from './componentes/EditarProducto';
import Productos from './componentes/Productos';
import Producto from './componentes/Producto';

import Header from './componentes/Header';

function App() {

	const [ productos, guardarProductos ] = useState([]);
	const [ recargarProductos, guardarRecargarProductos ] = useState(true);

	useEffect(() => {
		if(recargarProductos) {
			const consultarApi = async () => {
				// consultar la api del json-server
				const resultado = await axios.get('http://localhost:4000/restaurant');
	
				console.log(resultado.data);
	
				guardarProductos(resultado.data);
			}
			consultarApi();

			// Cambiar a false la recarga de los productos
			guardarRecargarProductos(false);
		}
	}, [recargarProductos])
	return (
		<Router>
			<Header />
			<main className="container mt-5">
				<Switch>
					<Route exact path="/productos"
						render={ () => (
							<Productos
								productos={productos}
								guardarRecargarProductos={guardarRecargarProductos}
							/>
						)}
					/>
					<Route exact path="/nuevo-producto" 
						render={ () =>(
							<AgregarProducto
								guardarRecargarProductos={guardarRecargarProductos}
							/>
						)} 
					/>
					<Route exact path="/productos/:id" component={Producto} />
					<Route exact path="/productos/editar/:id" 
						render={ props => {
							// tomar el Id del producto
							const idProducto = parseInt(props.match.params.id);

							// el product que se pasa al state
							const producto = productos.filter(producto => producto.id === idProducto);

							return(
								<EditarProducto 
									producto = {producto[0]}
									guardarRecargarProductos={guardarRecargarProductos}
								/>
							)
						}} />
				</Switch>
			</main>
			<p className="mt-4 p-2 text-center">Todos derechos reservados</p>
		</Router>
	);
}

export default App;

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

	useEffect(() => {
		const consultarApi = async () => {
			// consultar la api del json-server
			const resultado = await axios.get('http://localhost:4000/restaurant');

			console.log(resultado.data);

			guardarProductos(resultado.data);
		}
		consultarApi();
	}, [])
	return (
		<Router>
			<Header />
			<main className="container mt-5">
				<Switch>
					<Route exac path="/nuevo-producto" component={AgregarProducto} />
					<Route exac path="/productos" component={Productos} />
					<Route exac path="/productos/:id" component={Producto} />
					<Route exac path="/productos/editar/:id" component={EditarProducto} />
				</Switch>
			</main>
			<p className="mt-4 p-2 text-center">Todos derechos reservados</p>
		</Router>
	);
}

export default App;

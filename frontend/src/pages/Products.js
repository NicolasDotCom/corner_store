import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';  // Importa Link para la navegación

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  };

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => fetchProducts())
      .catch(error => console.error(error));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Precio</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">${product.value}</td>
              <td className="border px-4 py-2">
                {/* Botón de editar redirigiendo a la página de edición */}
                <Link to={`/edit-product/${product.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                  Editar
                </Link>
                {/* Botón de eliminar */}
                <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
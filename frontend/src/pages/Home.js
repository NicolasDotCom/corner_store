import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddToCart = (product) => {
    axios.post("http://localhost:5000/api/cart", {
      productId: product.id, // Asegúrate de que el backend necesita este campo
      name: product.name,
      value: product.value,
      image: product.image,
    })
      .then(() => {
        alert("Producto añadido al carrito");
      })
      .catch(error => {
        console.error("Error al añadir al carrito:", error);
        alert("Hubo un problema al añadir el producto al carrito.");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tienda Virtual</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-green-600 font-bold">Precio: ${product.value}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
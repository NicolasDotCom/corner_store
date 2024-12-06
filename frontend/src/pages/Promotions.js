import React, { useEffect, useState } from "react";
import axios from "axios";

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(response => {
        const promoProducts = response.data.filter(product => parseFloat(product.discountPercentage) > 0);
        setPromotions(promoProducts);
      })
      .catch(error => console.error("Error al obtener productos:", error));
  }, []);

  const addToCart = (product) => {
    axios.post("http://localhost:5000/api/cart", product)
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
      <h1 className="text-2xl font-bold mb-4">Promociones</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promotions.length === 0 ? (
          <p>No hay promociones disponibles actualmente.</p>
        ) : (
          promotions.map(({ id, name, value, discountPercentage, image }) => {
            const originalValue = parseFloat(value);
            const discount = parseFloat(discountPercentage);
            const discountedPrice = originalValue - (originalValue * (discount / 100));
            return (
              <div key={id} className="border p-4">
                <img src={image} alt={name} className="w-full h-48 object-cover mb-4" />
                <h2 className="text-xl font-bold mb-2">{name}</h2>
                <p className="text-gray-700 mb-2">Precio Original: ${originalValue.toFixed(2)}</p>
                <p className="text-red-500 mb-2">Precio con Descuento: ${discountedPrice.toFixed(2)}</p>
                <p className="text-green-500 mb-4">Descuento: {discount}%</p>
                <button onClick={() => addToCart({ id, name, value: discountedPrice, image })} className="bg-blue-500 text-white px-4 py-2 rounded">Añadir al Carrito</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Promotions;
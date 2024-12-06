import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState({ name: "", address: "" });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Fetch productos del carrito cuando el componente se monta
    axios.get("http://localhost:5000/api/cart")
      .then(response => {
        setCart(response.data);
      })
      .catch(error => console.error("Error al obtener el carrito:", error));
  }, []);

  useEffect(() => {
    // Calcular el total del carrito
    const totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.value) || 0, 0);
    setTotal(totalPrice);
  }, [cart]);

  const handlePurchase = () => {
    // Lógica para manejar la compra
    const purchaseData = {
      user: userData,
      items: cart,
      total: total
    };

    axios.post("http://localhost:5000/api/purchase", purchaseData)
      .then(response => {
        alert("Compra realizada con éxito");
        // Vaciar el carrito después de la compra
        setCart([]);
        setUserData({ name: "", address: "" });
        setTotal(0);
      })
      .catch(error => {
        console.error("Error al realizar la compra:", error);
        alert("Hubo un problema al realizar la compra.");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      {cart.length > 0 ? (
        <div>
          <div className="mb-6">
            {cart.map((item, index) => (
              <div key={index} className="border-b pb-4 mb-4">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-700">Precio: ${parseFloat(item.value).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Total: ${total.toFixed(2)}</h2>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Información del Comprador</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="border rounded px-4 py-2 mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Dirección"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
              className="border rounded px-4 py-2 mb-4 w-full"
            />
          </div>
          <button
            onClick={handlePurchase}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Comprar
          </button>
        </div>
      ) : (
        <p className="text-gray-600">El carrito está vacío.</p>
      )}
    </div>
  );
};

export default Cart;
import React, { useState } from "react";
import axios from "axios";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    code: "",
    inventory: "",
    brand: "",
    value: "",
    discountPercentage: "", // Añadir campo discountPercentage
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData); // Verificar los datos enviados
    axios.post("http://localhost:5000/api/products", formData)
      .then(() => alert("Producto creado exitosamente"))
      .catch(error => console.error("Error al crear el producto:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
      <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="image" placeholder="URL de Imagen" value={formData.image} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="code" placeholder="Código" value={formData.code} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="number" name="inventory" placeholder="Inventario" value={formData.inventory} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="brand" placeholder="Marca" value={formData.brand} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="number" name="value" placeholder="Valor" value={formData.value} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="number" name="discountPercentage" placeholder="Porcentaje de Rebaja" value={formData.discountPercentage} onChange={handleChange} className="border p-2 w-full mb-4" min="0" max="100" /> {/* Añadir campo discountPercentage */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Crear</button>
    </form>
  );
};

export default CreateProduct;
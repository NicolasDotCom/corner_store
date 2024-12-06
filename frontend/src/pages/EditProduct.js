import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    value: "",
    inventory: "",
    brand: "",
    code: "",
    image: "",
    discountPercentage: 0, // Añadir campo discountPercentage
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los detalles del producto
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el producto", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedProduct = { ...product };
    if (product.discountPercentage > 0) {
      updatedProduct.original_value = product.value;
      updatedProduct.value = product.value - (product.value * (product.discountPercentage / 100));
      updatedProduct.isOnPromotion = true;
    } else {
      updatedProduct.isOnPromotion = false;
    }

    // Enviar datos al servidor para actualizar el producto
    axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct)
      .then((response) => {
        alert("Producto actualizado con éxito");
        navigate("/products");  // Redirigir a la página de productos
      })
      .catch((error) => {
        console.error("Error al actualizar el producto", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <input type="text" name="name" placeholder="Nombre" value={product.name} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="image" placeholder="URL de Imagen" value={product.image} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="code" placeholder="Código" value={product.code} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="number" name="inventory" placeholder="Inventario" value={product.inventory} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="brand" placeholder="Marca" value={product.brand} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="number" name="value" placeholder="Valor" value={product.value} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="number" name="discountPercentage" placeholder="Porcentaje de Rebaja" value={product.discountPercentage} onChange={handleChange} className="border p-2 w-full mb-4" min="0" max="100" /> {/* Añadir campo discountPercentage */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Actualizar</button>
    </form>
  );
};

export default EditProduct;
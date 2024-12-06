const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./db"); // Conexión a la base de datos
const app = express();

dotenv.config();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

// Ruta para manejar el carrito
let cart = [];

// Añadir productos al carrito
app.post("/api/cart", (req, res) => {
  const { productId, name, value, image } = req.body;

  if (!productId || !name || !value || !image) {
    return res.status(400).json({ error: "Faltan datos del producto." });
  }

  const newCartItem = { productId, name, value, image };
  cart.push(newCartItem);

  console.log("Producto añadido al carrito:", newCartItem);

  return res.status(200).json({ message: "Producto añadido al carrito" });
});

// Obtener productos del carrito
app.get("/api/cart", (req, res) => {
  return res.json(cart);
});

// Vaciar carrito
app.delete("/api/cart", (req, res) => {
  try {
    cart.length = 0;
    res.status(200).json({ message: "Carrito vacío" });
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    res.status(500).json({ message: "Hubo un problema al procesar la compra." });
  }
});

// Ruta para obtener productos en promoción
app.get('/api/promotions', (req, res) => {
  const query = `
    SELECT id, name, image, code, inventory, brand, value, original_value, 
    ((original_value - value) / original_value) * 100 AS discount_percentage 
    FROM products 
    WHERE isOnPromotion = TRUE
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener las promociones:", error);
      return res.status(500).json({ message: "Error al obtener las promociones" });
    }
    res.json(results);
  });
});

// Ruta para crear un producto
app.post('/api/products', (req, res) => {
  const { name, image, code, inventory, brand, value, discountPercentage } = req.body;
  console.log("Datos recibidos:", req.body); // Verificar los datos recibidos
  const query = 'INSERT INTO products (name, image, code, inventory, brand, value, discountPercentage) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, image, code, inventory, brand, value, discountPercentage], (error, results) => {
    if (error) {
      console.error("Error al crear el producto:", error);
      return res.status(500).json({ message: "Error al crear el producto" });
    }
    res.status(201).json({ message: "Producto creado exitosamente", productId: results.insertId });
  });
});

// Ruta para editar un producto
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, image, code, inventory, brand, value, discountPercentage } = req.body;

  const originalValue = discountPercentage > 0 ? value / (1 - discountPercentage / 100) : value;
  const isOnPromotion = discountPercentage > 0;

  const query = `
    UPDATE products 
    SET name = ?, image = ?, code = ?, inventory = ?, brand = ?, value = ?, original_value = ?, isOnPromotion = ?
    WHERE id = ?
  `;

  db.query(query, [name, image, code, inventory, brand, value, originalValue, isOnPromotion, id], (error, results) => {
    if (error) {
      console.error("Error al editar el producto:", error);
      return res.status(500).json({ message: "Error al editar el producto" });
    }
    res.status(200).json({ message: "Producto actualizado exitosamente" });
  });
});

app.post('/api/purchase', (req, res) => {
  const { user, items, total } = req.body;

  // Aquí puedes agregar la lógica para procesar la compra, como guardar los datos en la base de datos

  // Vaciar el carrito después de la compra
  cart.length = 0;

  // Ejemplo de respuesta exitosa
  res.status(200).json({ message: "Compra realizada con éxito" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
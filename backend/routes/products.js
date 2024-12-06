const express = require("express");
const db = require("../db");
const router = express.Router();

// Fetch all products
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a new product
router.post("/", (req, res) => {
  const { name, image, code, inventory, brand, value } = req.body;
  const query = "INSERT INTO products (name, image, code, inventory, brand, value) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [name, image, code, inventory, brand, value], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Product added successfully!" });
  });
});

// Update a product
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, image, code, inventory, brand, value } = req.body;
  const query = "UPDATE products SET name = ?, image = ?, code = ?, inventory = ?, brand = ?, value = ? WHERE id = ?";
  db.query(query, [name, image, code, inventory, brand, value, id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Product updated successfully!" });
  });
});

// Delete a product
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Product deleted successfully!" });
  });
});

let cart = []; // Array para almacenar los productos del carrito (en memoria).

// Obtener productos del carrito
router.get("/cart", (req, res) => {
  res.json(cart);
});

// Agregar producto al carrito
router.post("/cart", (req, res) => {
  const product = req.body; // Suponemos que el producto incluye id, name y value.
  cart.push(product);
  res.status(201).json({ message: "Producto añadido al carrito", cart });
});

// Vaciar el carrito después de la compra
router.delete("/cart", (req, res) => {
  cart = [];
  res.status(200).json({ message: "Carrito vaciado" });
});

router.get("/promotions", (req, res) => {
  const promotions = products.filter(product => product.originalValue > product.value);
  res.json(promotions);
});

// Obtener producto por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener el producto" });
    }
    res.json(result[0]); // Retorna el primer producto encontrado
  });
});

// Actualizar producto por ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, value, inventory, brand, code, image } = req.body;

  db.query(
    "UPDATE products SET name = ?, value = ?, inventory = ?, brand = ?, code = ?, image = ? WHERE id = ?",
    [name, value, inventory, brand, code, image, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar el producto" });
      }
      res.json({ message: "Producto actualizado con éxito" });
    }
  );
});

module.exports = router;

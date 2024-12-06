import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBox, faPlus, faTags, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex justify-around items-center">
        <span className="text-xl font-bold">Corner Store</span>
        <li>
          <Link to="/" className="flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/products" className="flex items-center">
            <FontAwesomeIcon icon={faBox} className="mr-2" />
            Productos
          </Link>
        </li>
        <li>
          <Link to="/create-product" className="flex items-center">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Crear Producto
          </Link>
        </li>
        <li>
          <Link to="/promotions" className="flex items-center">
            <FontAwesomeIcon icon={faTags} className="mr-2" />
            Promociones
          </Link>
        </li>
        <li>
          <Link to="/cart" className="flex items-center">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            Carrito
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard.jsx";
import Context from "../Context.jsx";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Navbar } from "react-bootstrap";

function Shop() {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  // Fetch general product data
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Filter products based on name search update of searchquery
  const filterProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // filter products by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category.name === selectedCategory
      );
    }

    // Seperating products by price
    // if (selectedPriceRange) {
    //   const [minPrice, maxPrice] = selectedPriceRange.split("-");
    //   filtered = filtered.filter(
    //     (product) =>
    //       product.price >= Number(minPrice) && product.price <= Number(maxPrice)
    //   );
    // }
    // setting state to updated product
    setFilteredProducts(filtered);
  };
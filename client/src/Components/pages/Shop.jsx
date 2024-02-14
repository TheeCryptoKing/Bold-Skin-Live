// import React, { useContext, useEffect, useState } from "react";
// import ProductCard from "../ProductCard.jsx";
// import Context from '../Context'
// import { useNavigate} from "react-router-dom";
// import { Row, Col, Container, Navbar } from "react-bootstrap";


// function Shop() {
//     const { user } = useContext(Context);
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState("");
//     const [selectedPriceRange, setSelectedPriceRange] = useState("");

//   // Fetch general product data
//     useEffect(() => {
//       fetch("/products")
//         .then((response) => response.json())
//         .then((data) => {
//           setProducts(data);
//           setFilteredProducts(data);
//         })
//         .catch((error) => {
//           console.error("Error fetching products:", error);
//         });
//     }, []);

  
//     // Filter products based on name search update of searchquery
//     const filterProducts = () => {
//       let filtered = [...products];
  
//       if (searchQuery) {
//         filtered = filtered.filter((product) =>
//           product.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//       }
  
//       // filter products by category
//       if (selectedCategory) {
//         filtered = filtered.filter(
//           (product) => product.category.name === selectedCategory
//         );
//       }
  
//   // Seperating products by price 
//       // if (selectedPriceRange) {
//       //   const [minPrice, maxPrice] = selectedPriceRange.split("-");
//       //   filtered = filtered.filter(
//       //     (product) =>
//       //       product.price >= Number(minPrice) && product.price <= Number(maxPrice)
//       //   );
//       // }
//   // setting state to updated product
//       setFilteredProducts(filtered);
//     };
  
//     // Useeffect when retrieving data on render 
//     useEffect(() => {
//       filterProducts();
//     }, [
//       searchQuery,
//       selectedCategory,
//       selectedPriceRange,
//     ]);
  
//     const handleCategoryChange = (category) => {
//       setSelectedCategory(selectedCategory === category ? "" : category);
//         if (category === "Hair Growth") {
//           return navigate("/HairGrowth")
//           }

//     };
  
//     const handlePriceRangeChange = (priceRange) => {
//       setSelectedPriceRange(selectedPriceRange === priceRange ? "" : priceRange);
//     };


    

//     return (
      
//       <>
//           <Navbar className=" navbar-text">
//               <Navbar.Toggle />
//               <Navbar.Text
//                 onClick={() => handleCategoryChange("Face")}
//                 style={{
//                   cursor: "pointer",
//                   fontWeight: selectedCategory === "Face" ? "bold" : "normal",
//                 }}
//               >Face</Navbar.Text>
//               <Navbar.Text
//               onClick={() => handleCategoryChange("Beard")}
//                 style={{
//                   cursor: "pointer",
//                   fontWeight: selectedCategory === "Beard" ? "bold" : "normal",
//                 }}
//               >Beard</Navbar.Text>
//               <Navbar.Text
//               onClick={() => handleCategoryChange("Hair Growth")}
//                 style={{
//                   cursor: "pointer",
//                   fontWeight: selectedCategory === "Hair Growth" ? "bold" : "normal",
//                 }}
//               >Hair Growth</Navbar.Text>
//               <Navbar.Text
//               onClick={() => handleCategoryChange("Body")}
//                 style={{
//                   cursor: "pointer",
//                   fontWeight: selectedCategory === "Body" ? "bold" : "normal",
//                 }}
//               >Body</Navbar.Text>
//               <Navbar.Text
//               onClick={() => handleCategoryChange("Hair")}
//                 style={{
//                   cursor: "pointer",
//                   fontWeight: selectedCategory === "Hair" ? "bold" : "normal",
//                 }}
//               >
//               Hair</Navbar.Text>
//               <Navbar.Text
//               onClick={() => handleCategoryChange("Merch")}
//                 style={{
//                   cursor: "pointer",
//                   fontWeight: selectedCategory === "Merch" ? "bold" : "normal",
//                 }}
//               >
//               Merch</Navbar.Text>
//           </Navbar>
//       <Container>
//       <Row >
//           <Col>
//             <div className="search-center"> 
//               <input
//               type="text"
//               placeholder="Search..."
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="search align-items-center"
//               />
//             </div>
//             <ProductCard products={filteredProducts}  searchQuery={searchQuery} />
//           </Col>
//           </Row>
//       </Container>
//       </>
//     );
// }
  
// export default Shop;
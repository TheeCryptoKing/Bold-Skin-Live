import React, { useState, useEffect, useContext } from "react";
import Context from "../Context";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Button, Accordion } from "react-bootstrap";
import LoadingAnimation from '../LoadingAnimation'
// import ReviewContainer from "../ReviewContainer.jsx";
// import ReviewForm from "../ReviewForm.jsx";

function Product() {
    // initalized State
//     const { id } = useParams();
//     const { user } = useContext(Context);
//     const [product, setProduct] = useState(null);
//     const [images, setImages] = useState([]);
//     const [quantity, setQuantity] = useState(1);
//     const [activeSection, setActiveSection] = useState("details");
// //   const [reviews, setReviews] = useState([]);

// // fetching product data by ID on render
//     useEffect(() => {
//         fetch(`/products/${id}`)
//         .then((response) => response.json())
//         .then((productData) => {
//             setProduct(productData);
//         })
//         .catch((error) => {
//             console.error("Error fetching product data:", error);
//         });
//     }, [id]);

// // Retriving review for product by id (Stretch)
// //   useEffect(() => {
// //     fetch(`/reviews/product/${id}`)
// //       .then((r) => r.json())
// //       .then((reviews) => {
// //         setReviews(reviews);
// //       });
// //   }, [id]);

// // grab image data for products
//     useEffect(() => {
//         if (product) {
//         const { image_1, image_2, background } = product;
//         const images = [];

//         if (image_1) {
//             images.push(image_1);
//         }
//         if (image_2) {
//             images.push(image_2);
//         }
//         if (background) {
//             images.push(background);
//         }

//         setImages(images);
//         }
//     }, [product]);

//     if (!product) {
//         return <LoadingAnimation />;
//     }

//     // Determins Quantitiy in backend 
//     const handleQuantityIncrement = () => {
//         setQuantity((prevQuantity) => prevQuantity + 1);
//     };
//     const handleQuantityDecrement = () => {
//         if (quantity > 1) {
//         setQuantity((prevQuantity) => prevQuantity - 1);
//         }
//     };
//     // toggle what is shown
//     const switchView = (section) => {
//         setActiveSection(section);
//     };

// ///////////////   Review Data Stretch //////////////
//     // Calcuate Avg Rating (Stretch)
// //   const calculateAverageRating = () => {
// //     if (reviews.length === 0) {
// //       return "No Ratings Yet";
// //     }
//     // Calcualte rating form totoal review (Stretch)
// //     const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
// //     const averageRating = totalRating / reviews.length;
// //     return averageRating.toFixed(1);
// //   };

//     // grabbing amount of review data
// //   const totalReviews = reviews.length;
// ///////////////////////////////////////////////////

//     // add to cart functionality 
//     const addToCart = () => {
//         const data = {
//         product_id: product.id,
//         quantity: quantity,
//         };

//         // fetch car data
//         fetch("/carts", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//         })
//         .then((response) => {
//             if (response.ok) {
//             console.log("Item added to cart");
//             } else {
//             throw new Error("Error adding item to cart");
//             }
//         })
//         .catch((error) => {
//             console.error(error);
//         });
//     };

//     return (
//         <Container>
//         <Row>
//         <Col md={6}>
//         {images.length > 1 ? (
//             <div className="product-carousel mdMT" interval={null}>
//             {images.map((image, index) => (
//                 <div key={index}>
//                 <img
//                     src={image}
//                     alt={`Image ${index}`}
//                     className="product-img"
//                 />
//                 </div>
//             ))}
//             </div>
//         ) : images.length === 1 ? (
//             <img src={images[0]} alt="Product" className="product-img mdMT" />
//         ) : null}
//         </Col>
//         <Col md={6}>
//         <div className=" lgMT">
//             <h3 className=" product-description">{product.name}</h3>
//             <h5 className=" product-description">${product.price}</h5>
//             <p className=" product-description">
//             <span >Rating: 4.6 </span>{" "}
//             |   
//             <span className="total-reviews">{"  "}
//                 Total Reviews: 50
//             </span>
//             </p>
            
//             {user ? (
//             <div className="quantity-styling">
//                 <Button
//                 variant="outline-danger"
//                 className="quantity-button"
//                 onClick={handleQuantityDecrement}
//                 >
//                 -
//                 </Button>
//                 <h4 className="">{quantity}</h4>
//                 <Button
//                 variant="danger"
//                 className="quantity-button"
//                 onClick={handleQuantityIncrement}
//                 >
//                 +
//                 </Button>
//                 <Button
//                 className="edit-profile-button"
//                 onClick={addToCart}
//                 >
//                 Add to Cart
//                 </Button>
//             </div>
//             ) : (
//             <></>
//             )}
//         </div>
//         <hr />
//         <Row className=" quantity-styling justify-content-center">
//         <Col md={6}>
//             <h5 className="">Intiative:</h5>
//             <p>{product.intiative}</p>
//         </Col>
//         {/* <h4
//             className={
//             activeSection === "details" ? "details-tag active" : "details-tag"
//             }
//             onClick={() => switchView("details")}
//         >
//             Details
//         </h4> */}
//         {/* <Col
//         md={6}
//         className="d-flex align-items-center justify-content-center"
//         >
//         <h4
//             className={
//             activeSection === "reviews" ? "reviews-tag active" : "reviews-tag"
//             }
//             onClick={() => switchView("reviews")}
//         >
//             Reviews
//         </h4>
//         </Col> */}
//     </Row>

//     <hr />
//     {/* {activeSection === "details" ? (
//         <Row>
//         <Col md={6}>
//             <h5 className="details-header">Description:</h5>
//             <p>{product.description}</p>
//             <h5 className="details-header">Ingredients:</h5>
//             <p>{product.ingredients}</p>
//         </Col>
//         <Col md={6}>
//             <h5 className="details-header">Intiative:</h5>
//             <p>{product.intiative}</p>
//             <h5 className="details-header">Storage/Upkeep:</h5>
//             <p>{product.storage}</p>
//         </Col>
//         </Row>
//     ) : (
//         <Row>
        
//         <Col md={12}>
//             <div className="review-container-wrapper">
//             <ReviewContainer reviews={reviews} />
//             Review
//             </div>
//             <hr />
//             <div className="review-form-wrapper">
//             {user ? (
//                 <ReviewForm product={product} />
//             ) : (
//                 <h5>
//                 Please <Link to="/login">sign in</Link> to leave a review
//                 </h5>
//             )}
//             </div>
//         </Col>
//         Review/ Comments/ section
//         </Row>
//         )} */}
//         <Accordion defaultActiveKey="0" className="accordion-drip" flush>
//       <Accordion.Item eventKey="0">
//         <Accordion.Header className="accordion-font">Details</Accordion.Header>
//         <Accordion.Body>
//         <p >{product.description}</p>
//         </Accordion.Body>
//       </Accordion.Item>
//       <Accordion.Item eventKey="1">
//         <Accordion.Header className="accordion-font">Ingredients</Accordion.Header>
//         <Accordion.Body>
//         <p>{product.ingredients}</p>
//         </Accordion.Body>
//       </Accordion.Item>
//       <Accordion.Item eventKey="2">
//         <Accordion.Header className="accordion-font">Storage/Upkeep</Accordion.Header>
//         <Accordion.Body>
//         <p>{product.storage}</p>
//         </Accordion.Body>
//       </Accordion.Item>
//     </Accordion>
//         </Col>
//     </Row>
//     <hr />

//         </Container>
// );
}


export default Product;
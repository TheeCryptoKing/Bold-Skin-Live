// import React, { useState, useContext, useEffect} from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import PaymentCheckout from "../PaymentAtCheckout";
// import AddressCheckout from "../AddressAtCheckout";
// import Confirmation from "../Confirmation";
// import Context from '../Context.jsx'

function Checkout() {
    // const {user, setUser} = useContext(Context)
    // const [currentStep, setCurrentStep] = useState("payment");
    // const [cart, setCart] = useState(null)
    // const [cartItems, setCartItems] = useState([])
    // const [cartTotal, setCartTotal] = useState([]);
    // console.log(currentStep)
    // const handlePaymentNext = () => {
    //     setCurrentStep("address");
    // };
    // // // Passed down as props from onNext() post 
    // const handleAddressNext = () => {
    //     setCurrentStep("confirm");
    // };

    // useEffect(() => {
    //     fetch("/carts")
    //         .then((response) => {
    //             if (response.ok) {
    //             return response.json();
    //             } else {
    //             throw new Error("Error fetching cart");
    //             }
    //         })
    //         .then((cart) => {
    //             setCart(cart);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    //     }, [user]);

    //     useEffect(() => {
    //         if (cart) {
    //             const items = cart.items.map((item) => (
    //                 <tr key={item.item_id}>
    //                 <td className="cart-data"><img src={item.product_image} style={{ width: '7vw', height :'9vh'}}/></td>
    //                 <td className="cart-data">{item.product_name}</td>
    //                 <td className="cart-data">{item.product_price}</td>
    //                 <td className="cart-data">  Quantity: {item.quantity}<br/>
    //                 </td>
    //                 <td className="cart-data">
    //                 </td>
    //                 </tr>
    //             ));
    //             setCartItems(items);
    //             const subtotal = cart.items.reduce((total, item) => {
    //                 return total + (item.product_price * item.quantity);
    //             }, 0);
    //             const roundedSubtotal = subtotal.toFixed(2);
    //             setCartTotal(roundedSubtotal);
    //             }
    //         }, [cart]);

    // return (
    //     <Container>
    //     <Row >
    //         <Col className="check-left-bg">
    //             {currentStep === "payment" && (
    //                 <PaymentCheckout onNext={handlePaymentNext} />
    //             )}
    //             {currentStep === "address" && (
    //                 <AddressCheckout onNext={handleAddressNext} />
    //             )}
    //             {currentStep === "confirm" && <Confirmation />} 
    //         </Col>
    //         <Col className="check-right-bg">
    //             <h1 className="title-text mdMT checkout-center">Order Summary</h1>
    //             <hr/>
    //             <h2 className="full-height">Cart Total: {cartTotal}</h2>
    //             <hr/>
    //             <h3 className="title-text">{cartItems}</h3>
    //             <h3></h3>
    //         </Col>
    //     </Row>

    //     </Container>
    // );
}

export default Checkout;
// import React, { useState, useEffect, useContext } from "react";
// import Context from "../Context.jsx";
// import { Card, Container, Row, Button, Col, Form } from "react-bootstrap";
// import { useNavigate} from "react-router-dom";
// import { Formik, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import AddressForm from "../addressForm.jsx";
// import UserPaymentForm from "../paymentForm.jsx";

// SYnntax will not allow me to inport this function in this specfic compoenent??? idk why
function UserPaymentFrom() {
//     const { user } = useContext(Context);
//     const [paymentDetails, setPaymentDetails] = useState([]);
//     const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);
//     const [selectedPaymentId, setSelectedPaymentId] = useState(null);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
  
//     useEffect(() => {
//       fetch(`/payments/${user.id}`)
//         .then((response) => {
//           if (response.ok) {
//             return response.json();
//           } else if (response.status === 404) {
//             return [];
//           } else {
//             throw new Error("Error fetching payment details");
//           }
//         })
//         .then((payments) => {
//           setPaymentDetails(payments);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }, [user]);
  
//     const handleAddPayment = () => {
//       setShowAddPaymentForm(!showAddPaymentForm);
//     };
  
//     const handleFormSubmit = (values) => {
//       if (selectedPaymentId) {
//         fetch(`/payments/${user.id}/${selectedPaymentId}`, {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(values),
//         })
//           .then((response) => {
//             if (response.ok) {
//               setPaymentDetails((prevPaymentDetails) =>
//                 prevPaymentDetails.map((payment) =>
//                   payment.id === selectedPaymentId
//                     ? { ...payment, ...values }
//                     : payment
//                 )
//               );
//               setShowAddPaymentForm(false);
//             } else {
//               throw new Error("Error saving payment details");
//             }
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       } else {
//         fetch(`/payments/${user.id}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(values),
//         })
//           .then((response) => {
//             if (response.ok) {
//               setPaymentDetails((prevPaymentDetails) => [
//                 ...prevPaymentDetails,
//                 values,
//               ]);
//               setShowAddPaymentForm(false);
//             } else {
//               throw new Error("Error saving payment details");
//             }
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       }
//     };
  
//     const handleConfirmDelete = () => {
//       if (selectedPaymentId) {
//         fetch(`/payments/${user.id}/${selectedPaymentId}`, {
//           method: "DELETE",
//         })
//           .then((response) => {
//             if (response.ok) {
//               setPaymentDetails((prevPaymentDetails) =>
//                 prevPaymentDetails.filter(
//                   (payment) => payment.id !== selectedPaymentId
//                 )
//               );
//               setSelectedPaymentId(null);
//               setShowDeleteModal(false);
//             } else {
//               throw new Error("Error deleting payment details");
//             }
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       }
//     };
  
//     const handleCancelDelete = () => {
//       setSelectedPaymentId(null);
//       setShowDeleteModal(false);
//     };
  
//     const paymentValidationSchema = Yup.object().shape({
//       cardholder_name: Yup.string().required("Cardholder name is required"),
//       card_number: Yup.string().required("Card number is required").length(16, "Card number must be exactly 16 characters"),
//       expiration_month: Yup.number()
//         .required("Expiration month is required")
//         .min(1, "Invalid month")
//         .max(12, "Invalid month"),
//       expiration_year: Yup.number()
//         .required("Expiration year is required")
//         .min(new Date().getFullYear(), "Invalid year"),
//       cvv: Yup.string()
//         .required("CVV is required")
//         .matches(/^\d{3}$/, "Invalid CVV"),
//     });
  
//     const handleEditPayment = (paymentId) => {
//       setSelectedPaymentId(paymentId);
//       setShowAddPaymentForm(true);
//     };
  
//     const handleDeletePayment = (paymentId) => {
//       setSelectedPaymentId(paymentId);
//       setShowDeleteModal(true);
//     };
  
//     // const cardNumber = paymentDetails.toString()
//     // const splitInteger = (cardNumber) => {
//     //   return Array.from(String(cardNumber), Number)
//     // }
//     // console.log(splitInteger)

//     return (
//       <Container>
//         {paymentDetails.length === 0 ? (
//           <Row>
//             <h3 className=" title-text mdMT mdMB">
//               Add a payment?
//               <Button onClick={handleAddPayment} className="edit-profile-button mdML">
//                 Click Here
//               </Button>
//             </h3>
//           </Row>
//         ) : (
//           <Row>
//             {paymentDetails.map((paymentMethod) => (
//               <Card key={paymentMethod.id} className="bg-card-color" style={{ width: '30vh' }}>
//                 <Card.Body>
//                   <Card.Title>{paymentMethod.cardholder_name}</Card.Title>
//                   {paymentMethod.card_number && typeof paymentMethod.card_number === "string" || "integer" && (
//                     <Card.Subtitle className="smMT">
//                       Card Number ending in: ****
//                       {/* {paymentMethod.card_number.toString()} */}
//                       {/* {splitInteger} */}
//                     </Card.Subtitle>
//                   )}
//                   <Button
//                     className="edit-profile-button mdMT"
//                     onClick={() => handleEditPayment(paymentMethod.id)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     className="edit-profile-button mdMT"
//                     onClick={() => handleDeletePayment(paymentMethod.id)}
//                   >
//                     Delete
//                   </Button>
//                 </Card.Body>
//               </Card>
//             ))}
//             <h3>
//               <Button onClick={handleAddPayment} className="edit-profile-button mdMT mdMB">
//                 Add Payment
//               </Button>
//             </h3>
//           </Row>
//         )}
//         {showDeleteModal && (
//           <div>
//             <p>Are you sure you want to delete this payment?</p>
//             <Button className="edit-profile-button" onClick={handleConfirmDelete}>
//               Confirm
//             </Button>
//             <Button className="edit-profile-button" onClick={handleCancelDelete}>
//               Cancel
//             </Button>
//           </div>
//         )}
//         {showAddPaymentForm && (
//           <Row>
//             <Formik
//               initialValues={{
//                 cardholder_name: "",
//                 card_number: "",
//                 expiration_month: "",
//                 expiration_year: "",
//                 cvv: "",
//               }}
//               validationSchema={paymentValidationSchema}
//               onSubmit={handleFormSubmit}
//             >
//               {({ handleSubmit }) => (
//                 <Form onSubmit={handleSubmit}>
//                   <Form.Group
//                     controlId="cardholder_name"
//                     className="payment-form-input"
//                   >
//                     <Form.Label>Cardholder Name</Form.Label>
//                     <Field type="text" name="cardholder_name" as={Form.Control} />
//                     <ErrorMessage
//                       name="cardholder_name"
//                       component={Form.Text}
//                       className="text-danger"
//                     />
//                   </Form.Group>
  
//                   <Form.Group
//                     controlId="card_number"
//                     className="payment-form-input"
//                   >
//                     <Form.Label>Card Number</Form.Label>
//                     <Field type="text" name="card_number" as={Form.Control} />
//                     <ErrorMessage
//                       name="card_number"
//                       component={Form.Text}
//                       className="text-danger"
//                     />
//                   </Form.Group>
  
//                   <Form.Group
//                     controlId="expiration_month"
//                     className="payment-form-input"
//                   >
//                     <Form.Label>Expiration Month</Form.Label>
//                     <Field
//                       type="number"
//                       min="1"
//                       max="12"
//                       name="expiration_month"
//                       as={Form.Control}
//                     />
//                     <ErrorMessage
//                       name="expiration_month"
//                       component={Form.Text}
//                       className="text-danger"
//                     />
//                   </Form.Group>
  
//                   <Form.Group
//                     controlId="expiration_year"
//                     className="payment-form-input"
//                   >
//                     <Form.Label>Expiration Year</Form.Label>
//                     <Field
//                       type="number"
//                       min={new Date().getFullYear()}
//                       name="expiration_year"
//                       as={Form.Control}
//                     />
//                     <ErrorMessage
//                       name="expiration_year"
//                       component={Form.Text}
//                       className="text-danger"
//                     />
//                   </Form.Group>
  
//                   <Form.Group controlId="cvv" className="payment-form-input">
//                     <Form.Label>CVV</Form.Label>
//                     <Field
//                       type="password"
//                       pattern="\d{3}"
//                       name="cvv"
//                       as={Form.Control}
//                     />
//                     <ErrorMessage
//                       name="cvv"
//                       component={Form.Text}
//                       className="text-danger"
//                     />
//                   </Form.Group>
//                   <h3></h3>
//                   <Button
//                     type="submit"
//                     className="shop-button"
//                   >
//                     Submit
//                   </Button>
//                   <Button
//                     type="submit"
//                     className="shop-button"
//                     onClick={handleAddPayment}
//                   >
//                     Cancel
//                   </Button>
//                   <h3></h3>
//                   <h3></h3>
//                 </Form>
//               )}
//             </Formik>
//           </Row>
//         )}
//       </Container>
//     );
//   }
  


// function EditProfile() {
//   const { user } = useContext(Context);
//   const navigate = useNavigate();
//   const [showAccountEdit, setAccountEdit] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().required("Password is required"),
//     // username: Yup.string().username("Invalid Username").required("Username is required"),
//   });
  
//   const handleDeleteConfirmation = () => {
//     setShowConfirmation(true);
//   };
//   const handleAccountEdit = () => {
//     setAccountEdit((prev) => !prev);
//   };
//   const handleNo = () => {
//     setShowConfirmation(false);
//   };
//   const handleYes = () => {
//     fetch(`/users`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           setUser(null);
//           navigate("/");
//         } else {
//           throw new Error("Error confirming the order");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

  
//   return (
//     <div>
//     <Container>
//       <Row>

//         <Row className="text-center title-placement">
//           {showAccountEdit ? (
//             <>
//               <Formik
//                 initialValues={{ email: user.email, password: "" }}
//                 validationSchema={validationSchema}
//                 onSubmit={(values) => {
//                   fetch("/users", {
//                     method: "PATCH",
//                     headers: {
//                       "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                       email: values.email,
//                       password: values.password,
//                     }),
//                   })
//                     .then((response) => {
//                       if (response.ok) {
//                       } else {
//                         throw new Error("Error updating email and password");
//                       }
//                     })
//                     .catch((error) => {
//                       console.error(error);
//                     });
//                 }}
//               >
//                 <Form>
//                   <h4 className="title-text">Edit Email and Password</h4>
//                   <hr />
//                   <div className="form-group">
//                     <label htmlFor="email" className="form-label">
//                       Email:
//                     </label>
//                     <Field
//                       type="email"
//                       id="email"
//                       name="email"
//                       className="edit-form"
//                     />
//                     <ErrorMessage
//                       name="email"
//                       component="div"
//                       className="error-message"
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="password" className="form-label">
//                       Password:
//                     </label>
//                     <Field
//                       type="password"
//                       id="password"
//                       name="password"
//                       className="edit-form"
//                     />
//                     <ErrorMessage
//                       name="password"
//                       component="div"
//                       className="error-message"
//                     />
//                   </div>
//                   {/* <div className="form-group">
//                     <label htmlFor="username" className="form-label">
//                       Username:
//                     </label>
//                     <Field
//                       type="username"
//                       id="username"
//                       name="username"
//                       className="edit-form"
//                     />
//                     <ErrorMessage
//                       name="username"
//                       component="div"
//                       className="error-message"
//                     />
//                   </div> */}
//                   <Button type="submit" className="edit-profile-button">
//                     Update
//                   </Button>
//                   <Button variant="danger" onClick={handleAccountEdit} className="edit-profile-button">
//                     Cancel
//                   </Button>
//                 </Form>
//               </Formik>
//             </>
//           ) : (
//             <h3 className="text-center title-text">
//               Edit Email or Passsword?
//               <hr />
//               <Button onClick={handleAccountEdit} className="edit-profile-button ">
//                 Click Here
//               </Button>
//             </h3>
//           )}
//           </Row> 
//         </Row>
//         <Col>
//           <h4 className="text-center title-text">Payment Details</h4>
//           <hr />
//           <UserPaymentFrom />
//         </Col>
//         <Col>
//           <h4 className="text-center title-text">Addresses Details</h4>
//           <hr />
//           <AddressForm className="text-center title-text"/>
//         </Col>
//         <Row>
//       </Row>
//         <Row className="text-center title-placement">
//           <h3 className="title-text">Now longer a Fan of BoldSkin?</h3>
//           <hr />
//           {showConfirmation ? (
//             <>
//               <h6 className="text-center smMB">Are you sure you want to delete your account?</h6>
//               <Button
//                 className="edit-profile-button"
//                 variant="success"
//                 onClick={handleYes}
//               >
//                 Yes
//               </Button>
//               <Button className="edit-profile-button smMT" variant="danger" onClick={handleNo}>
//                 No
//               </Button>
//             </>
//           ) : (
//             <Button
//               className="edit-profile-button"
//               onClick={handleDeleteConfirmation}
//             >
//               Delete Account
//             </Button>
//           )}
//         </Row>
//     </Container>
//     </div>
  // )
}

export default EditProfile


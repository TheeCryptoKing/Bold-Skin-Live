import React, { useState, useEffect, useContext } from "react";
import Context from "../Context.jsx";
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

function ProfileDetails() {
//   const { user, setUser } = useContext(Context);
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [showModal, setModalShow] = useState([])

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   useEffect(() => {
//     fetch("/user/orders")
//       .then((r) => r.json())
//       .then((orders) => {
//         setOrders(orders);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [user]);

//   if (!user) {
//     return navigate("/login");
//   }
  
//   const handleEditProfile = () => {
//     navigate("/editprofile");
//   };


// const handleYes = () => {
//   fetch(`/users`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         setUser(null);
//         navigate("/");
//       } else {
//         throw new Error("Error confirming the order");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// const handleLogout = () => {
//   if (user) {
//   fetch('/logout', {
//     method: 'POST',
//     credentials: 'include',
//   })
//     .then(response => response.json())
//     .then(data => {
//       setUser(null);
//       navigate("/");
//     })
//     navigate("/login")
// };
// }


//   const orderData = orders.map((order) => {
//     const date = new Date(order.created);
//     const formattedDate = date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//     return (
//       <tr key={order.order_id}>
//         <td>{order.order_id}</td>
//         <td>{formattedDate}</td>
//         <td>${order.order_total}</td>
//         <td>{order.status}</td>
//         <td>
//           <Button className="edit-profile-button"><Link to={`/order/${order.order_id}`}>View Details</Link></Button>
//         </td>
//       </tr>
//     );
//   });
// // row = 12 col | col md={2} takes up 2 rows

//   return (
//     <div>
//       <Container >
//         <Row className="user-info">
//         <Col>
//           <h3>Welcome,</h3>
//             <h3>{user.username}</h3>
//             <h3>{user.name}</h3>
//             <h3>{user.email}</h3>
//           <p>
//               View your order history and update personal details.
//               Let us know any way we can assist you!
//           </p>
//           <Button className="edit-profile-button" onClick={handleLogout}>Logout</Button>
//           </Col>
//           <Col>
//           <Button className="profile-button" onClick={handleEditProfile}>
//           Edit Profile Details
//           </Button>
//           </Col>
//         <div className="order-history">
//         <hr />
//           <h3>Order History</h3>
//           <hr />
//           <Table>
//             <thead>
//               <tr>
//                 <th>Confirmation Num.</th>
//                 <th>Order Date</th>
//                 <th>Total</th>
//                 <th>Order Status</th>
//                 <th></th>
//               </tr>
//             </thead>
//             {orders && orders.length > 0 ? (
//               <tbody>{orderData}</tbody>
//             ) : (
//               <tbody>
//                 <tr>
//                   <td colSpan="5">No orders found</td>
//                 </tr>
//               </tbody>
//             )}
//           </Table>
//           </div>
//         </Row>

//       </Container>
//     <div className="review-section">
//       <h3>Reviews</h3>
//       <hr />
//       <Table>
//             <tr >
//               <th> No current Reviews </th>
//             </tr>
//         </Table>
//         <hr />
//       </div>
//     </div>
//   );
}

export default ProfileDetails;
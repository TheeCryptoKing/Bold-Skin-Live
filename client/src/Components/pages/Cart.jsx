import React, { useState, useEffect, useContext } from "react";
import Context from "../Context";
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingAnimation from "../LoadingAnimation";

function EditableQuantityField({ productId, quantity, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(quantity);

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(productId, editedQuantity);
  };

  return (
    <>
      {isEditing ? (
        <>
          <input
            type="number"
            value={editedQuantity}
            onChange={(e) => setEditedQuantity(e.target.value)}
          />
          <Button className="shop-button" onClick={handleSaveClick}>
            Save
          </Button>
          <Button className="shop-button" onClick={handleSaveClick}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          {quantity}
          <Button
            className="shop-button custom-cart-button"
            style={{ marginLeft: "20px" }}
            onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </>
      )}
    </>
  );
}

function Cart() {
  const { user } = useContext(Context);
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);

  useEffect(() => {
    fetch("/carts")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching cart");
        }
      })
      .then((cart) => {
        setCart(cart);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  useEffect(() => {
    if (cart) {
      const items = cart.items.map((item) => (
        <tr key={item.item_id}>
          <td className="cart-data">
            <img
              src={item.product_image}
              style={{ width: "7vw", height: "9vh" }}
            />
          </td>
          <td className="cart-data">{item.product_name}</td>
          <td className="cart-data">{item.product_price}</td>
          <td className="cart-data">
            {" "}
            Quantity: <br />
            <EditableQuantityField
              productId={item.product_id}
              quantity={item.quantity}
              onSave={handleQuantityChange}
            />
          </td>
          <td className="cart-data">
            <Button
              className="cart-button custom-cart-button"
              onClick={() => handleRemoveItem(item.item_id)}>
              Remove
            </Button>
          </td>
        </tr>
      ));
      setCartItems(items);
      const subtotal = cart.items.reduce((total, item) => {
        return total + item.product_price * item.quantity;
      }, 0);
      const roundedSubtotal = subtotal.toFixed(2);
      setCartTotal(roundedSubtotal);
    }
  }, [cart]);

  const handleQuantityChange = (productId, quantity) => {
    const newQuantity = Math.max(parseInt(quantity), 1);

    const updatedItems = cart.items.map((item) => {
      if (item.product_id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart({ ...cart, items: updatedItems });
    updateCartItem(productId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cart.items.filter((item) => item.item_id !== itemId);
    setCart({ ...cart, items: updatedItems });
    deleteCartItem(itemId);
  };

  const updateCartItem = (productId, quantity) => {
    fetch(`/carts`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: productId, quantity }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating cart item");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteCartItem = (itemId) => {
    fetch(`/carts`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item_id: itemId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting cart item");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (cart === null) {
    return <LoadingAnimation />;
  }

  if (cart.length === 0) {
    return <div className="base-text">Nothing to show here .</div>;
  }

  return (
    <Container className="">
      <div>
        <Row>
          <h3 className="title-text mdMB mdMT">
            Your Cart
            <span> ({cart.items.length} items)</span>
          </h3>
          <h5 className="title-text ">
            Every $10 spent, you plant a Tree! How many Tree's Are you planting
            Today?
          </h5>
        </Row>
        <Row>
          {cart && cart.items.length === 0 ? (
            <p className="cart-data">Your cart is empty...</p>
          ) : (
            <>
              <Col>
                <Table>
                  <div className=" cart_section mdMB mdMT">
                    <tr>{cartItems}</tr>
                  </div>
                </Table>
              </Col>
              <Col className="subtotal">
                <h3>Subtotal: {cartTotal}</h3>
                <Button as={Link} to="/checkout" className=" cart-button">
                  Proceed to Secure Checkout
                </Button>
              </Col>
            </>
          )}
        </Row>
      </div>
    </Container>
  );
}

export default Cart;

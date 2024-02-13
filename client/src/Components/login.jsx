import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Context from "./Context";

function Login() {
  const { setUser } = useContext(Context);
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  const initialValues = {
    identifier: "",
    password: "",
  };

  const validationSchema = Yup.object({
    identifier: Yup.string().required("Username or Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((r) => r.json())
      .then((user) => {
        setUser(user);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };


  return (
    <>
      <Container>
        <Row>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="login-form">
              {/* <h3>Login</h3> */}
              <div className="form-group">
                <label htmlFor="identifier" className="base-text">Username or Email:</label>
                <Field
                  type="text"
                  name="identifier"
                  id="identifier"
                  className="form-control form-field"
                />
                <ErrorMessage
                  name="identifier"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="base-text">Password:</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="form-control form-field"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <button type="Login" className="login-button shop-button">
                Submit
              </button>
              {/* <button type="button" onClick={handleCancel}>
                Cancel
              </button> */}
            </Form>
          </Formik>
        </Row>
      </Container>
    </>
  );
}

export default Login;
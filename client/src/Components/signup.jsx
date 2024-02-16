import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Container } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Context from "./Context";

function Signup() {
  const { setUser } = useContext(Context);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    fetch("/api/signup", {
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
            onSubmit={handleSubmit}>
            <Form className="signup-form">
              <div className="form-group">
                <label htmlFor="name" className="base-text">
                  Name:
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="form-control form-field"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="base-text">
                  Email:
                </label>
                <Field
                  type="text"
                  name="email"
                  id="email"
                  className="form-control form-field"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username" className="base-text">
                  Username:
                </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  className="form-control form-field"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="base-text">
                  Password:
                </label>
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
              <div className="form-group">
                <label htmlFor="confirmPassword" className="base-text">
                  Confirm Password:
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-control"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-message"
                />
              </div>
              <button type="Create Account" className="shop-button">
                Create Account
              </button>
            </Form>
          </Formik>
        </Row>
      </Container>
    </>
  );
}

export default Signup;

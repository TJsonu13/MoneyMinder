import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Loginpage.css";

const Login = () => {
  const img =
    "https://media.istockphoto.com/id/1331965101/photo/young-man-holding-pen-with-bills-working-for-calculate-business-data-taxes-bills-payment.webp?b=1&s=170667a&w=0&k=20&c=D4kXIT55gPdx5wPVjLndeDjqRF8O6alPUYF3fwquvhQ=";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login successful");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Invalid email or password. Please try again.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-page">
    <h1 className="page-title">MoneyMinder</h1>
    {loading && <Spinner />}
    <div className="row container">
      <div className="col-md-8">
        <img src={img} alt="login-img" className="login-image" />
      </div>
      <div className="col-md-4 login-form">
        <Form
          layout="vertical"
          form={form}
          onFinish={submitHandler}
          initialValues={{ email: "", password: "" }}
        >
          <h3 className="login-header">User Login</h3>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>
          <div className="login-button-container">
            <Link to="/register" className="login-link">
              Not a user? Click Here to register!
            </Link>
            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
  
  );
};

export default Login;

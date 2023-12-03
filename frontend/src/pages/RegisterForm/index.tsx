import React from "react";
import { Button, Form, Input, Card } from "antd";
import * as yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface RegisterPage {
  username: string;
  password: string;
  role: string;
}

const initialValues = {
  username: "",
  password: "",
  role: "", // Default role
};

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  role: yup
    .string()
    .required("Role is required")
    .oneOf(["admin", "user"], "Invalid role"),
});

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterPage) => {
    try {
      const response = await fetch(
  "https://resyanac22-s6tv3qk23q-uc.a.run.app/auth/registration",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json", // Ensure you accept JSON response
    },
    body: JSON.stringify(values) // Important for sending cookies in cross-origin requests
  }
);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration successful",
          text: "You can now login!",
        });
        navigate("/");
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: errorData.message || "Unexpected error occurred",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: "Network or server error",
      });
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => handleSubmit(values),
    validationSchema: validationSchema,
  });

  return (
    <Card title="Register Form" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Form
        {...layout}
        onFinish={formik.handleSubmit}
        style={{ padding: "1rem" }}
      >
        <Form.Item
          label="Username"
          validateStatus={formik.errors.username ? "error" : "success"}
          help={formik.errors.username}
        >
          <Input
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange("username")}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          validateStatus={formik.errors.password ? "error" : "success"}
          help={formik.errors.password}
        >
          <Input.Password
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
          />
        </Form.Item>

        <Form.Item
          label="Role"
          validateStatus={formik.errors.role ? "error" : "success"}
          help={formik.errors.role}
        >
          <Input
            type="text"
            placeholder="Role"
            value={formik.values.role}
            onChange={formik.handleChange("role")}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" style={{ margin: "12px" }}>
          Register
        </Button>
        <Button
          type="default"
          htmlType="button"
          onClick={() => navigate("/")}
          style={{ margin: "12px" }}
        >
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default RegisterForm;

import { Button, Card, Form, Input, Typography, notification } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/useFetch";
import { useAuth } from "../authContext";


const validationSchema = yup.object().shape({
  username: yup.string().required("Please input your username!"),
  password: yup.string().required("Please input your password!"),
});

interface LoginValue {
  username: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (values: LoginValue) => {
    try {
      const response = await axios.post(
        "https://resyanac22-s6tv3qk23q-uc.a.run.app/auth/login",
        values,
      );
      console.log("Response:", response);
      localStorage.setItem('token', response.data.token);
      if (response.status === 200 && response.data.success) {
        login(response.data.user); 
        Swal.fire({
          icon: "success",
          title: "Login success",
          text: "You have successfully logged in!",
        });
        navigate("/table");
      } else if (response.status === 401) {
        notification.error({
        message: 'Error',
        description: 'Username or Password is incorrect!',
      });
    }
    } catch (error) {
      console.log(error);
    }  

  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });



  return (
    <Card title="Login Form">
      <Form
        name="basic"
        style={{ width: "300px", height: "210px" }}
        onFinish={formik.handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          validateStatus={
            formik.touched.username && formik.errors.username ? "error" : ""
          }
          help={formik.touched.username && formik.errors.username}
        >
          <Input
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          name="password"
          validateStatus={
            formik.touched.password && formik.errors.password ? "error" : ""
          }
          help={formik.touched.password && formik.errors.password}
        >
          <Input.Password
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          style={{
            display: "block",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Button type="primary" htmlType="submit" style={{ margin: "10px" }}>
            LOGIN
          </Button>
          <Typography style={{ marginBottom: "5px" }}>Or</Typography>
          <a
            type="primary"
            className="register-link"
            onClick={() => navigate("/register")}
          >
            Register here
          </a>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;

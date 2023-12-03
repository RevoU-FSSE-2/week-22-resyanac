import React from "react";
import { Button, Form, Card, Space, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../utils/useFetch";

const { Option } = Select;

interface EditPage {
  status: string;
  priority: string;
  dueDate: Date | null; // Define a dueDate property with a Date or null
}

const EditForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (values: EditPage) => {
  try {
    const body = {
      progress: values.status,
      priority: values.priority,  // Add this line to include the priority field
      date: values.dueDate?.toISOString(),
    };

    const response = await axios.put(
      `https://resyanac22-s6tv3qk23q-uc.a.run.app/todos/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Edit Category Success",
      text: "Edit Category Success",
    });

    navigate("/table");
    return response.data;
  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Edit Category Failed",
      text: "Please try again.",
    });
  }
};



  return (
    <Card
      title="Edit Category"
      style={{
        maxWidth: "400px",
        width: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="edit-item-form"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="status" rules={[{ required: true }]}>
          <Select placeholder="Select a status option" allowClear>
            <Option value="not started">Not Started</Option>
            <Option value="on progress">On Progress</Option>
            <Option value="done">Done</Option>
          </Select>
        </Form.Item>

        <Form.Item
        name="priority"
        rules={[{ required: true, message: 'Please select the priority!' }]}
      >
        <Select placeholder="Select Priority">
          <Option value="high">High</Option>
          <Option value="medium">Medium</Option>
          <Option value="low">Low</Option>
        </Select>
      </Form.Item>

        {/* Add a due date field */}

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              htmlType="button"
              onClick={() => {
                navigate("/table");
              }}
            >
              Back
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditForm;

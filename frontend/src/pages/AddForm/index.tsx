import { Button, Card, Form, Input, Space, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/useFetch";

const { Option } = Select;

const AddForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (values: { title: string, progress: string, priority: string }) => {
    try {
      await axios.post(
        "https://resyanac22-s6tv3qk23q-uc.a.run.app/todos/",
        {
          title: values.title,
          progress: values.progress,
          priority: values.priority
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success('Task added successfully!');
      navigate("/table");
    } catch (error) {
      console.error(error);
      message.error('Failed to add task. Please try again.');
    }
  };

  return (
    <Card title="Add New Task">
      <Form
        name="add-task-form"
        onFinish={handleSubmit}
        style={{ maxWidth: 300 }}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please input task!' }]}
        >
          <Input placeholder="Task" />
        </Form.Item>

        <Form.Item
        name="progress"
        rules={[{ required: true, message: 'Please select the progress!' }]}
      >
        <Select placeholder="Select Progress">
          <Option value="on started">Not Started</Option>
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


        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              SUBMIT
            </Button>
            <Button onClick={() => navigate("/table")} htmlType="button">
              BACK
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddForm;

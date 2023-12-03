import React, { useEffect, useState } from "react";
import { Button, Table, Space, Card, Form, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/useFetch";
import moment from "moment"; 



interface DataType {
  id: number;
  task: string;
  status: boolean;
  dueDate: string; // Add the dueDate property
}

const TableForm: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DataType[]>([]);
  const token = localStorage.getItem("token");

  const apiUrl = "https://resyanac22-s6tv3qk23q-uc.a.run.app/todos/";

const fetchData = async () => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response data:", response.data.data); // Log the received data
    setData(response.data.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    message.error("Failed to fetch data. Please try again.");
  }
};


  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Maker",
      dataIndex: "maker",
      key: "maker",
      render: (maker: string) => <a>{maker}</a>
    },
    {
      title: "Task",
      dataIndex: "title",
      key: "title",
      render: (task: string) => <a>{task}</a>
    },
    {
      title: "Status",
      dataIndex: "progress",
      key: "progress",
      filters: [
        { text: "Not Started", value: "not started" },
        { text: "On Progress", value: "on progress" },
        { text: "Done", value: "done" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <span
          style={{
            color:
              status === "not started"
                ? "red"
                : status === "on progress"
                ? "blue"
                : "green",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate: string) => moment(dueDate).format("YYYY-MM-DD"), // Format the due date
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      filters: [
        { text: "High", value: "high" },
        { text: "Medium", value: "medium" },
        { text: "Low", value: "low" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <span
          style={{
            color:
              status === "high"
                ? "red"
                : status === "medium"
                ? "blue"
                : "green",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => navigate(`/edit-item/${record.id}`)}>EDIT</Button>
          <Button onClick={() => deleteItem(record.id)} type="primary">
            DELETE
          </Button>
        </Space>
      ),
    },
  ];

  const deleteItem = async (deletedId: number) => {
    try {
      await axios.delete(`https://resyanac22-s6tv3qk23q-uc.a.run.app/todos/${deletedId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Task Delete Success!");
      setData(data.filter((item) => item.id !== deletedId));
    } catch (error) {
      console.error(error);
      message.error(`Sorry, you don't have permission to delete task`);
    }
  };

  const handleLogout = async () => {
    try {
      // Add your logout logic here if necessary
      localStorage.removeItem("token");
      Swal.fire({
        icon: "success",
        title: "Logged out successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to logout. Please try again.",
      });
    }
  };


  return (
    <Card title="To Do List" style={{ padding: "20px" }}>
      <Form.Item>
        <Button
          type="primary"
          onClick={() => navigate("/add-item")}
          style={{ marginRight: "550px" }}
        >
          Add New Category
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
      </Form.Item>

      {/* Pass the updateDataState function as a prop to AddForm */}

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 5,
          total: data.length,
        }}
        style={{ width: "800px" }}
      />
    </Card>
  );
};

export default TableForm;

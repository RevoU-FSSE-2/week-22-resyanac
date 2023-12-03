// import { UserOutlined } from '@ant-design/icons';
// import React, { useEffect, useState } from 'react';
// import { Avatar, Space, Card, Form, Button } from 'antd';
// import { useNavigate } from 'react-router-dom';

// interface DataProfile {
//   id: string;
//   name: string;
//   email: string;
// }

// const Profile: React.FC = () => {
//   const [profileData, setProfileData] = useState<DataProfile | null>(null); // Initialize with null
//   const navigate = useNavigate();
//   const validate = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await fetch('https://mock-api.arikmpt.com/api/user/profile', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${validate}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setProfileData(data.data);
//         } else {
//           console.error('Failed to fetch profile data');
//         }
//       } catch (error) {
//         console.error('Error while fetching profile data:', error);
//       }
//     };

//     fetchProfileData();
//   }, [validate]);

//   return (
//     <Card title='User Profile' style={{ width: '400px', padding: '15px' }}>
//       <Space wrap size={16}>
//         <Avatar size="large" icon={<UserOutlined />} />
//       </Space>
//       <Form.Item style={{ marginTop: '10px' }}>
//         {profileData ? (
//           <>
//             User ID: {profileData.id} <br />
//             Login as: {profileData.name} <br />
//             Email: {profileData.email} <br />
//           </>
//         ) : (
//           <p>Loading profile data...</p>
//         )}
//       </Form.Item>
//       <Form.Item>
//         <Button htmlType="button" onClick={() => navigate('/table')}>
//           Back
//         </Button>
//       </Form.Item>
//     </Card>
//   );
// };

// export default Profile;

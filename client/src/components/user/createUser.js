import React, { useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, message, Row, Col } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import imageLoader from './imageLoader';
import './createUser.css';
export default function CreateUser() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedImage, setSelectedImage] = useState("");
    const images = imageLoader(); // default propics
    const imagesKeys = Object.keys(images);

    async function onFinish (values) {
        if(selectedImage === "") {
            messageApi.open({
                type: 'warning',
                content: "choose a profile pic to create an account!"
            });
            return;
        }
        const startIndex = selectedImage.lastIndexOf('/') + 1; // Start index after the last slash
        const endIndex = selectedImage.indexOf('.', startIndex); // End index before the first dot
        const extractedString = selectedImage.substring(startIndex, endIndex);

        // Desired file format (e.g., 'jpeg')
        const fileFormat = 'jpeg';

        // Create the new filename by concatenating the extracted string and the file format
        const newFilename = `${extractedString}.${fileFormat}`;
        let newUser = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            username: values.username,
            profile_pic: newFilename
        };
        fetch(`http://localhost:5050/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        .then((response) => {
            if(response.ok) {
                messageApi.open({
                    type: 'success',
                    content: 'account created!',
                });
                navigate('/user/login');
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'It looks like that email or username is already taken. Choose a different one!'
                });
            }
        })
        .catch((error) => {
            console.log(error);
            messageApi.open({
                type: 'error',
                content: 'A problem occured. Make sure your email and username are unique!',
            });
            return;
        });
    };

    return(
        <div style={{marginTop: '5vh'}}>
            {contextHolder}
            <div style={{ display: 'flex', justifyContent:'center'}}>
                <h2>Create Account</h2>
            </div>
            <div className="create-account" style={{
            display: 'flex',
            justifyContent: 'center',
            height: '100vh', // Adjust this if you want to center the form vertically on the page
            }}>
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            style={{width: '30%'}}
                >
                {/* ------------FIRST NAME------------ */}
                <Form.Item
                    name="first_name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your First Name!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
                </Form.Item>
                {/* ------------LAST NAME------------ */}
                <Form.Item
                    name="last_name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Last Name!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" />
                </Form.Item>
                {/* --------------USERNAME-------------- */}
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    {
                        min: 5, // Set the minimum character limit to 5
                        message: 'username must be at least 5 characters long!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                {/* -------------PASSWORD------------- */}
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    {
                        min: 5, // Set the minimum character limit to 5
                        message: 'password must be at least 5 characters long!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                {/* ------------RETYPED PASSWORD FOR VALIDATION------------ */}
                <Form.Item
                    name="retype_password"
                    rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The new password that you entered does not match!'));
                        },
                      }),
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Retype Password"
                    />
                </Form.Item>
                {/* ---------------EMAIL-------------- */}
                <Form.Item
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                    {
                        type: 'email',
                        message: 'Please enter a valid email address!',
                    },
                    ]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                {/* ---------------PROFILE PIC-------------- */}
                <Row gutter={[16, 16]}>
                    {imagesKeys.map((imageKey) => (
                    <Col key={imageKey} xs={12} sm={8} md={6} lg={4}>
                        <img 
                        src={images[imageKey]} 
                        alt="Image" 
                        style={{ width: '100%' }}
                        className={`hoverable-image ${selectedImage === images[imageKey] ? 'selected' : ''}`}
                        onClick={() => setSelectedImage(images[imageKey])}/>
                    </Col>
                    ))}
                </Row>
                <br/>
                {/* ------------SUBMIT BUTTON----------- */}
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Create Account
                        </Button>
                        Or <Link to='/user/login'>Login</Link>
                    </Space>
                </Form.Item>
                </Form>
            </div>
        </div>  
    );
}
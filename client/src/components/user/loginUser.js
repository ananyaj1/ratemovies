import React from "react";
import { Button, Form, Input, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, Link } from "react-router-dom";
export default function LoginUser({setLoggedIn}) {
    const navigate = useNavigate();
    async function onFinish(values)  {
        console.log('Received values of form: ', values);
        
        fetch(`${process.env.REACT_APP_BACKEND_URL}user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: values.username, password: values.password})
        })
        .then((response) => response.json())
        .then((data) => {
            const { message, token } = data;
            if (token) {
            // Store the token in a session cookie or local storage
            document.cookie = `jwt_token=${token}; path=/; max-age=10800`; // Max age set to 3 hours (3h * 60m * 60s)
            }
            //console.log(document.cookie);
            setLoggedIn();
            navigate('/');
        })
        .catch((error) => {
            console.error('Error:', error);
            return;
        })
    };

    return(
        <div style={{marginTop: '5vh'}}>
            <div style={{ display: 'flex', justifyContent:'center'}}>
                <h2>Login</h2>
            </div>
            <div className="login-account" style={{
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
                {/* --------------USERNAME-------------- */}
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
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
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                {/* ------------FORGOT PASSWORD?------------ */}
                <Form.Item>
                    <a className="login-form-forgot" href="">
                    Forgot password?
                    </a>
                </Form.Item>
                {/* ------------SUBMIT BUTTON----------- */}
                <Form.Item>
                    <Space>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                    Or <Link to="/user/create">create account!</Link>
                    </Space>
                </Form.Item>
                </Form>
            </div>
        </div>  
    );
}
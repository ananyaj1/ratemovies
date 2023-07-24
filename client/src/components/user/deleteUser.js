import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { useNavigate, Link } from "react-router-dom";

export default function DeleteUser() {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        navigate('/');
    };

    return(
        <div style={{marginTop: '5vh'}}>
            <div style={{ display: 'flex', justifyContent:'center'}}>
                <h2>Delete Account</h2>
            </div>
            <div style={{ display: 'flex', justifyContent:'center'}}>
            <p style={{textAlign: 'center'}}>
                Are you sure you want to delete your account? <br/> This cannot be undone. 
            </p>
            </div>
            <div className="delete-account" style={{
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
                {/* -----------CONFIRM------------ */}
                <Form.Item
                    name="confirm"
                    rules={[
                    {
                        required: true,
                        message: 'Please type your username to confirm!',
                    },
                    ]}
                >
                    <Input 
                    prefix={<UserOutlined 
                    className="site-form-item-icon" />} 
                    placeholder="Type your username to confirm deletion." />
                </Form.Item>
                {/* ------------SUBMIT BUTTON----------- */}
                <Form.Item>
                    <Space>
                        <Button type="primary" danger htmlType="submit" className="login-form-button">
                        Delete Account
                        </Button>
                        Or <Link to='/user/login'>Back to profile </Link>
                    </Space>
                </Form.Item>
                </Form>
            </div>
        </div>  
    );
}
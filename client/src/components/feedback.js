import React, {useEffect, useState} from "react";
import { Row, Col, Input, Button, Form, notification } from "antd";

export default function Feedback({setCurrPage}) {
    const [form] = Form.useForm();
    const [email, setEmail] = useState("");
    const [feed, setFeed] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        setCurrPage('feedback');
    });

    const openNotification = () => {
        if(success) {
            api.success({
                message: 'Feedback Submitted!',
                description:
                  'Your feedback has been submitted. Please check your email inbox for confirmation. Make sure to check spam too!',
                duration: 0,
              });
        }
        else {
            api.error({
                message: 'There was a problem.',
                description: "We encountered an error while trying to email your feedback. We've been notified about the error, and will fix it soon!",
                duration: 0,
            });
        }
    };

    const handleSubmit = async () => {
        try {
          const values = await form.validateFields();
          const { feed, email } = values;
    
          // Send the feed and email values to endpoint
          await fetch(`${process.env.REACT_APP_BACKEND_URL}feedback`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ feed, email }),
          });
    
          // Reset the form fields
          form.resetFields();
          setFeed('');
          setEmail('');
          // Show success message 
          setSuccess(true);
        } catch (error) {
          console.error('Form submission error:', error);
          setSuccess(false);
        }
        openNotification();
    };
    
    return(
        <div style={{ backgroundColor: '#001628', minHeight: '100vh', color: 'white' }}>
        <br/>
        {contextHolder}
        <Row justify="center" align="middle" gutter={16}>
        <Col span={24}>
          <h1 style={{ textAlign: 'center' }}>Feedback</h1>
        </Col>
        <Col span={24}>
          <h5 style={{ textAlign: 'center' }}>
            Noticed a bug? Have a feature idea? Problem with the UI?
            <br />
            <br />
            Email us to let us know.
          </h5>
        </Col>
        <Col span={8}>
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item name="feed" rules={[{ required: true, message: 'Please provide your feedback' }]}>
              <Input.TextArea placeholder="Write your Feedback Here" value={feed} rows={15} onChange={(e) => setFeed(e.target.value)} />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, message: 'Please provide a valid email' }, { type: 'email', message: 'Please provide a valid email' }]}>
              <Input placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
        </div>
    );
}
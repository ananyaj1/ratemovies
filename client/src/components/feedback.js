import React, {useEffect, useState} from "react";
import { Row, Col, Input, Button, Form } from "antd";
const { TextArea } = Input;

export default function Feedback({setCurrPage}) {
    const [form] = Form.useForm();
    const [email, setEmail] = useState("");
    const [feed, setFeed] = useState("");


    useEffect(() => {
        setCurrPage('feedback');
    });

    const handleSubmit = async () => {
        try {
          const values = await form.validateFields();
          const { feed, email } = values;
    
          // Send the feed and email values to endpoint
          await fetch('http://localhost:5050/feedback', {
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
    
          // Show success message or perform other actions
          console.log('Form submitted successfully');
        } catch (error) {
          console.error('Form submission error:', error);
        }
    };
    
    return(
        <div style={{ backgroundColor: '#001628', minHeight: '100vh', color: 'white' }}>
        <br/>
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
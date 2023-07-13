import { Form, Input, Button } from 'antd';

export default function Discover() {
    const [form] = Form.useForm();
    const onSubmit = (values) => {
        values.image = 'blahblah';
    }
    return (
        <Form form={form} onFinish={onSubmit}>
             <Form.Item name="name" label="Name">
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>

        </Form>
    );
}
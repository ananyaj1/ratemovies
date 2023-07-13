import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Result, Row, Button, DatePicker, Rate, Radio, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from "moment";

const {TextArea} = Input;
export default function Create() {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState("");
    const [dateStatus, setDateStatus] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    // functions for image uploading
    const props = {
        onRemove: () => {
            setImageUrl([]);
        },
        beforeUpload: (file) => {
            return false;
        }
    }

    // initial values of form
    const initialValues = {
        rec: 'wouldRec', // Set the default value here
    };

    // checking if date is past today
    const onDateChange = (date, dateString) => {
        var now = moment();
        if(date > now) {
            setDateStatus("error");
        }
        else {
            setDateStatus("");
        }
    }
    
    // change image to appropriate Base64 format for storage
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
              reject(error);
            };
        });
    }
    const uploadChange = async (info) => {
        // there is a change when an image is uploaded
        // there is a change when an image is deleted
        if(info.fileList.length === 0) {
            setImageUrl("");
            return;
        }
        const file = info.file;
        const base64 = await convertToBase64(file);
        setImageUrl(base64);
      };

    // on submit, send form data to post endpoint & reset the form  
    async function onSubmit (data) {
        // date is a potential blank
        if(!data.date) {
            window.alert('Please choose a proper date.');
            return;
        }
        data.image = imageUrl;
        
        //debugging
        //console.log(data);
        
        fetch("http://localhost:5050/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if(!response.ok) {window.alert(response.statusText)}
        }) 
        form.resetFields();
        setSubmitted(true);
    }
    return (
        <div className="createReview">
            {(submitted) ? 
            <Result 
            status="success" 
            title="Successfully wrote review!"
            extra={[
                <Button type="primary" key="console" onClick={() => setSubmitted(false)}>
                  Write Another Review
                </Button>,
                <Button key="viewmore" onClick={() => navigate('/')}>
                    View Other Reviews
                </Button>,
            ]}
            />
            : <div> 
                <Row justify={"center"}><h3 style={{offset: 12}}>New Review</h3></Row>
                <Form
                form={form}
                name="review"
                labelCol={{span: 12}}
                wrapperCol={{span: 12}}
                style={{maxWidth: 1000}}
                onFinish={onSubmit}
                initialValues={initialValues}
                >
                    
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Review title is required.' }]}
                    >
                    <Input/>  
                    </Form.Item> 

                    <Form.Item
                        label="Movie Name"
                        name="movie_name"
                        rules={[{ required: true, message: 'Movie name is required.' }]}
                        >
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Movie Still" valuePropName="fileList">
                        <Upload {...props} listType="picture-card" maxCount={1} onChange={uploadChange}>
                            <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name='rec'
                        wrapperCol={{
                            offset: 12,
                            span: 16,
                        }}>
                        <Radio.Group>
                            <Radio.Button value="wouldRec"> Would Recommend </Radio.Button>
                            <Radio.Button value="notRec"> Would Not Recommend </Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                    label="Rating"
                    name="rating"
                    rules={[{ required: true, message: 'Please rate this movie!' }]}>
                        <Rate allowHalf />
                    </Form.Item>

                    <Form.Item
                    label="Movie watched on"
                    name="date"
                    validateStatus={dateStatus}
                    help="Don't choose a date past today!">
                        <DatePicker onChange={onDateChange}/>
                    </Form.Item>

                    <br/>

                    <Form.Item
                    label="Movie Review"
                    name="review_text"
                    rules={[{ required: true, message: 'Please write a review!' }]}>
                        <TextArea rows={10} />
                    </Form.Item>

                    <Form.Item
                    wrapperCol={{
                        offset: 12,
                        span: 16,
                    }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    
                </Form>
             </div>}
            
        </div>
    );
}
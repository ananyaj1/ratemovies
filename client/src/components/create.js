import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Col, Row, Button, DatePicker, Rate, Radio, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from "moment";

const {TextArea} = Input;
export default function Create() {
    const [title, setTitle] = useState("");
    const [movieName, setMovieName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [rec, setRec] = useState("wouldRec");
    const [rating, setRating] = useState(0);
    const [date, setDate] = useState("");
    const [dateStatus, setDateStatus] = useState("");
    const [reviewText, setReviewText] = useState("");
    const navigate = useNavigate();

    const props = {
        onRemove: () => {
            setImageUrl([]);
        },
        beforeUpload: (file) => {
            return false;
        }
    }

    const onDateChange = (date, dateString) => {
        var now = moment();
        if(date > now) {
            setDateStatus("error");
            setDate("");
        }
        else {
            setDateStatus("");
            setDate(dateString);
        }
    }

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
    
    async function onSubmit (e) {
        const newReview = {
            title: title,
            movie_name: movieName,
            image: imageUrl,
            rec: rec,
            rating: rating,
            date: date,
            review_text: reviewText
        };
        fetch("http://localhost:5050/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReview)
        })
        .catch(error => {
            window.alert(error);
            return;
        })
        .then((data) => {
            setTitle("");
            setMovieName("");
            setImageUrl([]);
            setRec("wouldRec");
            setRating(0);
            setDate("");
            setReviewText("");
        })
    }
    return (
        <div className="createReview">
            <Row justify={"center"}><h3 style={{offset: 12}}>New Review</h3></Row>
            <Form
            name="review"
            labelCol={{span: 12}}
            wrapperCol={{span: 12}}
            style={{maxWidth: 1000}}
            onFinish={onSubmit}
            >
                
               <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Review title is required.' }]}
                >
                  <Input value={title} onChange={e => setTitle(e.target.value)}/>  
                </Form.Item> 

                <Form.Item
                    label="Movie Name"
                    name="name"
                    rules={[{ required: true, message: 'Movie name is required.' }]}
                    >
                    <Input value={movieName} onChange={e => setMovieName(e.target.value)}/>
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
                    wrapperCol={{
                        offset: 12,
                        span: 16,
                    }}>
                    <Radio.Group value={rec} onChange={(e) => setRec(e.target.value)}>
                        <Radio.Button value="wouldRec"> Would Recommend </Radio.Button>
                        <Radio.Button value="notRec"> Would Not Recommend </Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                label="Rating"
                name="rating"
                rules={[{ required: true, message: 'Please rate this movie!' }]}>
                    <Rate allowHalf value={rating} onChange={(value) => setRating(value)}/>
                </Form.Item>

                <Form.Item
                label="Movie watched on"
                name="date"
                validateStatus={dateStatus}
                rules={[{ required: true, message: 'Please select a proper date.' }]}
                help="Don't choose a date past today!">
                    <DatePicker onChange={onDateChange}/>
                </Form.Item>

                <br/>

                <Form.Item
                label="Movie Review"
                name="review"
                rules={[{ required: true, message: 'Please write a review!' }]}>
                    <TextArea rows={10} onChange={(e) => setReviewText(e.target.value)}/>
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
        </div>
    );
}
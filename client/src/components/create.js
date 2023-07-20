import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { Image, Select, Result, Row, Button, DatePicker, Rate, Radio, Form, Input, Empty } from 'antd';
import moment from "moment";
import gen from "../constants/genre";

const {TextArea} = Input;
export default function Create({setCurrPage}) {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState("");
    const [dateStatus, setDateStatus] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [movSuggestions, setMovSuggestions] = useState([]);
    const [movieName, setMovieName] = useState("");
    const [statusSubmission, setStatusSubmission] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const movie = searchParams.get("movie") || "";
    const posterUrl = searchParams.get("poster") || "";
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    // initial values of form
    const initialValues = {
        rec: 'wouldRec', // Set the default value here
        movie_name: movie,
    };

    useEffect(() => {
        setImageUrl(posterUrl);
    }, [posterUrl]);

    useEffect(() => {
        setMovieName(movie);
    }, [movie]);

    useEffect(() => {
        setCurrPage('create');
    });
    // checking if date is past today
    const onDateChange = (date, dateString) => {
        var now = moment();
        if(date > now) {
            setDateStatus("error");
        }
        else {
            setDateStatus("");
        }
    };

    const fetchMovieSuggestions = async (query) => {
        try {
          const response = await fetch(`${process.env.REACT_APP_RATEMOVIES_BACKEND_URL}movie/search?query=${query}`);
          const suggestions = await response.json(); // Parse the response body as JSON
          setMovSuggestions(suggestions);
        } catch (error) {
          console.error('Error fetching movie suggestions:', error);
        }
    };

    const handleMovieChange = (selectedMovie) => {
        const selectedMovieObj = movSuggestions.find((movie) => movie.title === selectedMovie);
        setMovieName(selectedMovie);
        setImageUrl(baseUrl + selectedMovieObj.poster);
        //console.log(imageUrl, baseUrl);
    }

    // on submit, send form data to post endpoint & reset the form  
    async function onSubmit (data) {
        // date is a potential blank
        console.log('am I here>');
        if(!data.date) {
            window.alert('Please choose a proper date.');
            return;
        }
        data.image = imageUrl;
        //console.log(data);
        
        fetch(`${process.env.REACT_APP_RATEMOVIES_BACKEND_URL}review`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then((response) => {
            form.resetFields();
            setSubmitted(true);
            setImageUrl("");
            if(!response.ok) {
                //window.alert(response.statusText);
                setStatusSubmission('error');
                return;
            }
        }) 
        setStatusSubmission('success');
    };

    return (
        <div className="createReview" >
            {(submitted) ? 
            <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Result 
                status={statusSubmission}
                title={(statusSubmission ==='success') 
                ? "Successfully wrote review!" 
                : "There was a problem with your submission."}
                extra={[
                    <Button type="primary" key="console" 
                    onClick={
                        () => {
                            setSubmitted(false);
                            navigate('/create');
                            }}>
                    Write Another Review
                    </Button>,
                    <Button key="viewmore" onClick={() => navigate('/view')}>
                        View Other Reviews
                    </Button>,
                ]}
                />
            </div>
            
            : <div> 
                <Row justify={"center"}><h2 style={{offset: 12}}>New Review</h2></Row>
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
                    <Input maxLength={25}/>  
                    </Form.Item> 

                    <Form.Item 
                    label="Movie Name" 
                    name="movie_name"
                    rules={[{ required: true, message: 'Review title is required.' }]}>
                    <Select
                        showSearch
                        value={movieName}
                        placeholder="Search for a movie"
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={fetchMovieSuggestions}
                        onChange={handleMovieChange}
                    >
                        {movSuggestions.map((movie) => (
                        <Select.Option key={movie.id} value={movie.title}>
                            {movie.title}
                        </Select.Option>
                        ))}
                    </Select>
                    </Form.Item>
                    <br/>
                    <Form.Item label="Movie Still">
                    {(imageUrl) ?
                     <Image src={imageUrl} style={{ maxWidth: '100%', maxHeight: '400px' }}/> 
                     : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Select movie name to see poster!"/>}
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
                    help="Don't choose a date past today!"
                    rules={[{ required: true, message: 'Please choose a date!' }]}>
                        <DatePicker onChange={onDateChange}/>
                    </Form.Item>

                    <br/>

                    <Form.Item
                    label="Genre"
                    name="genre"
                    rules={[{ required: true, message: 'Please choose a genre for the movie!' }]}>
                        <Select
                        placeholder="Choose a genre"
                        options={gen}
                        />
                    </Form.Item>

                    <Form.Item
                    label="Movie Review"
                    name="review_text"
                    rules={[{ required: true, message: 'Please write a review!' }]}
                    >
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
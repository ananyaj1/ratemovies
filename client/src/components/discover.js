import { Row, Col, Space, Table, Switch, Rate, Checkbox, Select } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ReviewCard from './reviewCard';
import { deleteReview } from './view';
export default function Discover() {

    // params and their state
    const [recFactor, setRecFactor] = useState(false);
    const[rec, setRec] = useState(false);
    const [genreFactor, setGenreFactor] = useState(false);
    const[genres, setGenres] = useState([]);
    const [ratingFactor, setRatingFactor] = useState(false);
    const[rating, setRating] = useState(0);

    // the appropriate reviews
    const[reviews, setReviews] = useState([]);

    // structs and helper functions: 
    const options = [
        {
            value: 'Mystery',
            label: 'Mystery',
        },
        {
            value: 'Thriller',
            label: 'Thriller',
        },
        {
            value: 'Comedy',
            label: 'Comedy',
        },
        {
            value: 'Action',
            label: 'Action',
        },
        {
            value: 'Romance',
            label: 'Romance',
        },
    ];
    const handleChange = (value) => {
        //console.log(value);
        setGenres(value);
    };
    const columns = [
        {
            title: 'Reviewer Recommends',
            dataIndex: 'rec',
            key: 'rec',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
    ];
    const data = [
        {
            key: '1',
            rec: 
            <Space>
                <Checkbox onChange={(e) => {setRecFactor(e.target.checked); setRec(false);}}/>
                <Switch disabled={!recFactor} checked={rec} onChange={() => setRec(!rec)}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}/>
            </Space>,
            genre: 
            <Space>
                <Checkbox onChange={(e) => {setGenreFactor(e.target.checked); setGenres([]);}}/>
                <Select
                    disabled={!genreFactor}
                    mode="multiple"
                    value={genres}
                    allowClear
                    style={{
                    width: 400,
                    }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={options}
                />
            </Space>,
            rating: 
            <Space>
                <Checkbox onChange={(e) => {setRatingFactor(e.target.checked); setRating(0);}}/>
                <Rate disabled={!ratingFactor} value={rating} onChange={(e) => setRating(e)}/>
            </Space>
        }
    ];

    function reviewList() {
        return reviews.map((review) => {

          return (
            <Link key={review._id} to={`/review/${review._id}`}>
              <Col key={review._id}>
                  <ReviewCard review={review} deleteReview={() => deleteReview(review._id)}/>
              </Col>
            </Link>
          );
        });
    }

    async function deleteReview(id) {
        await fetch(`http://localhost:5050/review/${id}`, {
          method: "DELETE"
        });
      
        const newRecords = reviews.filter((el) => el._id !== id);
        setReviews(newRecords);
    };

    useEffect(() => {
        // construct the URL with the appropriate query parameters
        const url = new URL('http://localhost:5050/review/discover');
        if (genres && Array.isArray(genres)) {
            genres.forEach((genre) => {
              url.searchParams.append('genre', genre);
            });
        }
        if(ratingFactor && rating !== 0) {
            url.searchParams.append('rating', rating);
        }
        if(recFactor && rec) {
            url.searchParams.append('rec', rec);
        }
        //testing
        //console.log(url.toString());

        async function getResult() {
            const response = await fetch(url.toString());
 
            if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            //window.alert(message);
            return;
            }
        
            const records = await response.json();
            setReviews(records);
        }
        getResult();
    });
    return(
        <div className='discover'>
            <Row>
                <Table style={{width: '100%'}} pagination={false} columns={columns} dataSource={data}/>
            </Row>
            <Row justify={"center"} gutter={[16, 16]}>
              {(reviews) ? reviewList() : null}
            </Row>
            
        </div>
    );
}
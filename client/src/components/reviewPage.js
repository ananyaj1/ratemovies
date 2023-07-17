import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Card, Row, Col, Tag, Image, Rate, Typography, List } from "antd";
import moment from 'moment';
const { Title, Text } = Typography;

export default function ReviewPage() {
    const { id } = useParams();
    const [review, setReview] = useState([]);
    // for now, make a get request again to get full data.
    // review Data is too large to store in local storage & pass
    // Implement alternative later to save on database reads.
    useEffect(() => {
        async function getResult() {
            const response = await fetch(`http://localhost:5050/review/${id}`);
 
            if (!response.ok) {
            window.alert(response.status);
            return;
            }
        
            const rev = await response.json();
            setReview(rev);
        }
        getResult();
       
    });
    function testing() {
        console.log(review);
    }
    return(
       <div>
        {testing()}
        <Row gutter={[16, 16]}>
            <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                <Title>{review.movie_name}</Title>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Col span={6} offset={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Image style={{maxHeight: 400}} src={review.image} alt="Movie Poster" />
            </Col>
            <Col span={6} >
                <List>
                    <List.Item><Text strong> {review.title} </Text> </List.Item>
                    <List.Item><Text> {moment(review.date).format("MMMM DD, YYYY")} </Text> </List.Item>
                    <List.Item><Text> {(review.rec === 'wouldRec') ?
                        <Tag color="green">Reviewer Recommends</Tag> : 
                        <Tag color="red">Reviewer Doesn't Recommend</Tag>
                        } </Text> 
                    </List.Item>
                    <List.Item> <Rate disabled allowHalf value={review.rating}/> </List.Item>
                </List>
            </Col>
        </Row>
        <br/>
        <Row justify={'center'}>
            <Col span={12}>
                <Card>
                    <p>{review.review_text}</p>
                </Card>
            </Col>
        </Row>
        <br/>
       </div>
        
    );
}
/* 
<Text>Genres:</Text>
    {movie.genres.map((genre) => (
    <Tag key={genre}>{genre}</Tag>
    ))}
*/
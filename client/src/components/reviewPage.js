import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {Divider, Row, Col, Tag, Image, Rate, Typography, List, Avatar, Space } from "antd";
import moment from 'moment';
import colorDict from '../constants/colorDictionary';
const { Title, Text } = Typography;

export default function ReviewPage() {
    const { id } = useParams();
    const [review, setReview] = useState([]);
    // for now, make a get request again to get full data.
    // review Data is too large to store in local storage & pass
    // Implement alternative later to save on database reads.
    useEffect(() => {
        async function getResult() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}review/${id}`);
 
            if (!response.ok) {
            window.alert(response.status);
            return;
            }
        
            const rev = await response.json();
            setReview(rev);
        }
        getResult();
       
    }, [id]);
    function testing() {
        console.log(review);
    }
    return(
       <div style={{ minHeight: '100vh'}}>
        {testing()}
        <Row gutter={[16, 16]}>
            <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                <Title>{review.movie_name}</Title>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Image style={{maxHeight: 400}} src={review.image} alt="Movie Poster" />
            </Col>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
             <Divider type="vertical" style={{ height: '100%' }} />
            </div>
            <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                    <p>{review.review_text}</p>
                
            </Col>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
             <Divider type="vertical" style={{ height: '100%' }} />
            </div>
            <Col span={6} >
                <List>
                    <List.Item><Text strong> {review.title} </Text> </List.Item>
                    <List.Item><Text> Watched on {moment(review.date).format("MMMM DD, YYYY")} </Text> </List.Item>
                    <List.Item><Text> {(review.rec === 'wouldRec') ?
                        <Tag color="green">Reviewer Recommends</Tag> : 
                        <Tag color="red">Reviewer Doesn't Recommend</Tag>
                        } </Text> 
                    </List.Item>
                    <List.Item><Tag color={colorDict[review.genre]}>{review.genre}</Tag></List.Item>
                    <List.Item> <Rate disabled allowHalf value={review.rating}/> </List.Item>
                    <List.Item>
                        <Space>
                            <Avatar src={`/propics/${review.user_pic}`}/>
                            <Link to={`/user/${review.userId}`}><Text>{review.username}</Text></Link>
                        </Space>
                    </List.Item>
                    <List.Item>
                    </List.Item>
                </List>
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
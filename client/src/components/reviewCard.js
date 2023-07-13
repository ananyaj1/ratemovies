import React, { useEffect, useState } from "react";
import { Row, Rate, Card } from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import pp from '../images/pp.jpeg';
const { Meta } = Card;

export default function ReviewCard({review, deleteReview}) {
    const date = new Date(review.date);
    const imgSrc = (review.image) ? review.image : pp;
    return (
        <div>
            <Card
            hoverable
            style={{
                width: 300,
              }}
              cover={<img alt="notfound" src={imgSrc}/>}
              actions={[
                <div onClick={deleteReview}><DeleteOutlined/></div>,
                <EditOutlined />
              ]}>
                <Meta 
                title={review.title} 
                description={
                <div>
                    <Row><p><b>{review.movie_name}</b></p></Row>
                    <Row><p>{review.rec}</p></Row>
                    <Row><Rate disabled defaultValue={review.rating}/></Row>
                    <Row>
                        <p>
                            {date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </Row>
                </div>
                }
                />
            </Card>
        </div>
    );
}

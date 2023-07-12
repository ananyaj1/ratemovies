import React, { useState } from "react";
import { Row, Rate, Card } from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
const { Meta } = Card;

export default function ReviewCard({review, deleteReview}) {
    const date = new Date(review.date);
    return (
        <div>
            <Card
            hoverable
            style={{
                width: 300,
              }}
              actions={[
                <DeleteOutlined/>,
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

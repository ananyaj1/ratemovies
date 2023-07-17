import React, { useEffect, useState } from "react";
import ReviewCard from "./reviewCard";
import { Row, Col, Space, Empty } from "antd";
import { Link } from "react-router-dom";

export default function View({setCurrPage}) {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        async function getResult() {
            const response = await fetch(`http://localhost:5050/review/`);
 
            if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
            }
        
            const records = await response.json();
            setReviews(records);
        }
        // for now, only make GET request once. 
        // later, when reviews can be added even while user is on view page:
        // allow GET request to be made whenever there's a change
        if(reviews.length === 0) {
          getResult();
        }
        setCurrPage("view");
    });

    function reviewList() {
      const reviewsPerRow = 5; // Number of reviews per row
    
      const rows = [];
      for (let i = 0; i < reviews.length; i += reviewsPerRow) {
        const rowReviews = reviews.slice(i, i + reviewsPerRow);
        rows.push(rowReviews);
      }
    
      return rows.map((row, rowIndex) => (
        <Row key={rowIndex}>
          <Space size={16}>
            {row.map((review) => (
              <Link key={review._id} to={`/review/${review._id}`}>
                <Col key={review._id}>
                  <ReviewCard review={review} deleteReview={() => deleteReview(review._id)} />
                </Col>
              </Link>
            ))}
          </Space>
        </Row>
      ));
    };

    async function deleteReview(id) {
        await fetch(`http://localhost:5050/review/${id}`, {
          method: "DELETE"
        });
      
        const newRecords = reviews.filter((el) => el._id !== id);
        setReviews(newRecords);
      }

      return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {reviews.length === 0 ? (
            <Empty />
          ) : (
            <Row justify="center" gutter={[16, 16]}>
              {reviewList()}
            </Row>
          )}
        </div>
      );
}
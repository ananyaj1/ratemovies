import React, { useEffect, useState } from "react";
import ReviewCard from "./reviewCard";
import { Row, Col, Space, Empty } from "antd";
import { Link } from "react-router-dom";

export default function View({setCurrPage}) {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        async function getResult() {
            const response = await fetch(`${process.env.RATEMOVIES_BACKEND_URL}review/`);
 
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
      const reviewsPerRow = 4; // Number of reviews per row
    
      const rows = [];
      for (let i = 0; i < reviews.length; i += reviewsPerRow) {
        const rowReviews = reviews.slice(i, i + reviewsPerRow);
        rows.push(rowReviews);
      }
    
      return rows.map((row, rowIndex) => (
        <Row key={rowIndex}>
          <Space size={16}>
            {row.map((review) => (
              <div key={review._id}>
                <Link to={`/review/${review._id}`}>
                  <Col key={review._id}>
                    <ReviewCard review={review} />
                  </Col>
                </Link>
              </div>
             
            ))}
          </Space>
        </Row>
      ));
    };
    /*
    deleteReview={() => deleteReview(review._id)
    async function deleteReview(id) {
        await fetch(`http://localhost:5050/review/${id}`, {
          method: "DELETE"
        });
      
        const newRecords = reviews.filter((el) => el._id !== id);
        setReviews(newRecords);
      }
      */

      return (
        <div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <h2>View All Reviews</h2>
          </div>
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {reviews.length === 0 ? (
              <div>
              <Empty description="No Reviews just yet!"/>
              </div>
            ) : (
              <div> 
                <br/>
                <Row justify="center" gutter={[16, 16]}>
                {reviewList()}
                </Row>
                <br/>
              </div>
            )}
          </div>
        </div>
        
      );
}
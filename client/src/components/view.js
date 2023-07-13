import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ReviewCard from "./reviewCard";
import { Row, Col } from "antd";

export default function View() {
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
        getResult();
        
    });

    function reviewList() {
        return reviews.map((review) => {

          return (
            <Col key={review._id}>
                <ReviewCard review={review} deleteReview={() => deleteReview(review._id)}/>
            </Col>
          );
        });
    }

    async function deleteReview(id) {
        await fetch(`http://localhost:5050/review/${id}`, {
          method: "DELETE"
        });
      
        const newRecords = reviews.filter((el) => el._id !== id);
        setReviews(newRecords);
      }

    return (
        <div>
            For Routing
            <Row justify={"center"} gutter={[16, 16]}>
              {reviewList()}
            </Row>
        </div>
    );
}
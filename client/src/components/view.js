import React, { useEffect, useState } from "react";
import ReviewCard from "./reviewCard";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

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
        // for now, only make GET request once. 
        // later, when reviews can be added even while user is on view page:
        // allow GET request to be made whenever there's a change
        if(reviews.length === 0) {
          getResult();
        }
        
    });

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
      }

    return (
        <div>
          <br/>
            <Row justify={"center"} gutter={[16, 16]}>
              {reviewList()}
            </Row>
          <br/>
        </div>
    );
}
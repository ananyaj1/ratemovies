import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Avatar, Divider, Col, Row, Empty } from "antd";
import ReviewCard from "../reviewCard";
export default function UserPage() {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    useEffect(() => {
        async function getResult() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}user/${id}`);
 
            if (!response.ok) {
            window.alert(response.status);
            return;
            }
        
            const rev = await response.json();
            setUser(rev);
        }
        getResult();
       
    }, [id]);
    useEffect(() => {
        async function getReviews() {
            let url = new URL(`${process.env.REACT_APP_BACKEND_URL}review/userpage`);
            url.searchParams.append('userId', id);
            
            const response = await fetch(url.toString());
 
            if (!response.ok) {
            window.alert(response.status);
            return;
            }
        
            const rev = await response.json();
            setUserReviews(rev);
        }
        getReviews();
    }, [id]);
    function reviewList() {
        return userReviews.map((review) => {

          return (
            <Link key={review._id} to={`/review/${review._id}`}>
              <Col key={review._id}>
                  <ReviewCard review={review}/>
              </Col>
            </Link>
          );
        });
    }
    return(
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <br/>
        <Avatar size={128} src={`/propics/${user.profile_pic}`} />
        <div style={{ marginTop: 16, fontWeight: "bold" }}>
          {user.first_name} {user.last_name}
        </div>
        <div style={{ marginTop: 8, color: "gray" }}>
          {user.username}
        </div>
        <Divider/>
        <div style={{ height: '100%', minHeight: '100vh'}}>
        {userReviews.length !== 0 ? 
        <Row justify={"center"} gutter={[16, 16]}>
        {reviewList()}
        </Row>
        : <Empty description="This user hasn't written any reviews yet!"/>}
        </div>
        <br/>
      </div>
    );
}
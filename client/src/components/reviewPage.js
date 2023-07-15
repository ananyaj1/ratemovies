import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ReviewPage() {
    const { id } = useParams();
    const [review, setReview] = useState(null);
    // for now, make a get request again to get full data.
    // review Data is too large to store in local storage & pass
    // Implement alternative later to save on database reads.
    useEffect(() => {
        async function getResult() {
            const response = await fetch(`http://localhost:5050/review/${id}`);
 
            if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
            }
        
            const rev = await response.json();
            setReview(rev);
        }

        if(!review) {
            getResult();
        }
        
    });
    return(
    <div>
        No way {id}
    </div>);
}
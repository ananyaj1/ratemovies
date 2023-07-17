import React, {useState} from "react";
import { Card } from "antd";
const {Meta} = Card;
export default function MovieCard({movie}) {
    const [isHovered, setIsHovered] = useState(false);
    const cardStyle = {
        width: '240px', // Adjust the desired width of the card
        height: '400px', // Adjust the desired height of the card
      };
      
      const imageStyle = {
        height: '100%', // Set the image height to fill the available space within the card
        objectFit: 'cover', // Adjust the object-fit property based on your image aspect ratio needs
      };


    return(
        <Card hoverable style={cardStyle}>
        <img alt="example" src={movie.posterUrl} style={imageStyle} />
        <Meta title={movie.title} />
        </Card>
    );
}

import { Row, Col, Rate, Card, Tag, Avatar} from 'antd';
import pp from '../images/pp.jpeg';
import colorDict from '../constants/colorDictionary';
const { Meta } = Card;

export default function ReviewCard({review, deleteReview}) {
    const date = new Date(review.date);
    const imgSrc = (review.image) ? review.image : pp;
    const truncateMovieTitle = (title, maxLength) => {
        return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
    };
    return (
        <div>
            <Card
            hoverable
            style={{
                width: 300,
                height: '100%',
              }}
              cover={<img alt="notfound" src={imgSrc} style={{ width: '100%', height: '400px', objectFit: 'cover' }}/>}
              >
                <Meta 
                title={<Row justify={'space-between'}><Col>{truncateMovieTitle(review.movie_name, 28)}</Col><Col><Avatar src={`/propics/${review.user_pic}`}/></Col></Row>}
                description={
                <div>
                    <Row justify={'space-between'}><Col>{review.title} </Col> <Col>{review.username}</Col></Row>
                    <br/>
                    <Row>
                        <Tag color={(review.rec === 'wouldRec') ? 'green' : 'red'}>
                            {(review.rec === 'wouldRec') ? "Reviewer Recommends" : "Reviewer Doesn't Recommend"}
                        </Tag>
                    </Row>
                    <Row><Rate disabled allowHalf defaultValue={review.rating}/></Row>
                    <Row>
                        <p>
                            {date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </Row>
                    <Row>
                         <Tag color={colorDict[review.genre]}>{review.genre}</Tag>
                    </Row>
                </div>
                }
                />
            </Card>
        </div>
    );
}

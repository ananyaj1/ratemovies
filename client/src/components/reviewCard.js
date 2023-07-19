
import { Row, Rate, Card, Tag} from 'antd';
import pp from '../images/pp.jpeg';
import colorDict from '../constants/colorDictionary';
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
                height: '100%',
              }}
              cover={<img alt="notfound" src={imgSrc} style={{ width: '100%', height: '400px', objectFit: 'cover' }}/>}
              >
                <Meta 
                title={review.title} 
                description={
                <div>
                    <Row><p><b>{review.movie_name}</b></p></Row>
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

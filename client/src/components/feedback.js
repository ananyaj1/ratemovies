import React, {useEffect, useState} from "react";
import { Row, Col, Input, Button } from "antd";
const { TextArea } = Input;

export default function Feedback({setCurrPage}) {

    const [feed, setFeed] = useState("");


    useEffect(() => {
        setCurrPage('feedback');
    });

    return(
        <div style={{ backgroundColor: '#001628', minHeight: '100vh', color: 'white' }}>
        <Row justify="center" align="middle" gutter={16}>
            <Col span={24}>
            <h1 style={{ textAlign: 'center' }}>Feedback</h1>
            </Col>
            <Col span={24}>
            <h5 style={{ textAlign: 'center' }}>
                Noticed a bug? Have a feature idea? Problem with the UI?
                <br/>
                <br/>
                Email us to let us know.
            </h5>
            </Col>
            <Col span={8}>
                <TextArea value={feed} rows={15} onChange={(event) => setFeed(event.target.value)}/>
            </Col>
        </Row>
        <br/>
        <Row>
        <Col>
            <Button type="primary">
                Submit
            </Button>
            </Col>
        </Row>
</div>
    );
}
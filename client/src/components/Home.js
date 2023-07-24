import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Space } from 'antd';
import {EditOutlined, EyeOutlined, SearchOutlined, VideoCameraOutlined} from '@ant-design/icons';
import '../css/Home.css';
export default function HomePage() {
    const navigate = useNavigate();
    return(
        <div style={{ backgroundColor: '#001628', minHeight: '100vh', color: 'white' }}>
            <Row justify="center" align="middle" gutter={16}>
                <Col span={24} style={{ height: '25vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{fontSize: '3rem'}}>Welcome to RateMovies.</h1>
                </Col>
                <Col span={24} style={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1>Write Reviews, Discover Movies.</h1>
                </Col>
            </Row>
            <div className="button-container" style={{ marginTop: '-8rem' }}>
            <Row justify="center">
                <Col span={12} className="square-col">
                <Button type="primary" className="square-button" onClick={() => navigate('/create')}>
                <Space>
                    <EditOutlined />
                    <span>Write Reviews</span>
                </Space>
                </Button>
                </Col>
                <Col span={12} className="square-col">
                <Button type="primary" className="square-button" onClick={() => navigate('/view')}>
                <Space>
                    <EyeOutlined/>
                    <span>View Reviews</span>
                </Space>
                </Button>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={12} className="square-col">
                <Button type="primary" className="square-button" onClick={() => navigate('/discover')}>
                <Space>
                    <SearchOutlined />
                    <span>Find Reviews</span>
                </Space>
                </Button>
                </Col>
                <Col span={12} className="square-col">
                <Button type="primary" className="square-button" onClick={() => navigate('/movies')}>
                <Space>
                    <VideoCameraOutlined />
                    <span>Discover Movies</span>
                </Space>
                </Button>
                </Col>
            </Row>
            </div>
            <br/>
        </div>
    );
}
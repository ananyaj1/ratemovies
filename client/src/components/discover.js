import { Row, Space, Table, Switch, Rate, Checkbox, Select } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";

export default function Discover() {
    const [recFactor, setRecFactor] = useState(false);
    const [genreFactor, setGenreFactor] = useState(false);
    const [ratingFactor, setRatingFactor] = useState(false);
    const options = [
        {
            value: 'Mystery',
            label: 'Mystery',
        },
        {
            value: 'Thriller',
            label: 'Thriller',
        },
        {
            value: 'Comedy',
            label: 'Comedy',
        },
        {
            value: 'Action',
            label: 'Action',
        },
        {
            value: 'Romance',
            label: 'Romance',
        },
    ];
    const handleChange = (value) => {
        console.log(value);
    };
    const columns = [
        {
            title: 'Reviewer Recommends',
            dataIndex: 'rec',
            key: 'rec',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
    ]
    const data = [
        {
            key: '1',
            rec: 
            <Space>
                <Checkbox onChange={(e) => setRecFactor(e.target.checked)}/>
                <Switch disabled={!recFactor}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}/>
            </Space>,
            genre: 
            <Space>
                <Checkbox onChange={(e) => setGenreFactor(e.target.checked)}/>
                <Select
                    disabled={!genreFactor}
                    mode="multiple"
                    allowClear
                    style={{
                    width: 400,
                    }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={options}
                />
            </Space>,
            rating: 
            <Space>
                <Checkbox onChange={(e) => setRatingFactor(e.target.checked)}/>
                <Rate disabled={!ratingFactor}/>
            </Space>
        }
    ]
    return(
        <div className='discover'>
            <Row>
                <Table style={{width: '100%'}} pagination={false} columns={columns} dataSource={data}/>
            </Row>
        </div>
    );
}
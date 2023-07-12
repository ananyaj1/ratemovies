import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink, Routes, Route } from "react-router-dom";
import {Layout, Menu, theme } from 'antd';
import {EditOutlined, EyeOutlined, SearchOutlined} from '@ant-design/icons';
import Create from "./components/create";
import View from "./components/view";
import Discover from "./components/discover";

const { Header, Content, Footer } = Layout;

const items = [
    {
        label: (<NavLink className="nav-link" to="/create"> Create </NavLink>),
        key: "create",
        icon: <EditOutlined />,
    },
    {
        label: (<NavLink className="nav-link" to="/"> View </NavLink>),
        key: "view",
        icon: <EyeOutlined />,
    },
    {
        label: (<NavLink className="nav-link" to="/discover"> Discover </NavLink>),
        key: "discover",
        icon: <SearchOutlined />,
    }
];


export default function App() {
    const [currPage, setCurrPage] = useState("create");
    const switchPage = e => {
        console.log('click ', e);
        setCurrPage(e.key);
    }
    return(
        <Layout>
            <Header>
                <Menu 
                onClick={switchPage} 
                selectedKeys={[currPage]} 
                mode="horizontal" 
                items={items} 
                theme="dark"/>
            </Header>
            <Content>
                <Routes>
                    <Route exact path="/" element={<View/>}/>
                    <Route path="/create" element={<Create/>}/>
                    <Route path="/discover" element={<Discover/>}/>
                </Routes>
            </Content>
        </Layout>
    );
}